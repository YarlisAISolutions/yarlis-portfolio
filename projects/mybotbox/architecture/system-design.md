# MyBotBox — System Architecture

> Last updated: 2026-03-01

## Overview

MyBotBox is a multi-tenant AI workflow automation platform. Users build, test, and deploy AI-powered workflows through a visual editor with 30+ tool integrations and an AI copilot.

**Live:** mybotbox.com | **Repo:** mybotbox-platform (Turborepo monorepo)

---

## Stack

| Layer         | Technology                                    |
|---------------|-----------------------------------------------|
| Runtime       | Bun 1.2 + Node 22                             |
| Framework     | Next.js 15 (App Router) / React 19            |
| Styling       | Tailwind CSS 4 + shadcn/ui                    |
| State         | Zustand (20+ stores)                          |
| Database      | PostgreSQL 15 (Drizzle ORM, 104+ migrations)  |
| Auth          | Firebase Authentication                       |
| Realtime      | Firebase Realtime Database                    |
| Storage       | Google Cloud Storage                          |
| Background    | Cloud Tasks + Cloud Functions                 |
| Payments      | Stripe (checkout, portal, webhooks)           |
| AI/LLM        | Multi-provider (OpenAI, Anthropic, Google)    |
| Hosting       | Cloud Run (GCP)                               |
| CDN           | Firebase Hosting                              |
| Build         | Turborepo                                     |
| Lint/Format   | Biome                                         |

---

## Monorepo Structure

```
mybotbox-platform/
├── apps/
│   ├── sat/              # Main Next.js app (MyBotBox)
│   │   ├── app/api/      # 150+ API endpoints (33 route groups)
│   │   ├── stores/       # 20+ Zustand stores
│   │   └── ...
│   └── docs/             # Documentation site
├── packages/
│   ├── auth/             # Auth utilities
│   ├── cli/              # CLI tools
│   ├── db/               # Drizzle schema + 104 migrations
│   ├── monitoring/       # Observability
│   ├── python-sdk/       # Python SDK
│   └── ts-sdk/           # TypeScript SDK
├── functions/            # Cloud Functions (Firebase)
│   └── yarlis-agent/     # Agent runtime
└── helm/                 # Kubernetes/Helm charts (sim)
```

---

## Architecture Diagram

```
                    +----------------------------------+
                    |          Cloudflare CDN           |
                    |       mybotbox.com (DNS+SSL)      |
                    +----------------+-----------------+
                                     |
                    +----------------v-----------------+
                    |        Firebase Hosting           |
                    |     (Static assets + rewrites)    |
                    +----------------+-----------------+
                                     |
             +-----------------------v------------------------+
             |              Cloud Run                         |
             |         mybotbox-app (Next.js 15)              |
             |     SSR + API routes + Workflow Engine          |
             +--+------+------+------+------+-----------+----+
                |      |      |      |      |           |
     +----------v+ +---v---+ +v-----+ +----v----+ +----v--------+
     |Cloud SQL  | |Firebase| |GCS   | |Stripe   | |LLM Providers|
     |PostgreSQL | |Auth+RT | |Files | |Billing  | |OpenAI/Claude|
     |(Drizzle)  | |+RTDB   | |Blobs | |Checkout | |Gemini/Ollama|
     +-----------+ +--------+ +------+ +---------+ +-------------+
                |
     +----------v---------------------------------------------+
     |              Background Services (Cloud Run)            |
     +--------------+--------------+--------------------------+
     |executewebhook|executeworkflow|processknowledgebase      |
     |triggerwebhook|triggerworkflow|triggerknowledgeprocessing |
     |              |  execution   |                           |
     +--------------+--------------+---------------------------+
```

---

## Cloud Run Services

### ystudio-core (Staging) — 12 services

