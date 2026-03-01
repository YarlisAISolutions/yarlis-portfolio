# SmartRapidTriage (SRT) — System Architecture

> Last updated: 2026-03-01

## Overview

SmartRapidTriage is a browser-based triage and debugging platform. It captures screenshots, runs diagnostic sessions, and provides real-time metrics — accessible via browser extension, MCP server, and REST API.

**Domain:** rapidtriage.me (Cloudflare proxied) | **Repo:** smartrapidtriage | **GCP Project:** rapidtriage-me

---

## Stack

| Layer         | Technology                              |
|---------------|-----------------------------------------|
| Runtime       | Node.js + TypeScript                    |
| Backend       | Firebase Cloud Functions (Gen 2)        |
| Database      | Firestore (NoSQL)                       |
| Auth          | Firebase Authentication                 |
| Storage       | Firebase/GCS (screenshots, reports)     |
| Payments      | Stripe (subscriptions, checkout)        |
| Hosting       | Firebase Hosting + Cloud Run            |
| CDN           | Cloudflare                              |
| Testing       | Playwright (E2E), custom test suites    |
| Docs          | MkDocs                                  |

---

## Repo Structure

```
smartrapidtriage/
├── functions/              # Firebase Cloud Functions
│   └── src/
│       ├── http/           # HTTP-triggered functions
│       │   ├── api/        # REST API endpoints
│       │   ├── auth/       # Auth endpoints
│       │   ├── docs/       # API docs serving
│       │   ├── health.ts   # Health check
│       │   ├── legal/      # Legal pages
│       │   ├── mcp/        # MCP server endpoint
│       │   ├── metrics.ts  # Metrics endpoint
│       │   ├── pages/      # Server-rendered pages
│       │   ├── status.ts   # Status endpoint
│       │   └── webhooks/   # Webhook handlers
│       ├── callable/       # Firebase callable functions
│       │   ├── cancelSubscription.ts
│       │   ├── captureScreenshot.ts
│       │   ├── createApiKey.ts
│       │   ├── createCheckoutSession.ts
│       │   ├── createPortalSession.ts
│       │   ├── getSubscription.ts
│       │   └── revokeApiKey.ts
│       ├── scheduled/      # Cron-triggered functions
│       │   ├── aggregateMetrics.ts
│       │   ├── cleanupExpiredScreenshots.ts
│       │   └── cleanupExpiredSessions.ts
│       ├── background/     # Event-triggered functions
│       │   ├── onScreenshotCreated.ts
│       │   └── onUserCreated.ts
│       ├── services/       # Business logic
│       │   ├── ai.service.ts
│       │   ├── auth.service.ts
│       │   ├── communication/
│       │   ├── connect.service.ts
│       │   ├── identity.service.ts
│       │   ├── screenshot.service.ts
│       │   ├── session.service.ts
│       │   ├── storage.service.ts
│       │   ├── stripe.service.ts
│       │   └── token.service.ts
│       ├── middleware/      # Request middleware
│       ├── config/         # Config/constants
│       ├── types/          # TypeScript types
│       └── utils/          # Shared utilities
├── src/                    # Frontend/shared source
│   ├── agents/             # AI agent definitions
│   ├── handlers/           # Event handlers
│   ├── middleware/          # Client middleware
│   ├── openapi/            # OpenAPI spec
│   ├── services/           # Client-side services
│   ├── types/              # Shared types
│   └── utils/              # Shared utilities
├── rapidtriage-extension/  # Chrome extension
├── rapidtriage-mcp/        # MCP server package
├── rapidtriage-server/     # Standalone server
├── RapidTriageMobile/      # Mobile app (scaffold)
├── database/               # Firestore rules/indexes
├── playwright/             # E2E test configs
├── test/                   # Test suites
│   ├── 02-api/
│   ├── 03-browser/
│   ├── 04-extension/
│   └── 05-integration/
├── docs/                   # Documentation source
├── docs-site/              # Built docs site
├── wireframes/             # UI wireframes
└── public/                 # Static assets
```

---

## Architecture Diagram

