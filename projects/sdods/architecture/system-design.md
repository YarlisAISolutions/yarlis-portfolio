# SDODS — System Architecture

> Last updated: 2026-03-01

## Overview

SDODS (Software Development & Operations Data Systems) is a collection of shared, open-source TypeScript packages consumed by MyBotBox, SmartRapidTriage, and other Yarlis products. It provides the foundational building blocks (auth, observability, payments, UI) so each product doesn't reinvent infrastructure.

**Repo:** sdods | **License:** MIT | **Package Manager:** pnpm 9 | **Build:** Turborepo

---

## Package Map (8 packages)

```
@sdods/
├── core              # Core utilities, types, constants
├── auth              # Authentication abstractions
│                     # Firebase Auth wrapper, JWT, session mgmt
│                     # Consumed by: MBB, SRT
├── observability     # Logging, tracing, metrics
│                     # OpenTelemetry, structured logging
│                     # Consumed by: MBB, SRT
├── payments          # Stripe integration layer
│                     # Checkout, portal, webhooks, subscription mgmt
│                     # Consumed by: MBB, SRT
├── ui                # Shared UI components
│                     # Design system primitives
│                     # Consumed by: MBB, Yarlis Platform
├── themes            # Theming/branding system
│                     # Per-product theme tokens
│                     # Consumed by: ui package, all apps
├── comms             # Communication layer
│                     # Email, SMS, push notification abstractions
│                     # Consumed by: MBB, SRT
└── marketing         # Marketing utilities
                      # Analytics, tracking, conversion
                      # Consumed by: yarlis.com, MBB
```

---

## Architecture Diagram

```
+---------------------------------------------------------------+
|                     Consumer Products                          |
|                                                                |
|  +-----------+   +----------+   +------------+   +---------+  |
|  | MyBotBox  |   |   SRT    |   | Yarlis.com |   | Admin   |  |
|  +-----------+   +----------+   +------------+   +---------+  |
|       |  |            |  |            |               |        |
+-------|--|------------|--|------------|---------------|--------+
        |  |            |  |            |               |
+-------v--v------------v--v------------v---------------v--------+
|                      @sdods packages                           |
|                                                                |
|  +------+ +------+ +--------+ +----+ +------+ +-----+ +----+ |
|  | auth | | obs  | |payments| | ui | |themes| |comms| |mktg| |
|  +------+ +------+ +--------+ +----+ +------+ +-----+ +----+ |
|       |                                                        |
|  +----v----+                                                   |
|  |  core   |  (shared types, utilities, constants)             |
|  +---------+                                                   |
+---------------------------------------------------------------+
```

---

## Stack

| Layer         | Technology                    |
|---------------|-------------------------------|
| Language      | TypeScript 5.4+               |
| Package Mgr   | pnpm 9 (workspaces)          |
| Build         | Turborepo 2                   |
| Testing       | Vitest 2                      |
| Versioning    | Changesets                    |
| Publishing    | npm (via changeset publish)   |
| Node          | >= 20                         |

---

## Current Status

| Package       | Status    | Notes                                         |
|---------------|-----------|-----------------------------------------------|
| @sdods/core   | SCAFFOLD  | Types and utilities stub                      |
| @sdods/auth   | SCAFFOLD  | Firebase Auth wrapper planned                 |
| @sdods/observability | SCAFFOLD | OpenTelemetry integration planned        |
| @sdods/payments | SCAFFOLD | Stripe abstraction planned                  |
| @sdods/ui     | SCAFFOLD  | Component library planned                     |
| @sdods/themes | SCAFFOLD  | Theme token system planned                    |
| @sdods/comms  | SCAFFOLD  | Email/SMS/push planned                        |
| @sdods/marketing | SCAFFOLD | Analytics/tracking planned                 |

**All packages are currently scaffolds.** The actual logic lives inline in MBB and SRT today. SDODS extraction is a planned refactor to DRY the ecosystem.

---

## Extraction Roadmap

### Phase 1: Auth (highest impact)
- Extract Firebase Auth wrapper from MBB (`packages/auth/`)
- Extract auth service from SRT (`functions/src/services/auth.service.ts`)
- Unified session management, JWT validation, token refresh
- Goal: single `@sdods/auth` consumed by both products

### Phase 2: Payments
- Extract Stripe logic from MBB (`/api/billing/`) and SRT (7 callable functions)
- Unified checkout, portal, subscription lifecycle
- Goal: single `@sdods/payments` with product-specific config

### Phase 3: Observability
- Extract monitoring from MBB (`packages/monitoring/`)
- Structured logging, OpenTelemetry traces, error reporting
- Goal: consistent observability across all products

### Phase 4: UI + Themes
- Shared component library (shadcn/ui based)
- Per-product theming (MBB blue, SRT green, Yarlis purple)
- Goal: consistent UX with product-specific branding

---

## Consumption Model

```
Product repo (e.g., mybotbox-platform)
├── package.json
│   └── dependencies:
│       ├── "@sdods/auth": "^1.0.0"
│       ├── "@sdods/observability": "^1.0.0"
│       └── "@sdods/payments": "^1.0.0"
└── (uses via standard npm imports)
```

Products remain **independent repos**. SDODS is consumed as npm packages, not as a monorepo dependency. Each product pins its own @sdods versions.

---

## Domain

| Domain    | Status  | Notes                      |
|-----------|---------|----------------------------|
| sdods.com | OFFLINE | DNS not configured         |

---

## References

- Repo: github.com/YarlisAISolutions/sdods
- Changelog: CHANGELOG.md
- Docs: docs/ (planned)
