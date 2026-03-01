# 📋 Notion Setup for Yarlis

## Step 1: Create Root Page (You — 1 minute)
1. Open Notion
2. Create a new page called **"Yarlis Strategy Hub"**
3. Click `•••` menu → **Connections** → Add your integration (the one using token `ntn_4857...`)
4. This gives SamJr access to create sub-pages and databases

## Step 2: SamJr Creates Everything (Automated)
Once connected, tell SamJr: "Set up Notion databases"

SamJr will create:

### 🗄️ Product Backlog
| Property | Type | Options |
|----------|------|---------|
| Name | Title | — |
| Product | Select | MyBotBox, SRT, SDODS, Yarlis.ai, Yarlis.io, Yarlis.com |
| Priority | Select | P0-Critical, P1-High, P2-Medium, P3-Low |
| Status | Status | Backlog, Sprint, In Progress, Review, Done |
| Sprint | Select | S1-Mar, S2-Apr, ... |
| Story Points | Number | 1-13 |
| Type | Select | Feature, Bug, Chore, Spike |
| Acceptance Criteria | Rich Text | — |

### 🗄️ OKRs
| Property | Type |
|----------|------|
| Objective | Title |
| Key Result | Rich Text |
| Target | Number |
| Current | Number |
| Quarter | Select (Q1-2026, Q2-2026, ...) |
| Product | Select |
| Owner | Person |

### 🗄️ ADR Log
| Property | Type |
|----------|------|
| Title | Title |
| ADR ID | Number |
| Status | Select (Proposed, Accepted, Deprecated) |
| Impact | Select (High, Medium, Low) |
| Product | Multi-select |
| Date | Date |
| Context | Rich Text |
| Decision | Rich Text |

### 📄 Pages
- 90-Day Plan (current sprint goals + weekly targets)
- Weekly Review Template
- Product Intake Template (for evaluating new product ideas)
- Domain Status Dashboard (synced from GitHub portfolio)

## Step 3: Link to Portfolio
After Notion is populated, SamJr will:
- Add Notion links to each `projects/*.md` file
- Update `OPERATING-SYSTEM.md` with Notion URLs
- Set up SamJr weekly sync (Notion ↔ GitHub Portfolio)
