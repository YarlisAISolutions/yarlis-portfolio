# Yarlis Ecosystem — Architecture Overview

> Last updated: 2026-03-01

## Product Portfolio

| Product        | Domain          | Status | GCP Project        | Stack                          |
|----------------|-----------------|--------|--------------------|--------------------------------|
| MyBotBox       | mybotbox.com    | LIVE   | mybotbox-prod      | Next.js 15 + Bun + PG + Cloud Run |
| SmartRapidTriage| rapidtriage.me | LIVE*  | rapidtriage-me     | Firebase Functions + Firestore |
| Yarlis.com     | yarlis.com      | LIVE   | yarlis-platform    | Cloud Run                      |
| Yarlis.ai      | yarlis.ai       | SCAFFOLD| yarlis-platform   | TBD                            |
| Yarlis.io      | yarlis.io       | SCAFFOLD| yarlis-platform   | TBD                            |
| SDODS          | sdods.com       | SCAFFOLD| —                 | npm packages (pnpm + Turborepo)|

*SRT has a 522 Cloudflare origin error as of 2026-02-26.

---

## High-Level Architecture

```
                    +--------------------------------------------+
                    |              CLOUDFLARE                     |
                    |         DNS + CDN + WAF + DDoS             |
                    +------+----------+----------+------+--------+
                           |          |          |      |
                    +------v---+ +---v------+ +-v------v-----+
                    |yarlis.com| |mybotbox  | |rapidtriage.me|
                    |  (HQ)   | |  .com    | |   (SRT)      |
                    +------+---+ +---+------+ +------+-------+
                           |         |               |
                    +------v---+ +---v-----------+ +-v-----------+
                    |Cloud Run | |Cloud Run      | |Cloud Run    |
                    |yarlis-com| |mybotbox-app   | |24 services  |
                    +----------+ |+ 7 background | |(api, auth,  |
                                 | services      | | billing,    |
                                 +---+-----------+ | screenshots)|
                                     |             +--+----------+
                                     |                |
                              +------v------+   +-----v------+
                              | Cloud SQL   |   | Firestore  |
                              | PostgreSQL  |   | (NoSQL)    |
                              | (MBB data)  |   | (SRT data) |
                              +-------------+   +------------+
```

---

## GCP Project Map

| Project ID             | Purpose                    | Monthly Cost |
|------------------------|----------------------------|-------------|
| ystudio-core           | MBB staging + dev          | ~$84        |
| mybotbox-prod          | MBB production             | ~$12        |
| rapidtriage-me         | SRT production             | ~$0.52      |
| yarlis-platform        | yarlis.com hosting         | ~$0.02      |
| yarlis-mission-control | Mission Control [DORMANT]  | —           |
| yarlis-cicd-prod       | Jenkins CI/CD              | —           |
| continuum-*            | Shared infra               | ~$8         |
| **TOTAL**              |                            | **~$105/mo**|

---

## Data Flow Between Products

```
+-------------+                    +------------------+
|  MyBotBox   |                    | SmartRapidTriage  |
|             |                    |                   |
| PostgreSQL  |                    |    Firestore      |
| (workflows, |    [NO DIRECT     |  (sessions,       |
|  users,     |     DATA FLOW     |   screenshots,    |
|  orgs,      |     TODAY]        |   metrics,        |
|  knowledge) |                    |   subscriptions)  |
+------+------+                    +--------+----------+
       |                                    |
       |          [PLANNED: @sdods]         |
       +----------------+------------------+
                        |
              +---------v----------+
              |  @sdods packages   |
              |  (shared auth,     |
              |   billing, logging)|
              +--------------------+
```

**Current state:** Products are fully independent. No shared data store or cross-product API calls.

**Planned state:** @sdods packages will provide shared abstractions. UIP will enable cross-product SSO. Unified billing via single Stripe customer.

---

## Shared Infrastructure Layer (@sdods)