| Service                     | Status |
|-----------------------------|--------|
| mybotbox-app-staging        | LIVE   |
| mybotbox-app                | LIVE   |
| crawl4ai                    | LIVE   |
| executewebhook              | LIVE   |
| executeworkflow              | LIVE   |
| processknowledgebase        | LIVE   |
| triggerknowledgeprocessing   | LIVE   |
| triggerwebhook              | LIVE   |
| triggerworkflowexecution     | LIVE   |
| yarlis-production           | LIVE   |
| yarlis-staging              | LIVE   |
| mybotbox-docs-staging       | DOWN   |

### mybotbox-prod (Production) — 8 services

| Service                     | Status  |
|-----------------------------|---------|
| mybotbox-app                | LIVE    |
| executewebhook              | LIVE    |
| executeworkflow              | LIVE    |
| processknowledgebase        | LIVE    |
| triggerknowledgeprocessing   | LIVE    |
| triggerwebhook              | LIVE    |
| triggerworkflowexecution     | LIVE    |
| ystudio-app-staging         | LEGACY  |

---

## Cloud SQL Databases

| Instance            | Project       | Tier              | PG Version |
|---------------------|---------------|-------------------|------------|
| ystudio-staging-db  | ystudio-core  | db-g1-small       | PG 15      |
| ystudio-db-budget   | ystudio-core  | db-custom-1-3840  | PG 15      |
| mybotbox-db         | mybotbox-prod | db-f1-micro       | PG 15      |

---

## API Surface (33 Route Groups, 150+ Endpoints)

### Core APIs

| Group          | Base Path           | Key Operations                                      |
|----------------|---------------------|-----------------------------------------------------|
| Auth           | /api/auth/          | sign-in, sign-up, sign-out, SSO, OAuth, device auth |
| Billing        | /api/billing/       | checkout, portal, update-cost, stripe webhook        |
| Workflows      | /api/workflows/     | CRUD, execute, deploy, revert, duplicate, YAML      |
| Copilot        | /api/copilot/       | chat, confirm, execute tool, feedback, training      |
| Knowledge      | /api/knowledge/     | CRUD bases, documents, chunks, tags, semantic search |
| Organizations  | /api/organizations/ | CRUD orgs, members, invitations, workspaces          |
| Workspaces     | /api/workspaces/    | CRUD, init, env vars, permissions, API keys          |
| Webhooks       | /api/webhooks/      | CRUD, test, trigger, Stripe/Gmail/Outlook polling    |
| Tools          | /api/tools/         | 30+ integrations (see below)                         |
| MCP            | /api/mcp/           | servers CRUD, test connection, discover/execute      |

### Supporting APIs

| Group       | Base Path             | Purpose                        |
|-------------|-----------------------|--------------------------------|
| Admin       | /api/admin/           | Admin operations               |
| Chat        | /api/chat/            | Chat sessions                  |
| Enterprise  | /api/enterprise/      | Enterprise lead capture        |
| Environment | /api/environment/     | Environment config             |
| Files       | /api/files/           | File management                |
| Folders     | /api/folders/         | Folder organization            |
| Function    | /api/function/        | Function execution             |
| Guardrails  | /api/guardrails/      | Input validation               |
| Health      | /api/health           | Health check                   |
| Invitations | /api/invitations/     | Invitation management          |
| Logs        | /api/logs/            | Log retrieval                  |
| Memory      | /api/memory/          | Memory/context management      |
| Providers   | /api/providers/       | LLM provider config            |
| Proxy       | /api/proxy/           | Image/TTS proxy                |
| Schedules   | /api/schedules/       | Scheduled tasks                |
| Telemetry   | /api/telemetry/       | Usage telemetry                |
| Templates   | /api/templates/       | Workflow templates             |
| Usage       | /api/usage/           | Usage statistics               |
| Users       | /api/users/           | User management                |
| Verify      | /api/verify/          | Verification endpoints         |
| Wand        | /api/wand-generate    | AI wand generation             |
| YAML        | /api/yaml/            | YAML import/export             |
| v1          | /api/v1/              | External v1 API                |

---

## Tool Integrations (30+)

