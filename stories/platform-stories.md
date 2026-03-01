# Platform Stories — Cross-Cutting Concerns

> These stories span multiple products in the Yarlis ecosystem.
> Status key: ✅ done | 🔄 in-progress | 📋 planned | 🔴 gap

---

## 1. SSO Across All Domains

### PLT-S1: Single sign-on via Yarlis account
**As a** user, **I want to** log in once at yarlis.com and access mybotbox.com, rapidtriage.me, and all other products, **so that** I don't manage multiple accounts.
- **Acceptance Criteria:**
  - [ ] Central auth service at auth.yarlis.com (or yarlis.com/auth)
  - [ ] OAuth2/OIDC provider with PKCE
  - [ ] All product apps configured as OIDC clients
  - [ ] Session shared via secure cookie on `.yarlis.com` + cross-domain token exchange for external domains
  - [ ] "Sign in with Yarlis" button on all products
- **Priority:** P1 | **Status:** 🔴 gap

### PLT-S2: Social login (Google, GitHub)
**As a** user, **I want to** sign up with Google or GitHub, **so that** onboarding is frictionless.
- **Acceptance Criteria:**
  - [ ] Google and GitHub as identity providers on central auth
  - [ ] Account linking if email already exists
  - [ ] Works across all products
- **Priority:** P1 | **Status:** 🔴 gap

---

## 2. Shared Billing

### PLT-B1: Unified billing account
**As a** user, **I want** one billing account across all Yarlis products, **so that** I get one invoice.
- **Acceptance Criteria:**
  - [ ] Single Stripe customer per user across all products
  - [ ] Billing dashboard at yarlis.com shows all active subscriptions
  - [ ] Upgrade/downgrade any product from central billing
- **Priority:** P1 | **Status:** 🔴 gap

### PLT-B2: Bundle pricing
**As a** user, **I want to** subscribe to multiple products at a discount, **so that** the ecosystem is cheaper than competitors.
- **Acceptance Criteria:**
  - [ ] Bundle tiers defined (e.g., MyBotBox Pro + SRT Pro = 20% off)
  - [ ] Stripe coupon/promotion codes applied automatically
  - [ ] Bundle status visible in billing dashboard
- **Priority:** P2 | **Status:** 🔴 gap

---

## 3. @sdods Package Extraction

### PLT-D1: Extract @sdods as standalone npm package
**As a** developer, **I want** the @sdods component library extracted from MyBotBox into its own package, **so that** all products share consistent UI.
- **Acceptance Criteria:**
  - [ ] `@sdods/ui` published to npm (or private registry)
  - [ ] Storybook docs at sdods.com
  - [ ] MyBotBox migrated to consume `@sdods/ui` instead of local components
  - [ ] All Yarlis products use `@sdods/ui` for shared components
  - [ ] Semver releases with changelog
- **Priority:** P1 | **Status:** 🔴 gap (scaffold exists, no extraction done)

### PLT-D2: Design tokens in @sdods
**As a** designer/developer, **I want** shared design tokens (colors, spacing, typography) in @sdods, **so that** all products look cohesive.
- **Acceptance Criteria:**
  - [ ] Token system (CSS variables + JS constants)
  - [ ] Theme support (light/dark)
  - [ ] Figma token sync (via Tokens Studio or similar)
- **Priority:** P2 | **Status:** 🔴 gap

---

## 4. Unified Analytics Dashboard

### PLT-A1: Cross-product analytics
**As** Siri (founder), **I want** a single dashboard showing key metrics across all products, **so that** I can make portfolio-level decisions.
- **Acceptance Criteria:**
  - [ ] Dashboard at yarlis.com/analytics (admin only)
  - [ ] Per-product: MAU, MRR, churn, NPS
  - [ ] Portfolio totals and trends
  - [ ] Data sourced from Stripe + product DBs
- **Priority:** P2 | **Status:** 🔴 gap

---

## 5. Cross-Sell Engine

### PLT-X1: In-app cross-product recommendations
**As a** MyBotBox user, **I want to** see relevant recommendations for SRT or other Yarlis products, **so that** I discover tools that complement my workflow.
- **Acceptance Criteria:**
  - [ ] Contextual banner/card in product UI (non-intrusive)
  - [ ] Recommendations based on usage patterns (e.g., "You run CI workflows → try SRT for auto-triage")
  - [ ] Dismiss/snooze option
  - [ ] Click-through tracks conversion
- **Priority:** P2 | **Status:** 🔴 gap

---

## Summary

| Category | P1 | P2 | Gap |
|----------|----|----|-----|
| SSO | 2 | 0 | 2 |
| Billing | 1 | 1 | 2 |
| @sdods | 1 | 1 | 2 |
| Analytics | 0 | 1 | 1 |
| Cross-sell | 0 | 1 | 1 |
| **Total** | **4** | **4** | **8** |

All platform stories are currently gaps. None are blocking MyBotBox $1K MRR — they become critical in Q3-Q4 2026.
