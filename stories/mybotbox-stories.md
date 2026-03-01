# MyBotBox User Stories — MVP to Revenue

> Priority: **#1 revenue target** | Goal: $1K MRR in 90 days
> Status key: ✅ done | 🔄 in-progress | 📋 planned | 🔴 gap

---

## 1. Billing & Subscription (Stripe)

### MBB-B1: Subscribe to a plan
**As a** user, **I want to** select and subscribe to a pricing plan via Stripe, **so that** I can unlock paid features.
- **Acceptance Criteria:**
  - [ ] Pricing page displays Free, Pro ($29/mo), Team ($79/mo) plans
  - [ ] Stripe Checkout session created on plan selection
  - [ ] Webhook handles `checkout.session.completed` → provisions plan
  - [ ] User sees active plan in account settings
- **Priority:** P0 | **Status:** 🔴 gap

### MBB-B2: Manage subscription
**As a** subscriber, **I want to** upgrade, downgrade, or cancel my plan, **so that** I control my spend.
- **Acceptance Criteria:**
  - [ ] Stripe Customer Portal accessible from settings
  - [ ] Plan changes apply at next billing cycle (or immediately for upgrades)
  - [ ] Cancellation sets end-of-period access, then downgrades to Free
  - [ ] Webhook handles `customer.subscription.updated` and `deleted`
- **Priority:** P0 | **Status:** 🔴 gap

### MBB-B3: Usage-based billing for API calls
**As a** power user, **I want** API call usage tracked against my plan limits, **so that** I know when I'm approaching limits.
- **Acceptance Criteria:**
  - [ ] Usage meter tracks API calls per billing period
  - [ ] Warning email at 80% and 100% of limit
  - [ ] Overage either blocks or bills at per-unit rate (configurable)
- **Priority:** P1 | **Status:** 🔴 gap

### MBB-B4: Invoice history
**As a** subscriber, **I want to** view and download past invoices, **so that** I can expense them.
- **Acceptance Criteria:**
  - [ ] Invoice list from Stripe API displayed in billing settings
  - [ ] PDF download link for each invoice
- **Priority:** P2 | **Status:** 🔴 gap

---

## 2. Multi-Tenant Workspace Management

### MBB-W1: Create workspace
**As a** new user, **I want to** create a workspace during signup, **so that** my data is isolated.
- **Acceptance Criteria:**
  - [ ] Workspace created with unique slug
  - [ ] Creator becomes workspace Owner
  - [ ] Tenant isolation enforced at DB level (tenant_id on all queries)
- **Priority:** P0 | **Status:** 🔄 in-progress (multi-tenant exists but needs billing tie-in)

### MBB-W2: Switch between workspaces
**As a** user in multiple workspaces, **I want to** switch context without logging out, **so that** I can manage multiple orgs.
- **Acceptance Criteria:**
  - [ ] Workspace switcher in nav bar
  - [ ] All API calls scoped to selected workspace
  - [ ] Last-used workspace persisted
- **Priority:** P1 | **Status:** 📋 planned

### MBB-W3: Workspace settings
**As a** workspace owner, **I want to** configure workspace name, logo, and default settings, **so that** the workspace feels branded.
- **Acceptance Criteria:**
  - [ ] Settings page for name, logo upload, timezone
  - [ ] Changes reflected across all workspace views
- **Priority:** P2 | **Status:** 📋 planned

---

## 3. Onboarding Flow

### MBB-O1: First-time user onboarding
**As a** new user, **I want** a guided setup that gets me to my first working workflow in <5 minutes, **so that** I see value immediately.
- **Acceptance Criteria:**
  - [ ] Step 1: Create workspace (or join via invite)
  - [ ] Step 2: Choose use case template (customer support, sales, ops)
  - [ ] Step 3: Connect first integration (Slack, email, or webhook)
  - [ ] Step 4: Test workflow with sample data
  - [ ] Step 5: "You're live!" confirmation with next steps
  - [ ] Progress tracked, can resume if abandoned
- **Priority:** P0 | **Status:** 🔴 gap

### MBB-O2: Template gallery for quick start
**As a** new user, **I want to** browse pre-built workflow templates, **so that** I don't start from scratch.
- **Acceptance Criteria:**
  - [ ] Gallery with 10+ templates categorized by use case
  - [ ] One-click clone into my workspace
  - [ ] Template includes description, required integrations, expected outcome
- **Priority:** P0 | **Status:** 🔴 gap

---

## 4. Workflow Marketplace

### MBB-M1: Publish workflow to marketplace
**As a** workflow creator, **I want to** publish my workflow to a marketplace, **so that** others can use it (free or paid).
- **Acceptance Criteria:**
  - [ ] "Publish" button on workflow editor
  - [ ] Set price (free, one-time, or subscription)
  - [ ] Review/approval flow before listing
  - [ ] Seller receives 80% of revenue via Stripe Connect
- **Priority:** P1 | **Status:** 🔴 gap

