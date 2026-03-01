# RapidTriage (SRT) User Stories

> Priority: **#2** | Stage: Beta | Platform: Cloudflare Workers
> Status key: ✅ done | 🔄 in-progress | 📋 planned | 🔴 gap

---

## 1. VS Code Extension Workflow

### SRT-V1: Install and authenticate extension
**As a** developer, **I want to** install the SRT VS Code extension and authenticate, **so that** I can triage issues from my editor.
- **Acceptance Criteria:**
  - [ ] Extension published on VS Code Marketplace
  - [ ] OAuth or API key auth flow within VS Code
  - [ ] Status bar shows connection status
- **Priority:** P0 | **Status:** 🔄 in-progress (Figma designs exist)

### SRT-V2: Triage from editor context
**As a** developer, **I want to** right-click a code block or error and trigger triage, **so that** I get AI-assisted diagnosis without leaving my editor.
- **Acceptance Criteria:**
  - [ ] Context menu "Triage with SRT" option
  - [ ] Sends code context + error to SRT API
  - [ ] Results displayed in side panel with severity, category, suggested fix
- **Priority:** P0 | **Status:** 📋 planned

### SRT-V3: View triage history in extension
**As a** developer, **I want to** see past triages in a sidebar, **so that** I can reference previous diagnoses.
- **Acceptance Criteria:**
  - [ ] Sidebar panel lists recent triages (last 50)
  - [ ] Click to expand full details
  - [ ] Filter by severity/date
- **Priority:** P1 | **Status:** 📋 planned

---

## 2. Browser Automation

### SRT-A1: Browser-based triage dashboard
**As a** team lead, **I want** a web dashboard to view all triaged issues, **so that** I can monitor team throughput.
- **Acceptance Criteria:**
  - [ ] Dashboard at app.rapidtriage.me
  - [ ] Table view with filters (severity, assignee, status, date range)
  - [ ] Real-time updates via WebSocket or SSE
- **Priority:** P0 | **Status:** 🔴 gap

### SRT-A2: Automated browser testing triage
**As a** QA engineer, **I want to** pipe browser test failures into SRT, **so that** failures are auto-triaged.
- **Acceptance Criteria:**
  - [ ] Playwright/Cypress reporter plugin sends failures to SRT API
  - [ ] Each failure gets severity + root cause category
  - [ ] Results linkable in CI/CD reports
- **Priority:** P1 | **Status:** 🔴 gap

---

## 3. Triage Rules Engine

### SRT-R1: Create custom triage rules
**As a** team lead, **I want to** define rules (e.g., "if error contains 'OOM' → severity: critical, assign: infra team"), **so that** triage is consistent.
- **Acceptance Criteria:**
  - [ ] Rule builder UI with conditions (regex, keyword, source) and actions (severity, assign, tag)
  - [ ] Rules evaluated in priority order
  - [ ] Test rule against sample data before saving
- **Priority:** P0 | **Status:** 🔴 gap

### SRT-R2: AI-assisted rule suggestions
**As a** team lead, **I want** SRT to suggest new rules based on patterns in triaged issues, **so that** I can improve automation over time.
- **Acceptance Criteria:**
  - [ ] Weekly digest email with suggested rules
  - [ ] One-click accept/reject for each suggestion
  - [ ] Suggestions based on clustering of similar issues
- **Priority:** P2 | **Status:** 🔴 gap

---

## 4. Team Collaboration

### SRT-C1: Assign triaged issues
**As a** team lead, **I want to** assign triaged issues to team members, **so that** ownership is clear.
- **Acceptance Criteria:**
  - [ ] Assign dropdown on each triage result
  - [ ] Assignee gets notification (email or Slack)
  - [ ] Filter dashboard by "assigned to me"
- **Priority:** P1 | **Status:** 🔴 gap

### SRT-C2: Comment on triage results
**As a** team member, **I want to** add comments to a triage result, **so that** we can discuss resolution.
- **Acceptance Criteria:**
  - [ ] Comment thread on each triage detail page
  - [ ] @mention teammates
  - [ ] Markdown support
- **Priority:** P2 | **Status:** 🔴 gap

---

## Summary

| Category | P0 | P1 | P2 | Done | In-Progress | Planned | Gap |
|----------|----|----|-----|------|-------------|---------|-----|
| VS Code | 2 | 1 | 0 | 0 | 1 | 2 | 0 |
| Browser | 1 | 1 | 0 | 0 | 0 | 0 | 2 |
| Rules | 1 | 0 | 1 | 0 | 0 | 0 | 2 |
| Collab | 0 | 1 | 1 | 0 | 0 | 0 | 2 |
| **Total** | **4** | **3** | **2** | **0** | **1** | **2** | **6** |
