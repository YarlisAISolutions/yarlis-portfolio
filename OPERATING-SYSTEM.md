# Yarlis Operating System
> One Core Platform. Multiple Revenue Surfaces. Shared Infrastructure.
> Established: 2026-02-27 | Owner: Siri Y | Strategic Partner: SamJr

---

## 🧭 North Star

**5-Year Objective:** $10M+ ARR multi-product AI ecosystem.
**12-Month Objective:** First $100K ARR from MyBotBox + SmartRapidTriage.
**90-Day Objective:** First $1K MRR from MyBotBox.

---

## 🏗️ Portfolio Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    YARLIS ECOSYSTEM                      │
│                                                         │
│  ┌─────────────────────────────────────────────────┐    │
│  │              CORE PLATFORM (@sdods)              │    │
│  │                                                  │    │
│  │  Auth ─── Billing ─── AI Layer ─── UI System    │    │
│  │  RBAC ─── Multi-tenant ─── Observability        │    │
│  │  Agent Orchestration ─── Vector DB ─── CI/CD    │    │
│  └──────────┬──────────────────┬───────────────────┘    │
│             │                  │                         │
│  ┌──────────▼──────┐  ┌───────▼────────┐               │
│  │  REVENUE ACTIVE │  │ STRATEGIC BUILD│               │
│  │     (60%)       │  │     (30%)      │               │
│  │                 │  │                │               │
│  │ ┌─────────────┐ │  │ ┌────────────┐ │  ┌──────────┐ │
│  │ │ mybotbox.com│ │  │ │ sdods.com  │ │  │EXPLORATORY│ │
│  │ │ AI Workflow │ │  │ │ Shared Pkgs│ │  │  (10%)   │ │
│  │ │ Builder     │ │  │ └────────────┘ │  │          │ │
│  │ └─────────────┘ │  │ ┌────────────┐ │  │yarlis.ai │ │
│  │ ┌─────────────┐ │  │ │ yarlis.com │ │  │yarlis.io │ │
│  │ │rapidtriage  │ │  │ │ Control    │ │  │          │ │
│  │ │.me Software │ │  │ │ Plane      │ │  └──────────┘ │
│  │ │ Triage      │ │  │ └────────────┘ │               │
│  │ └─────────────┘ │  └────────────────┘               │
│  └─────────────────┘                                    │
└─────────────────────────────────────────────────────────┘
```

---

## 📊 Domain Priority Matrix (Next 12 Months)

| Priority | Domain | Category | Time % | Revenue Target | Key Milestone |
|---|---|---|---|---|---|
| **#1** | mybotbox.com | 🟢 Revenue Active | 40% | $1K MRR → $5K MRR | First 10 paying customers |
| **#2** | rapidtriage.me | 🟢 Revenue Active | 20% | $500 MRR | First 5 paying teams |
| **#3** | sdods.com | 🟡 Strategic Build | 20% | — | Extract auth+billing from MBB |
| **#4** | yarlis.com | 🟡 Strategic Build | 10% | — | Landing + portfolio dashboard |
| **#5** | yarlis.ai | 🔵 Exploratory | 5% | — | Enterprise pilot design |
| **#6** | yarlis.io | 🔵 Exploratory | 5% | — | Concept only |

### Discipline Rule
Before starting ANY task:
- [ ] Does this improve the core platform?
- [ ] Does this move revenue?
- [ ] Does this create reusable IP?

**If none → deprioritize. No exceptions.**

---

## 🔄 Weekly Operating Playbook

### Sunday Evening — CEO Review (45 min)

**Template:**
```markdown
## Week of [DATE] — CEO Review

### 💰 Revenue Movement
- MRR: $___
- New customers: ___
- Churn: ___
- Pipeline: ___

### 🚀 Product Progress
- MyBotBox: [what shipped]
- SmartRapidTriage: [what shipped]
- Core Platform: [what shipped]

### 🚧 Blockers
1.
2.

### 💸 Capital Burn
- GCP: $___/mo
- Tools: $___/mo
- Total: $___/mo

### 🎯 Next Week Priority (max 5 tasks)
1.
2.
3.
4.
5.

### ⚡ Strategic Alignment Check
- Which domain moved closest to monetization? ___
- If none → why?
```

### Monday Morning — Platform Sync (30 min)

**Questions to answer:**
1. What core infra improved last week?
2. What reusable component was built?
3. What duplicated logic can be centralized?
4. Is @sdods growing or stagnant?

### Daily — Execution Board

**Single Kanban. 5 active tasks maximum.**

| Column | Purpose |
|---|---|
| Platform Core | Shared infra work |
| MyBotBox | Revenue active #1 |
| SmartRapidTriage | Revenue active #2 |
| Yarlis.com | Strategic build |
| R&D | Exploratory (yarlis.ai, yarlis.io) |

**WIP Limit: 5 total across all columns.**

---

## 📄 Documentation Framework

### 3 Document Types Only

| Type | Purpose | Where | When Updated |
|---|---|---|---|
| **Strategy Doc** (Why) | Vision, ICP, monetization, defensibility | Notion | Quarterly |
| **Architecture Doc** (How) | Infra diagrams, flows, system interactions | GitHub + Figma | When architecture changes |
| **Execution Log** (What) | Weekly summaries, decisions, learnings | GitHub (memory/) | Weekly |

**Banned:** Endless PRDs, speculative docs, redundant documentation.

### Per-Domain Strategy Doc Template

```markdown
## [Domain] — Strategy Doc

