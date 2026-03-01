# Yarlis Portfolio — 2026 Roadmap

> Solo founder. Revenue-first. Ship > perfect.

---

## Q1 2026 (Jan–Mar) — **Revenue Foundation**

**Theme:** Get MyBotBox to $1K MRR. Ship SRT beta.

### MyBotBox (Primary Focus)
- [ ] Stripe integration: pricing page, checkout, webhooks (Week 1-2)
- [ ] Plan enforcement: Free/Pro/Team feature gating (Week 2-3)
- [ ] Onboarding flow: signup → first workflow in <5 min (Week 3-4)
- [ ] Template gallery: 10+ starter workflows (Week 4-5)
- [ ] RBAC: Owner/Admin/Editor/Viewer roles (Week 5-6)
- [ ] API docs: auto-generate OpenAPI from 150+ endpoints (Week 2)
- [ ] Basic help center / user docs (Week 6)
- [ ] Security hardening: rate limiting, OWASP scan, dep audit (Week 3)

### RapidTriage (Secondary)
- [ ] VS Code extension: publish to marketplace (ongoing)
- [ ] Smoke tests for critical paths
- [ ] Bug fixes from beta feedback

### Infrastructure
- [ ] DNS configuration for yarlis.ai, yarlis.io
- [ ] Uptime monitoring (mybotbox.com, rapidtriage.me)
- [ ] CI/CD pipeline via GitHub Actions (replace empty Jenkins)
- [ ] Error tracking (Sentry) on MyBotBox

### Milestone: **First paying MyBotBox customer by end of March**

---

## Q2 2026 (Apr–Jun) — **Product Expansion**

**Theme:** Extract @sdods. Launch yarlis.ai. Grow MyBotBox to $3K MRR.

### MyBotBox
- [ ] Usage analytics dashboard
- [ ] Workspace switcher (multi-workspace support)
- [ ] Audit logging
- [ ] Marketplace v1 (community workflow sharing, free only)
- [ ] Growth: content marketing, ProductHunt launch

### @sdods Extraction
- [ ] Extract shared components from MyBotBox → `@sdods/ui` npm package
- [ ] Storybook documentation at sdods.com
- [ ] Design tokens (colors, spacing, typography)
- [ ] Migrate MyBotBox to consume `@sdods/ui`

### Yarlis AI
- [ ] Product definition and scope document
- [ ] Figma wireframes and user flows
- [ ] MVP build (scope TBD based on market research)
- [ ] DNS + hosting setup

### RapidTriage
- [ ] Web dashboard at app.rapidtriage.me
- [ ] Triage rules engine v1
- [ ] Playwright/Cypress reporter plugin

### Milestone: **MyBotBox $3K MRR. @sdods published. Yarlis.ai MVP.**

---

## Q3 2026 (Jul–Sep) — **Platform Unification**

**Theme:** Yarlis.com as control plane. Cross-product SSO. Scale to $7K MRR.

### Yarlis.com Control Plane
- [ ] Information architecture + Figma designs
- [ ] Central auth service (OIDC provider)
- [ ] SSO: "Sign in with Yarlis" across all products
- [ ] Social login (Google, GitHub)
- [ ] Unified billing dashboard

### MyBotBox
- [ ] Marketplace v2: paid workflows via Stripe Connect
- [ ] Team management improvements
- [ ] Enterprise features: SSO, audit log export, SLAs

### RapidTriage
- [ ] Team collaboration (assignments, comments)
- [ ] AI-assisted rule suggestions
- [ ] Pricing + Stripe integration

### Infrastructure
- [ ] Secrets management migration (Vault or cloud KMS)
- [ ] Begin SOC2 evidence collection (if enterprise demand)
- [ ] Cross-product analytics dashboard

### Milestone: **SSO live. MyBotBox $7K MRR. SRT first revenue.**

---

## Q4 2026 (Oct–Dec) — **Marketplace & Enterprise**

**Theme:** Marketplace monetization. Enterprise tier. Target $10K+ MRR.

### Marketplace
- [ ] Workflow marketplace with ratings, reviews, paid listings
- [ ] Stripe Connect payouts to workflow creators
- [ ] Featured/curated collections

### Enterprise Tier
- [ ] SOC2 Type I (if demand exists)
- [ ] Custom domains for workspaces
- [ ] Priority support SLAs
- [ ] Volume discounts / annual billing
- [ ] On-prem deployment option (stretch)

### Platform
- [ ] Bundle pricing across products
- [ ] Cross-sell engine (in-app recommendations)
- [ ] Yarlis.io developer portal with API docs for all products
- [ ] Partner/integration program

### Milestone: **$10K+ MRR. 3+ products generating revenue. Marketplace live.**

---

## Key Risks & Mitigations

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|------------|
| Solo founder bandwidth | High | High | Ruthless prioritization. MyBotBox first. Defer everything else. |
| No revenue by end of Q1 | Medium | Critical | Ship Stripe in Week 1-2. Don't perfectionist the billing flow. |
| Over-expanding to 6 products | High | High | Only MyBotBox and SRT get dev time in Q1-Q2. Others are parked. |
| SRT beta stalls | Medium | Medium | Keep SRT as side focus. Don't let it distract from MyBotBox revenue. |
| Burnout | Medium | High | Maintain fitness routine. Scope cuts > overtime. |

---

## Decision Rules

1. **If it doesn't drive MyBotBox revenue in Q1, it waits.**
2. **If it can be bought/outsourced for <$500, buy it.**
3. **If a feature takes >2 weeks, break it down or cut scope.**
4. **Ship weekly. Deploy daily.**
5. **Revenue > architecture > features > polish.**
