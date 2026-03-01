# Yarlis Portfolio — Gap Analysis

> Generated: 2026-03-01 | Solo founder context | Revenue priority: MyBotBox → SRT → Yarlis AI → SDODS → Yarlis IO

---

## 1. Design Gaps

| Product | Figma Files | Severity | Notes |
|---------|-------------|----------|-------|
| mybotbox.com | 1 (Manus Page Design, 2 pages) | **Medium** | Landing page designed. App UI has no Figma — built code-first. |
| rapidtriage.me | 4 (Architecture, User Journey, VS Code, Untitled) | **Low** | Well-covered for beta stage. |
| yarlis.com | 0 | **High** | Control plane for entire ecosystem — needs IA and UI design before build. |
| yarlis.ai | 0 | **High** | No design, no clear product spec yet. |
| yarlis.io | 0 | **Medium** | Developer docs/portal — can use off-the-shelf doc theme initially. |
| sdods.com | 0 | **Medium** | Component library — Storybook can serve as "design" initially. |

**Suggested Fix:**
- **Immediate (Week 1-2):** Create MyBotBox app UI Figma for billing/onboarding flows (P0 stories need designs)
- **Q2:** Yarlis.com information architecture + wireframes
- **Q3:** Yarlis.ai product definition + design sprint

---

## 2. Architecture Gaps

| Gap | Severity | Products Affected | Suggested Fix |
|-----|----------|-------------------|---------------|
| No system architecture diagrams | **High** | All | Create C4 diagrams (context, container, component) for MyBotBox and SRT |
| No API design docs (OpenAPI/Swagger) | **High** | MyBotBox (150+ endpoints undocumented) | Generate OpenAPI spec from existing code, publish at docs.mybotbox.com |
| No event/message bus design | **Medium** | Platform | Define async communication pattern before cross-product integration |
| No data model documentation | **Medium** | MyBotBox, SRT | ER diagrams for core entities |
| No auth architecture for SSO | **High** | Platform | Design OIDC provider architecture before Q3 SSO work |
| Monolith vs microservice decision undocumented | **Medium** | MyBotBox | Document current architecture and scaling strategy |

**Suggested Fix:**
- **Week 1:** Auto-generate OpenAPI from MyBotBox codebase (150+ endpoints = highest leverage)
- **Week 2:** C4 context + container diagrams for MyBotBox and SRT
- **Q2:** Auth architecture RFC for SSO

---

## 3. Revenue Gaps

| Gap | Severity | Impact | Suggested Fix |
|-----|----------|--------|---------------|
| No billing integration in ANY product | **🔴 Critical** | $0 MRR, blocks all revenue | Implement Stripe in MyBotBox (P0, stories MBB-B1/B2) |
| No pricing page | **🔴 Critical** | Can't convert visitors to customers | Design + ship pricing page with Stripe Checkout |
| No payment webhook handling | **🔴 Critical** | Can't provision paid plans | Implement Stripe webhook endpoint |
| No usage metering | **High** | Can't enforce plan limits or upsell | Add API call counting middleware |
| No Stripe Connect for marketplace | **Medium** | Blocks marketplace monetization | Defer to Q4 2026 |
| No financial dashboard | **Medium** | No visibility into revenue metrics | Use Stripe Dashboard initially, build custom in Q3 |

**Suggested Fix:**
- **This week:** Stripe account setup, pricing page, checkout flow, webhook handler
- **Target:** First paying customer within 30 days

---

## 4. Testing Gaps

| Product | E2E Tests | Unit Tests | Integration Tests | Severity |
|---------|-----------|------------|-------------------|----------|
| MyBotBox | 474 ✅ | Unknown | Unknown | **Low** — well-tested |
| SRT | 0 | Unknown | Unknown | **High** — beta with no tests |
| SDODS | 0 | 0 | 0 | **Low** — brand new scaffold |
| Yarlis Platform | 0 | 0 | 0 | **Low** — brand new scaffold |

