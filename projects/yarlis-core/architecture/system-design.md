# Yarlis Core Platform — System Architecture

> Last updated: 2026-03-01

## Overview

Yarlis Core is the control plane for the Yarlis ecosystem. It hosts yarlis.com (marketing + enterprise), yarlis.ai (AI platform hub), yarlis.io (developer portal), an admin dashboard, and eventually a mobile app. It manages cross-product identity, billing, and administration.

**Repo:** yarlis-platform (Turborepo monorepo) | **GCP Project:** yarlis-platform

---

## Stack

| Layer         | Technology                    |
|---------------|-------------------------------|
| Build         | Turborepo 2                   |
| Language      | TypeScript 5.3+               |
| Package Mgr   | pnpm 10                      |
| Node          | >= 20                         |

---

## Monorepo Structure

```
yarlis-platform/
├── apps/
│   ├── yarlis-com/       # yarlis.com — marketing, enterprise sales
│   ├── yarlis-ai/        # yarlis.ai — AI platform hub [SCAFFOLD]
│   ├── yarlis-io/        # yarlis.io — developer portal [SCAFFOLD]
│   ├── admin/            # Admin dashboard [SCAFFOLD]
│   ├── mobile/           # Mobile app [SCAFFOLD]
│   ├── mybotbox/         # MBB entry point (may redirect)
│   └── sdods/            # SDODS docs/landing
├── packages/             # Shared packages [PLANNED]
└── libs/                 # Shared libraries [PLANNED]
```

---

## Architecture Diagram

```
+---------------------------------------------------------------+
|                    Cloudflare CDN + DNS                        |
+------+----------+----------+-----------+----------+-----------+
       |          |          |           |          |
+------v---+ +---v------+ +-v--------+ +v-------+ +v---------+
|yarlis.com| |yarlis.ai | |yarlis.io | | admin  | | mobile   |
|Marketing | |AI Hub    | |Dev Portal| | Panel  | | App      |
|Enterprise| |Dashboard | |API Docs  | | Mgmt   | |          |
| LIVE     | | SCAFFOLD | | SCAFFOLD | |SCAFFOLD| | SCAFFOLD |
+------+---+ +---+------+ +-+--------+ ++-------+ ++---------+
       |          |          |           |          |
       +----------+----------+-----------+----------+
                             |
                  +----------v-----------+
                  |   Unified Identity   |
                  |   Platform (UIP)     |
                  |   [PLANNED]          |
                  +----------+-----------+
                             |
              +--------------+--------------+
              |              |              |
       +------v------+ +----v-----+ +------v------+
       | MyBotBox    | |   SRT    | | Future      |
       | (product)   | |(product) | | Products    |
       +-------------+ +----------+ +-------------+
```

---

## Cloud Run Services (yarlis-platform project)

| Service             | Status | Purpose                  |
|---------------------|--------|--------------------------|
| yarlis-com          | LIVE   | yarlis.com production    |
| yarlis-com-staging  | LIVE   | yarlis.com staging       |

---

## Domain Status

| Domain    | Status  | Notes                          |
|-----------|---------|--------------------------------|
| yarlis.com| LIVE    | Marketing + enterprise         |
| yarlis.ai | OFFLINE | DNS not resolving              |
| yarlis.io | OFFLINE | DNS not resolving              |

---

## Planned: Unified Identity Platform (UIP)

Currently each product manages auth independently:
- **MBB:** Firebase Auth (email/password, SSO, OAuth, device auth)
- **SRT:** Firebase Auth (email/password, API keys)

### Migration Path: Firebase Auth --> UIP

```
Phase 1 (Current):
  MBB --> Firebase Auth (ystudio-core project)
  SRT --> Firebase Auth (rapidtriage-me project)

Phase 2 (UIP):
  MBB -+
       +--> @sdods/auth --> UIP (Cloud Run + Cloud SQL)
  SRT -+                    |
                        +----v----+
                        |PostgreSQL|
                        |(identity)|
                        +---------+

Phase 3 (Cross-product SSO):
  yarlis.com login --> UIP --> SSO token
       |                         |
       +--> MBB session          +--> SRT session
```

**UIP will provide:**
- Single sign-on across all Yarlis products
- Unified user profile and preferences
- Cross-product billing (one Stripe customer → multiple product subscriptions)
- Admin control plane (user management, org management)
- RBAC via @sdods/auth

---

## Planned: Cross-Product Billing

```
Current:
  MBB --> Stripe (separate customer)
  SRT --> Stripe (separate customer)

Planned:
  Yarlis Account --> Single Stripe Customer
       |
       +-- MBB subscription (product A)
       +-- SRT subscription (product B)
       +-- Future product subscriptions
       |
       +--> Unified billing portal at yarlis.com/billing
```

---

## Cost Profile

| Resource         | Monthly | Project          |
|------------------|---------|------------------|
| Yarlis Platform  | ~$0.02  | yarlis-platform  |

Minimal cost — only yarlis.com is live.

---

## Maturity Assessment

| Component        | Status    | Priority |
|------------------|-----------|----------|
| yarlis.com       | LIVE      | --       |
| yarlis.ai        | SCAFFOLD  | Medium   |
| yarlis.io        | SCAFFOLD  | Low      |
| Admin dashboard  | SCAFFOLD  | High     |
| Mobile app       | SCAFFOLD  | Low      |
| UIP (identity)   | PLANNED   | High     |
| Cross-product billing | PLANNED | High  |

---

## References

- GCP project: yarlis-platform
- Live site: yarlis.com
