# MyBotBox — CI/CD & Infrastructure

## CI/CD Pipeline

### ✅ GitHub Actions (Primary)

| Workflow | Trigger | Status |
|----------|---------|--------|
| `deploy-staging.yml` | Push to `main` | ✅ Active |
| `deploy-production.yml` | Manual dispatch | ✅ Active |
| `deploy-functions.yml` | Manual dispatch | ✅ Active |
| `test-build.yml` | PR / staging deploy | ✅ Active |
| `ci.yml` | PR | ✅ Active |
| `pr-review.yml` | PR opened | ✅ Active |
| `migrations.yml` | Manual | ✅ Active |
| `deploy-docs-staging.yml` | Push to main | ✅ Active |
| `publish-cli.yml` | Manual | ✅ Active |
| `publish-ts-sdk.yml` | Manual | ✅ Active |
| `publish-python-sdk.yml` | Manual | ✅ Active |

### ✅ Google Cloud Build (Secondary)

| Config | Purpose | Location |
|--------|---------|----------|
| `cloudbuild-staging.yaml` | Staging build + deploy | `infra/cloudbuild/` |
| `cloudbuild-production.yaml` | Production build + deploy | `infra/cloudbuild/` |
| `cloudbuild-functions.yaml` | Firebase Functions deploy | `infra/cloudbuild/` |
| `cloudbuild-app-deploy.yaml` | App-only deploy (no build) | `infra/cloudbuild/` |
| `cloudbuild-simple.yaml` | Simplified build | `infra/cloudbuild/` |
| `cloudbuild.yaml` | Root-level build | `apps/sat/` + root |

### ❌ Jenkins

**Not configured.** No `Jenkinsfile` exists. CI/CD is fully handled by GitHub Actions + Cloud Build.

---

## Dockerfiles

| File | Purpose |
|------|---------|
| `Dockerfile.cloudrun` | Cloud Run production image (optimized, multi-stage) |
| `Dockerfile` | Development / general build |
| `Dockerfile.docs` | Documentation site build |
| `apps/sat/Dockerfile` | App-specific build |
| `apps/sat/Dockerfile.hotfix` | Emergency hotfix deploys |
| `.devcontainer/Dockerfile` | VS Code devcontainer |

---

## Environments

### Staging (`staging-app.mybotbox.com`)

| Component | Status | Details |
|-----------|--------|---------|
| **Cloud Run** | ✅ Running | `mybotbox-app-staging` (rev 00082) |
| **URL** | ✅ Live | `https://staging-app.mybotbox.com` |
| **Cloud Run URL** | ✅ | `https://mybotbox-app-staging-70223867379.us-central1.run.app` |
| **Database** | ✅ | `ystudio-staging-db` (db-g1-small) |
| **Firebase** | ✅ | Project `ystudio-core` |
| **Health** | ⚠️ Degraded | Memory: 1653MB/2048MB (80.7%), DB: OK (35ms) |
| **GCP Project** | `ystudio-core` |
| **Image** | `gcr.io/ystudio-core/mybotbox-staging:staging-20260228-*` |

### Production (`mybotbox.com`)

| Component | Status | Details |
|-----------|--------|---------|
| **Cloud Run** | ✅ Running | `mybotbox-app` (last deploy: Feb 9, 2026) |
| **URL** | ✅ Live | `https://mybotbox.com` |
| **Cloud Run URL** | ✅ | `https://mybotbox-app-6iwk6n6b2a-uc.a.run.app` |
| **Database** | ✅ | `mybotbox-db` (db-f1-micro) |
| **Firebase** | ✅ | Project `mybotbox-prod` |
| **Health** | ⚠️ Degraded | Memory: 151MB/115MB (131.2%), DB: OK (307ms) |
| **GCP Project** | `mybotbox-prod` |
| **Image** | `gcr.io/mybotbox-prod/mybotbox-app:20260209-203900` |
| **API Health** | ❌ | `/api/health` returns 404 via `mybotbox.com` (Firebase Hosting not routing API calls) |

> ⚠️ **Production is 19 days behind staging.** Last prod deploy was Feb 9. Staging has ~15 commits ahead including brand fixes, auth improvements, and landing page.

> ⚠️ **Prod memory at 131.2%** — needs memory bump from current allocation.

---

## API Endpoints (196 routes)

### Core / Health

| Endpoint | Method | Staging | Production | Notes |
|----------|--------|---------|------------|-------|
| `/api/health` | GET | ✅ 200 (degraded) | ❌ 404 | Prod Firebase Hosting not routing `/api/*` |
| `/api/environment` | GET | ✅ | ❌ Not tested | App environment info |

