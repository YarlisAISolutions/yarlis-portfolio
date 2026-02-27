# 🏛️ Yarlis Portfolio

> **AI Automation Infrastructure Company**
> One ecosystem, multiple revenue streams, compounding leverage.

[![Portfolio Status](https://img.shields.io/badge/Status-Active-green)](https://yarlis.com)
[![Products](https://img.shields.io/badge/Products-6-blue)](portfolio/products.yaml)
[![Domains](https://img.shields.io/badge/Domains-6-purple)](portfolio/domains.yaml)

---

## 📊 Portfolio Overview

| Domain | Product | Repo | Status | Category | Monetization |
|--------|---------|------|--------|----------|--------------|
| [yarlis.com](https://yarlis.com) | Yarlis Core | [yarlis-platform](https://github.com/siri1410/yarlis-platform) | 🟡 Build | Platform | Subscription |
| [yarlis.ai](https://yarlis.ai) | Yarlis AI | [yarlis-platform](https://github.com/siri1410/yarlis-platform) | 🟡 Build | AI | Enterprise |
| [mybotbox.com](https://mybotbox.com) | MyBotBox | [mybotbox-platform](https://github.com/siri1410/mybotbox-platform) | 🟢 Beta | Product | SaaS |
| [sdods.com](https://sdods.com) | SDODS | [sdods](https://github.com/siri1410/sdods) | 🟡 Build | Platform | Open Core |
| [yarlis.io](https://yarlis.io) | Yarlis IO | [yarlis-platform](https://github.com/siri1410/yarlis-platform) | 🔴 Idea | Product | Usage-based |
| [rapidtriage.me](https://rapidtriage.me) | SmartRapidTriage | [smartrapidtriage](https://github.com/siri1410/smartrapidtriage) | 🟢 Beta | Software Triage | Per-seat |

### Status Legend
- 🔴 **Idea** — Concept phase
- 🟡 **Build** — Active development
- 🟢 **Beta** — Deployed, testing with users
- 🔵 **Prod** — Live and monetizing

---

## 🌐 Live Infrastructure (Verified 2026-02-26)

### Domain Health

| Domain | Status | Serving From |
|--------|--------|-------------|
| [mybotbox.com](https://mybotbox.com) | ✅ Live (200) | Cloud Run → mybotbox-prod |
| [yarlis.com](https://yarlis.com) | ✅ Live (200) | Cloud Run → yarlis-platform |
| [rapidtriage.me](https://rapidtriage.me) | ⚠️ 522 | Cloudflare origin error — needs fix |
| staging-app.mybotbox.com | ❌ Not mapped | Domain mapping required |
| yarlis.ai | ❌ DNS not configured | — |
| yarlis.io | ❌ DNS not configured | — |
| sdods.com | ❌ DNS not configured | — |

### GCP Projects

| Display Name | Project ID | Purpose | Monthly Cost |
|---|---|---|---|
| MyBotBox Staging | `ystudio-core` | Staging + dev | $84.64 |
| MyBotBox | `mybotbox-prod` | Production | $11.97 |
| RapidTriageME | `rapidtriage-me` | SRT production | $0.52 |
| Yarlis Platform | `yarlis-platform` | yarlis.com hosting | $0.02 |
| Continuum | `continuum-c...` | Shared infra | $7.94 |
| Siribot | `siribot-ai-176...` | Dormant | $0.00 |

**Total: ~$105/mo | Revenue: $0**

### Cloud Run Services (Live)

<details>
<summary><strong>ystudio-core (Staging) — 12 services</strong></summary>

| Service | Status |
|---|---|
| mybotbox-app-staging | ✅ 200 |
| mybotbox-app | ✅ |
| crawl4ai | ✅ |
| executewebhook | ✅ |
| executeworkflow | ✅ |
| processknowledgebase | ✅ |
| triggerknowledgeprocessing | ✅ |
| triggerwebhook | ✅ |
| triggerworkflowexecution | ✅ |
| yarlis-production | ✅ (⚠️ wrong project) |
| yarlis-staging | ✅ (⚠️ wrong project) |
| mybotbox-docs-staging | ❌ Down |

</details>

<details>
<summary><strong>mybotbox-prod (Production) — 8 services</strong></summary>

| Service | Status |
|---|---|
| mybotbox-app | ✅ 200 |
| executewebhook | ✅ |
| executeworkflow | ✅ |
| processknowledgebase | ✅ |
| triggerknowledgeprocessing | ✅ |
| triggerwebhook | ✅ |
| triggerworkflowexecution | ✅ |
| ystudio-app-staging | ❌ Down (legacy) |

</details>

<details>
<summary><strong>rapidtriage-me — 24 services</strong></summary>

| Service | Status |
|---|---|
| api | ✅ |
| rapidtriage-server | ✅ |
| auth | ✅ |
| sse | ✅ |
| health | ✅ |
| stripewebhook | ✅ |
| createcheckoutsession | ✅ |
| createportalsession | ✅ |
| getsubscription | ✅ |
| cancelsubscription | ✅ |
| reactivatesubscription | ✅ |
| createapikey | ✅ |
| revokeapikey | ✅ |
| capturescreenshot | ✅ |
| onscreenshotcreated | ✅ |
| cleanupexpiredscreenshots | ✅ |
| cleanupexpiredsessions | ✅ |
| connectwebhook | ✅ |
| metrics | ✅ |
| aggregatemetrics | ✅ |
| onuserprofilecreated | ✅ |
| apidocs | ✅ |
| legal | ✅ |
| status | ✅ |

</details>

<details>
<summary><strong>yarlis-platform — 2 services</strong></summary>

| Service | Status |
|---|---|
| yarlis-com | ✅ |
| yarlis-com-staging | ✅ |

</details>

### Cloud SQL Databases

| Instance | Project | Tier | Status |
|---|---|---|---|
| ystudio-staging-db | ystudio-core | db-g1-small (PG 15) | ✅ |
| ystudio-db-budget | ystudio-core | db-custom-1-3840 (PG 15) | ⚠️ Overkill for staging |
| mybotbox-db | mybotbox-prod | db-f1-micro (PG 15) | ✅ |

### Firebase Hosting

| Site | URL | Project |
|---|---|---|
| ystudio-core | https://ystudio-core.web.app | ystudio-core |
| mybotbox-prod | https://mybotbox-prod.web.app | mybotbox-prod |
| rapidtriage-me | https://rapidtriage-me.web.app | rapidtriage-me |

---

## 🎯 Strategy

### Architecture — Independent Products, Shared Core

```
                    ┌─────────────────┐
                    │   @sdods/*      │
                    │ (Shared Pkgs)   │
                    └────────┬────────┘
                             │
              ┌──────────────┼──────────────┐
              │              │              │
              ▼              ▼              ▼
     ┌──────────────┐ ┌──────────────┐ ┌──────────────┐
     │ mybotbox.com │ │rapidtriage.me│ │ yarlis.com   │
     │ (Independent)│ │ (Independent)│ │ yarlis.ai    │
     │              │ │              │ │ yarlis.io    │
     └──────────────┘ └──────────────┘ └──────────────┘
       mybotbox-       smartrapidtriage  yarlis-platform
       platform                         (monorepo)
```

**Key decision:** MyBotBox and SmartRapidTriage are **independent repos**. Only shared dependency is `@sdods` common packages.

### Revenue Priority Order
1. **MyBotBox** → fastest SaaS monetization (3,900 source files, full product)
2. **SmartRapidTriage** → vertical niche (24 Cloud Run services, Stripe integrated)
3. **Yarlis AI** → higher-ticket enterprise
4. **SDODS** → open-core leverage
5. **Yarlis IO** → long-term scale

### 90-Day Target
**Primary:** Launch and monetize MyBotBox → $1K MRR

---

## 📋 Naming Conventions

| Type | Pattern | Example |
|------|---------|---------|
| GCP Project (prod) | `{product}` | `mybotbox-prod` |
| GCP Project (staging) | `{product}-staging`* | `ystudio-core` (legacy) |
| Cloud Run (prod) | `{product}-{component}` | `mybotbox-app` |
| Cloud Run (staging) | `{product}-{component}-staging` | `mybotbox-app-staging` |
| Git branch (prod) | `main` | — |
| Git branch (staging) | `develop` | — |
| Git branch (feature) | `feature/{name}` | `feature/billing-v2` |
| Git branch (fix) | `fix/{name}` | `fix/auth-redirect` |

*`ystudio-core` is immutable legacy name. Display name = "MyBotBox Staging".

### Release Types
See [mybotbox-platform/RELEASE-PROCESS.md](https://github.com/siri1410/mybotbox-platform/blob/main/RELEASE-PROCESS.md) for full CI/CD standards.

| Type | Scope | Example |
|---|---|---|
| **Static** | Frontend only, no DB | Landing page update |
| **DB Migration** | Schema changes | Add user preferences table |
| **Contract/API** | Endpoint changes, SDK updates | New webhook API v2 |
| **Feature** | Full stack (UI + API + DB) | Knowledge base v2 |

---

## 🗂️ Repository Index

| Repo | Category | Products | Active |
|------|----------|----------|--------|
| [mybotbox-platform](https://github.com/siri1410/mybotbox-platform) | Product | mybotbox.com | ✅ Primary |
| [smartrapidtriage](https://github.com/siri1410/smartrapidtriage) | Product | rapidtriage.me | ✅ Primary |
| [yarlis-platform](https://github.com/siri1410/yarlis-platform) | Monorepo | yarlis.com, yarlis.ai, yarlis.io | 🟡 Scaffold |
| [sdods](https://github.com/siri1410/sdods) | Platform | Shared packages | 🟡 Scaffold |
| [yarlis-portfolio](https://github.com/siri1410/yarlis-portfolio) | Governance | This repo | ✅ |

### MyBotBox Tech Stack (Verified)
- **Runtime:** Bun + Turbo monorepo
- **Frontend:** Next.js (App Router), Tailwind CSS
- **Backend:** API Routes + Cloud Run microservices
- **Database:** PostgreSQL 15 (Cloud SQL) + Drizzle ORM
- **Auth:** Firebase Auth + SSO + OAuth
- **Payments:** Stripe (checkout, portal, webhooks)
- **AI:** OpenAI, Anthropic, Ollama (model-agnostic)
- **Infra:** GCP Cloud Run + Firebase Hosting + Cloud Build

### SmartRapidTriage Tech Stack (Verified)
- **Runtime:** Node.js + Firebase Functions
- **Frontend:** Next.js
- **Database:** Firestore
- **Auth:** Firebase Auth
- **Payments:** Stripe
- **Automation:** Playwright, Chrome Extension
- **Infra:** GCP Cloud Run (24 services) + Firebase Hosting

---

## 🔧 Action Items

### 🔴 Critical
- [ ] Fix `staging-app.mybotbox.com` domain mapping
- [ ] Fix `rapidtriage.me` 522 error (Cloudflare origin)

### 🟡 Optimization
- [ ] Downgrade `ystudio-db-budget` (save ~$50/mo)
- [ ] Delete dead services: `ystudio-app-staging`, `yarlis-production`, `yarlis-staging`
- [ ] Configure DNS for yarlis.ai, yarlis.io, sdods.com

### 🟢 Next
- [ ] Deploy latest mybotbox-platform to staging
- [ ] Set up Cloud Build triggers (develop → staging auto-deploy)
- [ ] First paying customer

---

## 👤 Ownership

| Role | Person |
|------|--------|
| Founder/CEO | Siri (Sireesh Yarlagadda) |
| Strategic Execution Partner | SamJr 🧠⚙️ (AI) |

---

*Last verified: 2026-02-26 | All infrastructure data from live GCP/Firebase queries*