### Vision (1 sentence)

### ICP (Ideal Customer Profile)
- Who:
- Size:
- Pain:

### Monetized Problem
- What they pay for:
- Pricing model:
- Target ACV:

### Shared Infra Consumed
- [ ] Auth (@sdods/auth)
- [ ] Billing (@sdods/billing)
- [ ] UI Components (@sdods/ui)
- [ ] AI Layer (@sdods/ai)
- [ ] Agent Orchestration

### Defensibility
- What's hard to replicate:
- Lock-in mechanism:

### Status
- Current: [Idea | Build | Beta | Revenue]
- MRR: $___
- Users: ___
```

---

## 🛠️ Tool Responsibility Matrix

| Tool | Owns | Rule |
|---|---|---|
| **Google Workspace** | Finalized decisions, investor docs, contracts | Only store FINAL versions |
| **Notion** | Strategy + Planning dashboards | High-signal only, no sprawl |
| **Figma** | Single design system + domain flows | ONE system, not 6 |
| **GitHub** | Technical truth — all code, docs-as-code | Monorepo preferred |
| **Cursor / Claude** | Code acceleration | Standardized prompting templates |
| **OpenClaw (SamJr)** | Execution partner — deploy, monitor, push | Always available |

---

## 🔒 Shared Infrastructure Roadmap

### Phase 1: Extract from MyBotBox (Now → Week 4)
| Package | Source | Status |
|---|---|---|
| `@sdods/auth` | mybotbox-platform/packages/auth | 🔴 Extract |
| `@sdods/billing` | mybotbox-platform Stripe integration | 🔴 Extract |
| `@sdods/ui` | mybotbox-platform/apps/sat/components/ui | 🔴 Extract |
| `@sdods/db` | mybotbox-platform/packages/db | 🟡 Exists, needs cleanup |
| `@sdods/monitoring` | mybotbox-platform/packages/monitoring | 🟡 Exists |

### Phase 2: SRT Consumes @sdods (Week 5 → Week 8)
- Migrate SRT auth to `@sdods/auth`
- Migrate SRT billing to `@sdods/billing`
- Shared UI components

### Phase 3: Yarlis Platform Consumes @sdods (Week 9 → Week 12)
- yarlis.com, yarlis.ai use shared packages
- Single sign-on across all domains

---

## 📈 Metrics That Matter

### Weekly (tracked every Sunday)
| Metric | Target |
|---|---|
| MRR | $0 → $1,000 (90 days) |
| Active users (MBB staging) | 10 beta |
| Paid conversions | 5 |
| GCP spend | < $100/mo |
| Shared packages published | +1/week |
| Active task count | ≤ 5 |

### Monthly
| Metric | Target |
|---|---|
| Revenue growth | 20% MoM |
| @sdods packages extracted | 2+/month |
| Customer conversations | 5+/month |
| Net burn | Decreasing |

---

## ⚠️ Anti-Patterns to Watch

| Pattern | Signal | Fix |
|---|---|---|
| **Diffused focus** | Working on 3+ domains in a day | Pick ONE domain per day |
| **Premature abstraction** | Building @sdods before MBB works | Extract from working code only |
| **Feature over revenue** | No pricing page, no checkout | Ship billing before features |
| **Infra perfectionism** | $85/mo staging with 0 customers | Downgrade, ship, iterate |
| **Documentation sprawl** | 20+ Notion pages nobody reads | 3 doc types only |
| **Solo founder trap** | Doing everything yourself | Automate (SamJr), delegate, cut scope |

---

## 🎯 Immediate Action Items (This Week)

### 🔴 Revenue (Do First)
- [ ] Fix rapidtriage.me 522 error (Cloudflare origin)
- [ ] Verify MyBotBox staging login flow end-to-end
- [ ] Create MyBotBox pricing page with live Stripe checkout
- [ ] Identify 10 beta testers and send invites

### 🟡 Platform
- [ ] Downgrade `ystudio-db-budget` Cloud SQL ($50/mo savings)
- [ ] Delete 5 dead Cloud Run services
- [ ] Authorize GitHub Cloud Build connection → auto-deploy trigger
- [ ] Set up `develop` branch for staging deploys

### 🟢 Foundation
- [ ] Create single Figma design system (merge 6 projects)
- [ ] First @sdods package extraction (start with @sdods/ui)
- [ ] Set up Sunday CEO Review template in Notion

---

*This document is the operating system. Update it weekly. If it grows beyond 3 pages, you're doing it wrong.*