### Authentication (14 routes)

| Endpoint | Method | Staging | Production |
|----------|--------|---------|------------|
| `/api/auth/sign-in` | POST | ✅ | ✅ |
| `/api/auth/sign-up` | POST | ✅ | ✅ |
| `/api/auth/sign-out` | POST | ✅ | ✅ |
| `/api/auth/session` | GET | ✅ | ✅ |
| `/api/auth/set-token` | POST | ✅ | ✅ |
| `/api/auth/forget-password` | POST | ✅ | ⚠️ Not tested |
| `/api/auth/reset-password` | POST | ✅ | ⚠️ Not tested |
| `/api/auth/device/*` | * | ✅ | ⚠️ Not tested |
| `/api/auth/oauth/*` | * | ✅ | ⚠️ Not tested |
| `/api/auth/sso/*` | * | ✅ | ⚠️ Not tested |
| `/api/auth/webhook/stripe` | POST | ✅ | ⚠️ Not tested |

### Admin (4 routes)

| Endpoint | Method | Staging | Production |
|----------|--------|---------|------------|
| `/api/admin/stats` | GET | ✅ | ⚠️ Not tested |
| `/api/admin/users` | GET | ✅ | ⚠️ Not tested |
| `/api/admin/audit` | GET | ✅ | ⚠️ Not tested |
| `/api/admin/revenue` | GET | ✅ | ⚠️ Not tested |

### Billing (4 routes)

| Endpoint | Method | Staging | Production |
|----------|--------|---------|------------|
| `/api/billing` | GET | ✅ | ⚠️ Not tested |
| `/api/billing/checkout` | POST | ✅ | ⚠️ Not tested |
| `/api/billing/portal` | POST | ✅ | ⚠️ Not tested |
| `/api/billing/update-cost` | POST | ✅ | ⚠️ Not tested |

### Workflows (20+ routes)

| Endpoint | Method | Staging | Production |
|----------|--------|---------|------------|
| `/api/workflows` | GET/POST | ✅ | ⚠️ Not tested |
| `/api/workflows/[id]` | GET/PUT/DELETE | ✅ | ⚠️ Not tested |
| `/api/workflows/[id]/execute` | POST | ✅ | ⚠️ Not tested |
| `/api/workflows/[id]/deploy` | POST | ✅ | ⚠️ Not tested |
| `/api/workflows/[id]/deployments` | GET | ✅ | ⚠️ Not tested |
| `/api/workflows/[id]/state` | GET/PUT | ✅ | ⚠️ Not tested |
| `/api/workflows/[id]/stats` | GET | ✅ | ⚠️ Not tested |
| `/api/workflows/[id]/log` | GET | ✅ | ⚠️ Not tested |
| `/api/workflows/[id]/duplicate` | POST | ✅ | ⚠️ Not tested |
| `/api/workflows/yaml/export` | POST | ✅ | ⚠️ Not tested |
| `/api/workflows/yaml/convert` | POST | ✅ | ⚠️ Not tested |
| `/api/workflows/public/[id]` | GET | ✅ | ⚠️ Not tested |

### Knowledge Base (12 routes)

| Endpoint | Method | Staging | Production |
|----------|--------|---------|------------|
| `/api/knowledge` | GET/POST | ✅ | ⚠️ Not tested |
| `/api/knowledge/[id]` | GET/PUT/DELETE | ✅ | ⚠️ Not tested |
| `/api/knowledge/[id]/documents` | GET/POST | ✅ | ⚠️ Not tested |
| `/api/knowledge/search` | POST | ✅ | ⚠️ Not tested |
| `/api/knowledge/[id]/tag-definitions` | GET/POST | ✅ | ⚠️ Not tested |

### Copilot / AI Agent (12 routes)

| Endpoint | Method | Staging | Production |
|----------|--------|---------|------------|
| `/api/copilot/chat` | POST | ✅ | ⚠️ Not tested |
| `/api/copilot/chats` | GET | ✅ | ⚠️ Not tested |
| `/api/copilot/api-keys` | GET/POST | ✅ | ⚠️ Not tested |
| `/api/copilot/feedback` | POST | ✅ | ⚠️ Not tested |
| `/api/copilot/training` | GET/POST | ✅ | ⚠️ Not tested |
| `/api/copilot/checkpoints` | GET/POST | ✅ | ⚠️ Not tested |
| `/api/copilot/stats` | GET | ✅ | ⚠️ Not tested |