```
+---------------------------------------------------------------+
|                      @sdods packages                           |
|                                                                |
|  +------+ +-------------+ +--------+ +----+ +-----+ +------+ |
|  | auth | | observability| |payments| | ui | |comms| |themes| |
|  +------+ +-------------+ +--------+ +----+ +-----+ +------+ |
|                                                                |
|  Status: ALL SCAFFOLD — logic currently inline in MBB + SRT   |
+---------------------------------------------------------------+

Extraction priority:
  1. @sdods/auth         — Firebase Auth wrapper, session mgmt
  2. @sdods/payments     — Stripe checkout, portal, subscriptions
  3. @sdods/observability — Structured logging, OpenTelemetry
  4. @sdods/ui + themes  — Shared component library
```

---

## Auth Architecture

### Current State (per-product Firebase Auth)

```
MBB users                          SRT users
    |                                  |
    v                                  v
Firebase Auth                   Firebase Auth
(ystudio-core)                  (rapidtriage-me)
    |                                  |
    v                                  v
PostgreSQL                       Firestore
(user records)                   (user profiles)
```

- MBB: email/password, SSO (Google, GitHub), OAuth, device auth
- SRT: email/password, API keys

### Planned: Unified Identity Platform (UIP)

```
                  yarlis.com/login
                        |
                        v
                 +------+------+
                 |    UIP      |
                 | Cloud Run   |
                 | + Cloud SQL |
                 +--+-------+--+
                    |       |
              +-----v--+ +--v------+
              |MBB SSO | |SRT SSO  |
              |session  | |session  |
              +--------+ +---------+
```

Migration path:
1. **Now:** Independent Firebase Auth per product
2. **Phase 2:** @sdods/auth wraps Firebase, both products consume it
3. **Phase 3:** UIP replaces Firebase as identity source, SSO across products

---

## CI/CD Pipeline

### Current State

```
Developer
    |
    v
GitHub (all repos)
    |
    +---> GitHub Actions
    |     (lint, type-check, test)
    |
    +---> Cloud Build
    |     (container images for Cloud Run)
    |
    +---> Firebase Deploy
          (hosting, functions, rules)
```

### Target State

```
Developer
    |
    v
GitHub
    |
    +---> GitHub Actions (CI: lint, test, type-check)
    |
    +---> Cloud Build (container build + push)
    |
    +---> Jenkins (yarlis-cicd-prod)
    |     (orchestration, multi-env deploy, approvals)
    |
    +---> Cloud Run / Firebase (deploy targets)
```

### Per-Product CI/CD

| Product | CI              | Build          | Deploy Target        |
|---------|-----------------|----------------|----------------------|
| MBB     | GitHub Actions  | Cloud Build    | Cloud Run (staging → prod) |
| SRT     | GitHub Actions  | firebase deploy| Firebase Functions + Hosting |
| Yarlis  | GitHub Actions  | Cloud Build    | Cloud Run            |
| SDODS   | GitHub Actions  | Turborepo      | npm publish (changesets) |

---

## DNS & Domain Routing

### DNS Providers

| Domain          | DNS Provider | CDN/Proxy    | Registrar |
|-----------------|-------------|--------------|-----------|
| mybotbox.com    | Route 53    | Cloudflare   | —         |
| rapidtriage.me  | Cloudflare  | Cloudflare   | —         |
| yarlis.com      | Route 53    | Cloudflare   | —         |
| yarlis.ai       | Route 53    | —            | —         |
| yarlis.io       | Route 53    | —            | —         |
| sdods.com       | —           | —            | —         |

### Routing Architecture

```
                  Route 53 (AWS)              Cloudflare
                  +------------+              +----------+
                  |mybotbox.com| --CNAME--->  |Proxy     |---> Cloud Run
                  |yarlis.com  | --CNAME--->  |Proxy     |---> Cloud Run
                  |yarlis.ai   | (not set up) |          |
                  |yarlis.io   | (not set up) |          |
                  +------------+              +----------+

                  Cloudflare (direct)
                  +----------------+
                  |rapidtriage.me  |---> Cloud Run (522 error)
                  +----------------+
```

### Domain Health (as of 2026-02-26)