### MBB-M2: Browse and install marketplace workflows
**As a** user, **I want to** browse, preview, and install marketplace workflows, **so that** I can leverage community solutions.
- **Acceptance Criteria:**
  - [ ] Searchable/filterable marketplace page
  - [ ] Preview shows workflow diagram, reviews, install count
  - [ ] One-click install into my workspace
  - [ ] Paid workflows go through Stripe checkout
- **Priority:** P1 | **Status:** 🔴 gap

### MBB-M3: Rate and review marketplace workflows
**As a** user, **I want to** rate workflows I've installed, **so that** others can make informed decisions.
- **Acceptance Criteria:**
  - [ ] 1-5 star rating + text review
  - [ ] Only users who installed can review
  - [ ] Average rating displayed on listing
- **Priority:** P2 | **Status:** 🔴 gap

---

## 5. Team Management

### MBB-T1: Invite team members
**As a** workspace owner, **I want to** invite team members by email, **so that** my team can collaborate.
- **Acceptance Criteria:**
  - [ ] Invite via email with magic link
  - [ ] Invited user joins workspace with assigned role
  - [ ] Pending invites visible and revocable
- **Priority:** P0 | **Status:** 📋 planned

### MBB-T2: Role-based access control (RBAC)
**As a** workspace owner, **I want to** assign roles (Owner, Admin, Editor, Viewer), **so that** I control who can do what.
- **Acceptance Criteria:**
  - [ ] Owner: full control including billing and delete workspace
  - [ ] Admin: manage members, workflows, integrations
  - [ ] Editor: create/edit workflows
  - [ ] Viewer: read-only access to workflows and analytics
  - [ ] Role enforced on every API endpoint
- **Priority:** P0 | **Status:** 🔴 gap (auth exists but no granular roles)

### MBB-T3: Remove or deactivate members
**As a** workspace owner, **I want to** remove members, **so that** ex-employees lose access immediately.
- **Acceptance Criteria:**
  - [ ] Remove button on team page
  - [ ] Removed user's sessions invalidated immediately
  - [ ] Audit log entry created
- **Priority:** P1 | **Status:** 📋 planned

---

## 6. API Key Management

### MBB-A1: Generate API keys for integrations
**As a** user, **I want to** create API keys for external tool integrations, **so that** my workflows can connect to third-party services.
- **Acceptance Criteria:**
  - [ ] API key generation page in settings
  - [ ] Keys scoped to specific integrations (OpenAI, Slack, etc.)
  - [ ] Keys stored encrypted at rest
  - [ ] Key shown once on creation, then masked
- **Priority:** P0 | **Status:** 🔄 in-progress

### MBB-A2: Rotate and revoke API keys
**As a** user, **I want to** rotate or revoke API keys, **so that** I can respond to security incidents.
- **Acceptance Criteria:**
  - [ ] Rotate: generates new key, old key valid for 24h grace period
  - [ ] Revoke: immediate invalidation
  - [ ] Audit log for all key operations
- **Priority:** P1 | **Status:** 📋 planned

---

## 7. Dashboard & Analytics

### MBB-D1: Workflow execution dashboard
**As a** user, **I want to** see a dashboard of workflow executions, **so that** I know what's running and what's failing.
- **Acceptance Criteria:**
  - [ ] Total executions, success rate, avg duration (last 24h/7d/30d)
  - [ ] Per-workflow breakdown table
  - [ ] Failed executions highlighted with error details
  - [ ] Real-time or near-real-time updates
- **Priority:** P0 | **Status:** 🔄 in-progress

### MBB-D2: Usage analytics
**As a** workspace owner, **I want to** see usage by team member and integration, **so that** I can optimize costs.
- **Acceptance Criteria:**
  - [ ] API calls per integration per day
  - [ ] Cost estimation based on usage
  - [ ] Export to CSV
- **Priority:** P1 | **Status:** 📋 planned

### MBB-D3: Audit log
**As a** workspace owner, **I want** a full audit log, **so that** I can track who did what.
- **Acceptance Criteria:**
  - [ ] Log: user, action, resource, timestamp, IP
  - [ ] Searchable and filterable
  - [ ] Retained for 90 days (Free) / 1 year (Pro+)
- **Priority:** P1 | **Status:** 🔴 gap

---

## Summary

| Category | P0 | P1 | P2 | Done | In-Progress | Planned | Gap |
|----------|----|----|-----|------|-------------|---------|-----|
| Billing | 2 | 1 | 1 | 0 | 0 | 0 | 4 |
| Workspace | 1 | 1 | 1 | 0 | 1 | 2 | 0 |
| Onboarding | 2 | 0 | 0 | 0 | 0 | 0 | 2 |
| Marketplace | 0 | 2 | 1 | 0 | 0 | 0 | 3 |
| Team Mgmt | 2 | 1 | 0 | 0 | 0 | 2 | 1 |
| API Keys | 1 | 1 | 0 | 0 | 1 | 1 | 0 |
| Analytics | 1 | 2 | 0 | 0 | 1 | 1 | 1 |
| **Total** | **9** | **8** | **3** | **0** | **3** | **6** | **11** |

**Critical path to $1K MRR:** MBB-B1 → MBB-B2 → MBB-O1 → MBB-O2 → MBB-T2