```
+---------------------+    +---------------------+    +------------------+
|  Chrome Extension   |    |   MCP Server        |    |  REST API        |
|  (rapidtriage-ext)  |    |  (rapidtriage-mcp)  |    | (functions/http) |
+----------+----------+    +----------+----------+    +--------+---------+
           |                          |                         |
           +------------+-------------+-------------------------+
                        |
           +------------v--------------+
           |    Firebase Cloud Run     |
           |    (24 services)          |
           +--+------+------+------+--+
              |      |      |      |
   +----------v-+ +--v---+ +v-----v---------+
   | Firestore  | | GCS  | | Stripe         |
   | (sessions, | |(screenshots| (subscriptions,|
   |  users,    | | reports)| checkout,       |
   |  metrics)  | |       | | portal)         |
   +-----------+  +------+ +----------------+
```

---

## Cloud Run Services (24 total in rapidtriage-me)

### Core Services

| Service                | Purpose                          |
|------------------------|----------------------------------|
| api                    | Main REST API                    |
| rapidtriage-server     | Standalone server                |
| auth                   | Authentication service           |
| sse                    | Server-sent events (realtime)    |
| health                 | Health check endpoint            |
| status                 | Status page                      |
| apidocs                | API documentation                |
| legal                  | Legal/terms pages                |
| metrics                | Metrics endpoint                 |
| aggregatemetrics       | Scheduled metrics aggregation    |

### Screenshot Pipeline

| Service                   | Purpose                       |
|---------------------------|-------------------------------|
| capturescreenshot         | Capture browser screenshots   |
| onscreenshotcreated       | Post-processing trigger       |
| cleanupexpiredscreenshots | Scheduled cleanup             |

### Session Management

| Service                   | Purpose                       |
|---------------------------|-------------------------------|
| cleanupexpiredsessions    | Scheduled session cleanup     |

### Billing (Stripe)

| Service                | Purpose                          |
|------------------------|----------------------------------|
| stripewebhook          | Stripe event handler             |
| createcheckoutsession  | Initiate checkout                |
| createportalsession    | Customer portal                  |
| getsubscription        | Subscription status              |
| cancelsubscription     | Cancel subscription              |
| reactivatesubscription | Reactivate subscription          |

### API Keys

| Service       | Purpose              |
|---------------|----------------------|
| createapikey  | Generate API keys    |
| revokeapikey  | Revoke API keys      |

### User Lifecycle

| Service              | Purpose                    |
|----------------------|----------------------------|
| onuserprofilecreated | New user onboarding trigger |
| connectwebhook       | External webhook connector  |

---

## Firestore Data Model

```
firestore/
├── users/                 # User profiles
│   └── {uid}/
│       ├── profile        # Display name, email, plan
│       ├── apiKeys/       # API key collection
│       └── sessions/      # Triage sessions
├── screenshots/           # Screenshot metadata
│   └── {screenshotId}/
├── metrics/               # Aggregated metrics
│   └── {period}/
├── subscriptions/         # Stripe subscription data
│   └── {uid}/
└── webhooks/              # Registered webhooks
    └── {webhookId}/
```

---

## Domain & DNS

| Domain          | Status  | Notes                                    |
|-----------------|---------|------------------------------------------|
| rapidtriage.me  | 522 ERR | Cloudflare can't reach origin (Cloud Run)|

**Issue:** Cloudflare proxy enabled but origin connection failing.
Check Cloud Run cold-start or Cloudflare DNS proxy settings.

---

## Cost Profile

| Resource         | Monthly | Project         |
|------------------|---------|-----------------|
| SRT infra        | ~$0.52  | rapidtriage-me  |

---

## Client Packages

| Package               | Purpose                                |
|-----------------------|----------------------------------------|
| rapidtriage-extension | Chrome extension for browser capture   |
| rapidtriage-mcp       | MCP server for AI tool integration     |
| rapidtriage-server    | Standalone server deployment           |
| RapidTriageMobile     | Mobile app [SCAFFOLD — not shipped]    |

---

## Key Integration Points

- **MCP Protocol:** Exposes triage tools to AI agents via MCP server
- **Chrome Extension:** Direct browser integration for screenshot capture
- **Stripe:** Full subscription lifecycle (checkout → portal → cancel → reactivate)
- **Firebase Auth:** Shared auth with potential cross-product SSO via @sdods/auth [PLANNED]

---

## References

- Bruno collection: RapidTriageME-Bruno-Collection-v2.bru
- Postman collection: RapidTriageME-Postman-Collection.json
- OpenAPI spec: src/openapi/
- Deployment: deploy-production.sh
- Firestore rules: firestore.rules
- Firestore indexes: firestore.indexes.json