| Domain                   | Status  | Action Needed                     |
|--------------------------|---------|-----------------------------------|
| mybotbox.com             | LIVE    | —                                 |
| staging-app.mybotbox.com | BROKEN  | Configure DNS + Cloud Run mapping |
| rapidtriage.me           | 522 ERR | Fix Cloudflare origin connection  |
| yarlis.com               | LIVE    | —                                 |
| yarlis.ai                | OFFLINE | Configure DNS records             |
| yarlis.io                | OFFLINE | Configure DNS records             |
| sdods.com                | OFFLINE | Configure DNS records             |

---

## Service Inventory (Total: 46 Cloud Run services)

| GCP Project       | Services | Key Services                                    |
|-------------------|----------|-------------------------------------------------|
| ystudio-core      | 12       | mybotbox-app-staging, crawl4ai, workflow/webhook engines |
| mybotbox-prod     | 8        | mybotbox-app, workflow/webhook engines           |
| rapidtriage-me    | 24       | api, auth, sse, billing, screenshots, metrics   |
| yarlis-platform   | 2        | yarlis-com, yarlis-com-staging                   |

---

## Database Architecture

| Database     | Engine     | Product | Data                                |
|-------------|------------|---------|-------------------------------------|
| ystudio-staging-db | PG 15 | MBB (staging) | Workflows, users, orgs, knowledge |
| ystudio-db-budget  | PG 15 | MBB (staging) | Budget/secondary                 |
| mybotbox-db        | PG 15 | MBB (prod)    | Production data (104+ migrations)|
| Firestore (rapidtriage-me) | NoSQL | SRT | Sessions, screenshots, users, metrics |
| Firestore (ystudio-core)   | NoSQL | MBB | Realtime data, auth state       |

---

## Security Architecture

```
Layer 1: Edge
  Cloudflare WAF + DDoS + rate limiting
  SSL termination

Layer 2: Application
  Firebase Auth (per-product)
  JWT validation
  RBAC (per-product, @sdods/auth planned)

Layer 3: API
  Input validation + guardrails (MBB)
  API key auth (SRT)
  Rate limiting

Layer 4: Data
  Encryption at rest (GCP default)
  Encryption in transit (TLS)
  Firestore security rules (SRT)
  Cloud SQL IAM auth (MBB)
```

---

## Cost Summary

| Category        | Monthly | Notes                              |
|-----------------|---------|-------------------------------------|
| MBB Staging     | ~$84    | DB oversized — can save ~$50       |
| MBB Production  | ~$12    | Lean                               |
| SRT             | ~$0.52  | Firebase Functions pricing          |
| Yarlis Platform | ~$0.02  | Minimal                            |
| Shared (Continuum)| ~$8  | Shared infra                        |
| **TOTAL**       |**~$105**| Optimize staging DB for ~$55 total |

---

## Maturity Matrix

| Product    | Backend | Frontend | Auth | Billing | CI/CD | Docs | Tests |
|------------|---------|----------|------|---------|-------|------|-------|
| MyBotBox   | ████    | ████     | ███  | ███     | ██    | ██   | ██    |
| SRT        | ███     | ██       | ██   | ███     | ██    | ██   | ███   |
| Yarlis.com | █       | █        | —    | —       | █     | —    | —     |
| SDODS      | ░       | ░        | ░    | ░       | ░     | ░    | ░     |

████ = Production  ███ = Functional  ██ = Basic  █ = Minimal  ░ = Scaffold

---

## Key Architectural Decisions

1. **Independent repos per product** — no shared monorepo across products. Only shared dependency is @sdods (npm packages).
2. **Firebase Auth (for now)** — each product has its own Firebase project. UIP migration planned but not started.
3. **Cloud Run for everything** — no Kubernetes, no ECS. Cloud Run for all services.
4. **PostgreSQL for MBB, Firestore for SRT** — different data models suit different products. No forced standardization.
5. **Bun for MBB, Node for SRT** — MBB migrated to Bun runtime. SRT stays on Node (Firebase Functions requirement).
6. **Stripe per product** — separate Stripe integrations. Unified billing is planned via @sdods/payments.

---

*Architecture docs per product: see projects/{product}/architecture/system-design.md*