**Suggested Fix:**
- **Week 1-2:** Add smoke tests for SRT critical paths (Cloudflare Workers)
- **Ongoing:** Maintain MyBotBox test suite as billing features are added
- **Q2:** Testing strategy for @sdods package (unit + visual regression)

---

## 5. Documentation Gaps

| Gap | Severity | Suggested Fix |
|-----|----------|---------------|
| No API documentation for MyBotBox (150+ endpoints) | **🔴 Critical** | Auto-generate OpenAPI spec; host at docs.mybotbox.com |
| No deployment guide for any product | **High** | Document staging/prod deploy process for MyBotBox and SRT |
| No onboarding docs for contributors | **Medium** | README with setup instructions (if hiring/contracting) |
| No architecture decision records (ADRs) | **Medium** | Start ADR log for major decisions |
| No user-facing docs/help center | **High** | Ship basic docs before first paying customer (Notion/GitBook) |
| No runbook for incidents | **Medium** | Document common failure modes and recovery steps |

**Suggested Fix:**
- **Before first customer:** API docs + basic help center (can be simple markdown site)
- **Q2:** Full developer docs at yarlis.io

---

## 6. Infrastructure Gaps

| Gap | Severity | Suggested Fix |
|-----|----------|---------------|
| DNS not configured for yarlis.ai | **High** | Configure DNS records (Cloudflare or registrar) |
| DNS not configured for yarlis.io | **High** | Configure DNS records |
| DNS not configured for sdods.com | **Medium** | Configure when @sdods package is ready (Q2) |
| Jenkins: 0 plugins, 0 jobs | **High** | Set up CI/CD pipeline for MyBotBox (or migrate to GitHub Actions) |
| No monitoring/alerting | **High** | Add uptime monitoring (UptimeRobot/Checkly) + error tracking (Sentry) |
| No CDN for static assets | **Medium** | Cloudflare already in use for SRT — extend to MyBotBox |
| No backup strategy documented | **High** | Document and automate DB backups |
| No staging environment for SRT | **Medium** | Add staging Worker in Cloudflare |

**Suggested Fix:**
- **This week:** DNS for yarlis.ai and yarlis.io (even if just parking pages)
- **This week:** Uptime monitoring for mybotbox.com and rapidtriage.me
- **Week 2:** CI/CD pipeline (GitHub Actions preferred over empty Jenkins)

---

## 7. Security Gaps

| Gap | Severity | Suggested Fix |
|-----|----------|---------------|
| No SOC2 compliance | **Medium** | Not needed until enterprise tier (Q4 2026). Start evidence collection in Q3. |
| No penetration testing | **High** | Run OWASP ZAP scan against MyBotBox staging before first paying customer |
| Jenkins default credentials (just changed) | **Low** | ✅ Fixed. Add to security checklist for future services. |
| No secrets management solution | **High** | Migrate from .env files to Vault or cloud secrets manager |
| No rate limiting on APIs | **High** | Add rate limiting middleware to MyBotBox API |
| No CORS policy audit | **Medium** | Audit and tighten CORS headers |
| No dependency vulnerability scanning | **High** | Add `npm audit` / Snyk to CI pipeline |
| No security headers (CSP, HSTS) | **Medium** | Add security headers via middleware or Cloudflare |

**Suggested Fix:**
- **Before first customer:** Rate limiting, OWASP scan, dependency audit
- **Q2:** Secrets management migration
- **Q4:** Begin SOC2 prep if enterprise demand exists

---

## Priority Matrix

| Severity | Count | Immediate Action Needed |
|----------|-------|------------------------|
| 🔴 Critical | 4 | Stripe billing, pricing page, webhooks, API docs |
| High | 14 | DNS, CI/CD, monitoring, security basics, architecture docs |
| Medium | 12 | Design work, documentation, SOC2 prep |
| Low | 3 | Already handled or deferred appropriately |

**Bottom line:** The #1 blocker across the entire portfolio is **zero revenue infrastructure**. Everything else is secondary until Stripe is integrated and the first customer can pay.