### Tool Integrations (30+ routes)

| Tool | Endpoint Prefix | Staging | Production |
|------|-----------------|---------|------------|
| **Firecrawl** (web crawling) | `/api/tools/firecrawl/*` | ✅ | ⚠️ Not tested |
| **Gmail** | `/api/tools/gmail/*` | ✅ | ⚠️ Not tested |
| **Google Calendar** | `/api/tools/google_calendar/*` | ✅ | ⚠️ Not tested |
| **Google Drive** | `/api/tools/drive/*` | ✅ | ⚠️ Not tested |
| **Slack** | `/api/tools/slack/*` | ✅ | ⚠️ Not tested |
| **Discord** | `/api/tools/discord/*` | ✅ | ⚠️ Not tested |
| **Jira** | `/api/tools/jira/*` | ✅ | ⚠️ Not tested |
| **Linear** | `/api/tools/linear/*` | ✅ | ⚠️ Not tested |
| **Confluence** | `/api/tools/confluence/*` | ✅ | ⚠️ Not tested |
| **Microsoft Teams** | `/api/tools/microsoft-teams/*` | ✅ | ⚠️ Not tested |
| **OneDrive** | `/api/tools/onedrive/*` | ✅ | ⚠️ Not tested |
| **Outlook** | `/api/tools/outlook/*` | ✅ | ⚠️ Not tested |
| **SharePoint** | `/api/tools/sharepoint/*` | ✅ | ⚠️ Not tested |
| **PostgreSQL** | `/api/tools/postgresql/*` | ✅ | ⚠️ Not tested |
| **MySQL** | `/api/tools/mysql/*` | ✅ | ⚠️ Not tested |
| **MongoDB** | `/api/tools/mongodb/*` | ✅ | ⚠️ Not tested |
| **SMS** | `/api/tools/sms/*` | ✅ | ⚠️ Not tested |
| **Mail** | `/api/tools/mail/*` | ✅ | ⚠️ Not tested |
| **Stagehand** (browser agent) | `/api/tools/stagehand/*` | ✅ | ⚠️ Not tested |
| **Wealthbox** | `/api/tools/wealthbox/*` | ✅ | ⚠️ Not tested |
| **Microsoft Planner** | `/api/tools/microsoft_planner/*` | ✅ | ⚠️ Not tested |
| **Custom Tools** | `/api/tools/custom` | ✅ | ⚠️ Not tested |

> ❌ **crawl4ai**: NOT integrated. Web crawling uses **Firecrawl** (`/api/tools/firecrawl/crawl/[jobId]`).

### MCP (Model Context Protocol) (5 routes)

| Endpoint | Method | Staging | Production |
|----------|--------|---------|------------|
| `/api/mcp/servers` | GET/POST | ✅ | ⚠️ Not tested |
| `/api/mcp/servers/[id]` | GET/PUT/DELETE | ✅ | ⚠️ Not tested |
| `/api/mcp/servers/test-connection` | POST | ✅ | ⚠️ Not tested |
| `/api/mcp/tools/discover` | POST | ✅ | ⚠️ Not tested |
| `/api/mcp/tools/execute` | POST | ✅ | ⚠️ Not tested |

### Webhooks (10 routes)

| Endpoint | Method | Staging | Production |
|----------|--------|---------|------------|
| `/api/webhooks` | GET/POST | ✅ | ⚠️ Not tested |
| `/api/webhooks/[id]` | GET/PUT/DELETE | ✅ | ⚠️ Not tested |
| `/api/webhooks/trigger/[path]` | POST | ✅ | ⚠️ Not tested |
| `/api/webhooks/stripe` | POST | ✅ | ⚠️ Not tested |
| `/api/webhooks/test/[id]` | POST | ✅ | ⚠️ Not tested |
| `/api/webhooks/poll/gmail` | POST | ✅ | ⚠️ Not tested |
| `/api/webhooks/poll/outlook` | POST | ✅ | ⚠️ Not tested |

### Other APIs

