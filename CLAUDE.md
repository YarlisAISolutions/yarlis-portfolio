# CLAUDE.md — yarlis-portfolio

## What Is This?
This is the **Yarlis Portfolio OS** — the documentation, standards, gap analysis, and
roadmap for the 6-domain Yarlis ecosystem. This is a **documentation-only repo** with no
deployable application code.

Think of it as the "operating system" layer above the actual products: it defines how the
ecosystem evolves, what the gaps are, and where to invest next.

## Key Directories
| Dir | Purpose |
|-----|---------|
| `portfolio/` | Product specs, domain definitions, product YAML registry |
| `standards/` | Coding standards, commit conventions, PR guidelines |
| `infra/` | CI/CD templates, deployment runbooks |
| `brand/` | Brand assets, color system, typography |
| `docs/` | Cross-product documentation |
| `projects/` | Sprint-level project plans |
| `stories/` | User stories and acceptance criteria |
| `templates/` | Reusable doc templates |
| `registry/` | Product and service registry |
| `entrepreneur/` | Founder strategy and business planning |

## Key Files
| File | Purpose |
|------|---------|
| `GAP-ANALYSIS.md` | Current gaps across all 6 domains (design, arch, revenue, testing) |
| `ROADMAP.md` | Quarterly roadmap for the Yarlis ecosystem |
| `OPERATING-SYSTEM.md` | How the Yarlis ecosystem operates (processes, governance) |
| `CHANGELOG.md` | Portfolio-level change log |

> Note: `DOMAINS.md` lives in the `yarlis-platform` repo (not here).

## The 6 Domains
| Domain | Product | Status |
|--------|---------|--------|
| yarlis.com | Yarlis Core (identity, RBAC, billing) | Build |
| yarlis.ai | Yarlis AI (orchestration, multi-model) | Build |
| mybotbox.com | MyBotBox (SMB no-code chatbot SaaS) | Beta |
| sdods.com | SDODS (open-core ops dashboards) | Build |
| yarlis.io | Yarlis IO (prompt→production) | Idea |
| rapidtriage.me | SmartRapidTriage (AI incident triage) | Beta |

## Agent Rules
- **Documentation only** — no application code lives here
- **No stale dates** — update dates when editing docs (check Last Updated badges)
- **Link to live products** — always reference the active repo + live URL
- **Keep GAP-ANALYSIS.md current** — update when gaps are resolved or new ones discovered
- **Conventional commits** — even for docs: `docs:`, `chore:`, `fix:`
- **No confidential data** — this repo may be referenced publicly; keep secrets in Infisical
- When closing a gap, mark it resolved in GAP-ANALYSIS.md with date + commit reference
