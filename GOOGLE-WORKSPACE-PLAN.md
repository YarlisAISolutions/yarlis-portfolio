# 🎯 Google Workspace Productivity Plan

> Leverage Google Workspace to 10x Yarlis execution speed as a solo founder.

## Current State
- **Accounts:** `sireesh.yarlagadda@gmail.com` (personal), `samjrbot2026@gmail.com` (SamJr agent)
- **Google Workspace:** Not yet configured for `@yarlis.com` domain
- **Drive:** No organized Yarlis folders
- **Notion:** Workspace connected (token active) but 0 pages — blank slate

## Phase 1: Foundation (This Week)

### 1.1 Google Workspace for `yarlis.com`
Google Workspace Business Starter ($7/user/mo):
- `siri@yarlis.com` — Founder
- `samjr@yarlis.com` — AI Agent (shared mailbox)
- `admin@yarlis.com` — System admin
- DNS: Add MX, TXT (SPF), DKIM records to Route 53 for yarlis.com

### 1.2 Drive Structure
```
📁 Yarlis (Shared Drive)
├── 📁 0-Strategy
│   ├── 📄 Master Strategy (Doc)
│   ├── 📊 OKRs Tracker (Sheet)
│   └── 📊 90-Day Sprint Board (Sheet)
├── 📁 1-Products
│   ├── 📁 MyBotBox
│   │   ├── 📄 Product Requirements
│   │   ├── 📄 Go-to-Market Plan
│   │   └── 📊 MRR Tracker (Sheet)
│   ├── 📁 SmartRapidTriage
│   ├── 📁 SDODS
│   ├── 📁 Yarlis.ai / Yarlis.io / Yarlis.com
├── 📁 2-Engineering
│   ├── 📄 Architecture Decision Records
│   ├── 📊 Infrastructure Costs (Sheet)
│   └── 📊 Test Coverage Dashboard (Sheet)
├── 📁 3-Business
│   ├── 📄 Investor Deck (Slides)
│   ├── 📊 P&L Tracker (Sheet)
│   └── 📊 Customer Pipeline (Sheet)
├── 📁 4-Design → Links to Figma projects
├── 📁 5-Legal (ToS, Privacy, DPA)
└── 📁 6-Operations (Runbooks, DNS Registry)
```

### 1.3 Calendar System
```
📅 Yarlis Business Calendar
├── 🔵 Monday   — Platform Sync (30 min, 9:00 AM)
├── 🟢 Daily    — SamJr Standup (15 min, 6:15 AM)
├── 🟡 Sunday   — CEO Review (1 hr, 9:00 AM)
├── 🔴 Friday   — Deploy Window (2 hr, 2:00 PM)
└── 🟣 1st/Mo   — Metrics Review (1 hr, 10:00 AM)
```

## Phase 2: Live Dashboards (Week 2)

### Google Sheets as Command Center

**MRR Tracker** — Auto-populated by Stripe webhook → Cloud Function → Sheets API
**GCP Cost Tracker** — Weekly via `gcloud billing` or BigQuery export
**Infrastructure Registry** — All domains, DNS, GCP projects, services, DBs
**Test Results Dashboard** — E2E pass rates, coverage, deploy frequency

### Gmail Automation
- Labels: `Yarlis/MyBotBox`, `Yarlis/SRT`, `Yarlis/GCP Alerts`, `Yarlis/Stripe`, `Yarlis/GitHub`
- Auto-filters by sender
- SamJr daily digest of unread business emails

## Phase 3: Notion as Strategy Layer (Week 3)

### Databases to Create
```
📋 Yarlis Strategy Hub
├── 🗄️ Product Backlog — Product, Priority, Status, Sprint, Points
├── 🗄️ OKRs — Objective, Key Result, Target, Current, Quarter
├── 🗄️ ADR Log — ID, Title, Status, Date, Impact, Product
├── 📄 90-Day Plan
├── 📄 Weekly Review Template
└── 📄 Product Intake Template
```

## Phase 4: SamJr Automation Hooks

| Automation | Schedule | Source | Output |
|-----------|----------|--------|--------|
| Morning briefing | 6:15 AM daily | Calendar + Gmail + GCP + GitHub | Telegram summary |
| Weekly metrics | Sunday 9 AM | GCP costs + tests + deploys | Sheet update + Telegram |
| Monthly report | 1st of month | P&L + MRR + infra changes | Doc + Telegram |
| Deploy tracker | On deploy | Cloud Build webhook | Sheet row + notify |
| Cost alerts | Continuous | GCP budget | Email + GitHub issue |

## Integration Flow
```
Figma (Design) ──► GitHub (Code) ──► GCP (Deploy)
     │                   │                 │
     ▼                   ▼                 ▼
Portfolio/design/   Portfolio/arch/   Portfolio/infra/
     │                   │                 │
     └───────────────────┼─────────────────┘
                         ▼
              Google Sheets (Dashboards)
              Google Docs (Decisions)
              Notion (Strategy + Backlog)
              Calendar (Ceremonies)
```

## Action Items

### Siri Must Do:
- [ ] Sign up for Google Workspace at workspace.google.com ($7/user/mo)
- [ ] Add MX/TXT/DKIM to Route 53 for yarlis.com
- [ ] Re-auth `gog` CLI: `gog auth add siri@yarlis.com --services gmail,calendar,drive,docs,sheets`
- [ ] Connect Notion integration to pages (workspace is empty — needs first page created in Notion UI)

### SamJr Will Do (after auth):
- [ ] Create Drive folder structure
- [ ] Create Sheets dashboards (MRR, costs, infra)
- [ ] Set up Gmail labels/filters
- [ ] Create calendar ceremonies
- [ ] Populate Notion strategy databases
- [ ] Set up heartbeat/cron automation