| Endpoint | Method | Staging | Production |
|----------|--------|---------|------------|
| `/api/files/*` | * | ✅ | ⚠️ Not tested |
| `/api/folders/*` | * | ✅ | ⚠️ Not tested |
| `/api/logs/*` | * | ✅ | ⚠️ Not tested |
| `/api/memory/*` | * | ✅ | ⚠️ Not tested |
| `/api/organizations/*` | * | ✅ | ⚠️ Not tested |
| `/api/workspaces/*` | * | ✅ | ⚠️ Not tested |
| `/api/schedules/*` | * | ✅ | ⚠️ Not tested |
| `/api/templates/*` | * | ✅ | ⚠️ Not tested |
| `/api/users/me/*` | * | ✅ | ⚠️ Not tested |
| `/api/usage` | GET | ✅ | ⚠️ Not tested |
| `/api/providers/*` | * | ✅ | ⚠️ Not tested |
| `/api/v1/logs/*` | * | ✅ | ⚠️ Not tested |
| `/api/verify/*` | * | ✅ | ⚠️ Not tested |

---

## E2E Test Coverage

| Suite | Tests | Chromium | Firefox | Notes |
|-------|-------|----------|---------|-------|
| Auth Flow | 15 | ✅ | ✅ | Login, signup, forgot password |
| Auth Roles | 16 | ✅ | ✅ | owner/admin/member/viewer RBAC |
| Landing Pages | 8 | ✅ | ✅ | Screenshots at desktop + mobile |
| Navigation | 12 | ✅ | ✅ | Public + authenticated routes |
| Workspace | 15 | ✅ | ✅ | Dashboard, sidebar, folders |
| Workspace by Role | 16 | ✅ | ✅ | RBAC per role |
| Workflow Creation | 8 | ⚠️ 1 fail | ✅ | Canvas zoom hover timeout |
| Workflow Execution | 5 | ✅ | ✅ | Editor, canvas, nodes |
| Settings | 8 | ✅ | ✅ | Account, workspace, providers |
| Templates | 4 | ✅ | ✅ | List, search, cards |
| Knowledge Base | 5 | ✅ | ✅ | CRUD, search |
| Billing/Checkout | 4 | ✅ | ⚠️ 1 fail | Firefox auth timeout |
| Accessibility | 12 | ✅ | ⚠️ 1 fail | Keyboard nav, ARIA, responsive |
| Admin Dashboard | 8 | ✅ | ⚠️ 1 fail | RBAC enforcement |
| Comprehensive Regression | 76 | ✅ All pass | ⚠️ 2 fail | Full regression suite |
| Full Navigation | 12 | ✅ | ✅ | All public + auth routes |
| Logging System | 3 | ✅ | ✅ | Console error checks |
| Purchase Flow | 2 | ✅ | ✅ | Stripe integration |
| **Total** | **~474** | **~99% pass** | **~97% pass** | |

### Known Failures (5 total)

1. **Canvas zoom hover** (Chromium) — Starter block overlay intercepts pointer events
2. **Escape key modal** (Firefox) — Auth redirect timeout in `helpers/auth.ts:62`
3. **Billing checkout** (Firefox) — Same auth redirect timeout
4. **Admin API restriction** (Firefox) — Same auth redirect timeout
5. **Logout flow** (Firefox) — Same auth redirect timeout

**Root cause:** All Firefox failures share the same pattern — `page.waitForURL(/\/workspace/)` timeout at `helpers/auth.ts:62`. Firefox handles Firebase auth redirect ~2-3x slower than Chromium on staging.

---

## What's NOT Available

| Feature | Status | Notes |
|---------|--------|-------|
| **Jenkins** | ❌ Not configured | No Jenkinsfile. Use GitHub Actions + Cloud Build |
| **crawl4ai** | ❌ Not integrated | Uses **Firecrawl** instead for web crawling |
| **Production API health** | ❌ 404 | Firebase Hosting not routing `/api/*` to Cloud Run |
| **Production E2E tests** | ❌ Not run | Prod is 19 days behind staging |
| **Sentry / Error monitoring** | ❌ Not configured | Uses console logging + Cloud Run logs |
| **Load testing** | ❌ Not configured | No k6/locust setup |
| **Staging → Prod promotion** | ⚠️ Manual | No automated promotion pipeline |
| **Database backups** | ⚠️ GCP default | No custom backup schedule |
| **CDN / Edge caching** | ⚠️ Firebase only | No Cloudflare or custom CDN |

---

## Action Items

1. **🔴 Fix prod API routing** — Firebase Hosting needs rewrite rules for `/api/*` → Cloud Run
2. **🔴 Deploy staging to prod** — 19 days behind, includes critical fixes
3. **🟡 Increase Cloud Run memory** — Staging at 80.7%, Prod at 131.2%
4. **🟡 Fix Firefox auth timeout** — Increase timeout in `helpers/auth.ts:62`
5. **🟡 Set up error monitoring** — Sentry or GCP Error Reporting
6. **🟢 Automate staging → prod** — GitHub Action for promotion