**Productivity:** Gmail, Google Drive, Google Calendar, Slack, Discord,
Microsoft Teams, Outlook, OneDrive, SharePoint, Microsoft Planner,
Confluence, Jira, Linear

**Data:** MongoDB, MySQL, PostgreSQL, Wealthbox

**Communication:** SMS (Twilio)

**Web:** Firecrawl (crawling), Stagehand (browser automation), Crawl4AI

**AI:** Multi-provider LLM (OpenAI, Anthropic, Google, Ollama), MCP servers

**Custom:** User-defined custom tools

---

## Zustand Store Architecture (20+ stores)

```
stores/
├── copilot/              # AI copilot state
│   ├── store.ts          # Chat state, messages, streaming
│   └── preview-store.ts  # Preview/sandbox state
├── workflows/            # Workflow editor state
│   └── subblock/store.ts # Node subblock editing
├── execution/            # Workflow execution tracking
├── knowledge/            # Knowledge base state
├── panel/                # UI panel state
│   ├── store.ts          # Panel visibility/layout
│   ├── chat/store.ts     # Chat panel
│   ├── console/store.ts  # Console/debug panel
│   └── variables/store.ts# Variables panel
├── organization/store.ts # Current org context
├── sidebar/store.ts      # Sidebar navigation
├── settings/
│   ├── general/store.ts  # General settings
│   └── environment/store.ts # Env variable editing
├── custom-tools/store.ts # Custom tool management
├── mcp-servers/          # MCP server state
├── operation-queue/store.ts # Async operation queue
├── copilot-training/     # Training data state
├── folders/              # Folder tree state
├── logs/                 # Log viewer state
├── providers/store.ts    # LLM provider config
├── subscription/         # Subscription/billing state
├── undo-redo/            # Undo/redo stack
└── workflow-diff/        # Diff viewer state
```

---

## Deployment Flow

```
Developer (local, Bun)
      |
      v
  git push --> GitHub
      |
      +-- GitHub Actions (lint, type-check, test)
      |
      +-- Cloud Build (container image)
      |         |
      |    +----v------------------------+
      |    |  Staging (ystudio-core)     |
      |    |  mybotbox-app-staging       |
      |    +----------------------------+
      |
      +-- Manual promote / release script
                  |
             +----v----------------------------+
             |  Production (mybotbox-prod)      |
             |  mybotbox-app                   |
             +--------------------------------+
```

**Environment switching:**
- Dev:     `firebase use dev`     + `gcloud set project continuum-dev`
- Staging: `firebase use staging` + `gcloud set project continuum-staging`
- Prod:    `firebase use prod`    + `gcloud set project continuum-core`

---

## Domain & DNS

| Domain                    | Status   | Notes                              |
|---------------------------|----------|------------------------------------|
| mybotbox.com              | LIVE     | Production traffic                 |
| staging-app.mybotbox.com  | BROKEN   | DNS/SSL not configured             |

---

## Cost Profile

| Resource              | Monthly | Project       |
|-----------------------|---------|---------------|
| Staging infra         | ~$84    | ystudio-core  |
| Production infra      | ~$12    | mybotbox-prod |
| **Total**             | **~$96**|               |

**Cost note:** ystudio-db-budget (db-custom-1-3840) in staging is overkill.
Downgrading to db-f1-micro would save ~$50/mo.

---

## Known Issues

| Severity   | Issue                                                    |
|------------|----------------------------------------------------------|
| CRITICAL   | staging-app.mybotbox.com — DNS not pointing to Cloud Run |
| WARNING    | mybotbox-docs-staging — service down                     |
| WARNING    | ystudio-app-staging in prod project — legacy, clean up   |
| COST       | Staging DB oversized ($50/mo waste)                      |

---

## References

- Infrastructure spec: mybotbox-platform/INFRASTRUCTURE.md
- DB migrations: packages/db/migrations/ (104+ migrations)
- Release process: mybotbox-platform/RELEASE-PROCESS.md
- Helm charts: helm/sim/
