# 🛠️ Yarlis Portfolio Tech Stack

> **Last Updated:** 2026-02-18
> **Maintained by:** SamJr 🦊

---

## Core Technologies

### Frontend
| Technology | Version | Used In |
|------------|---------|---------|
| Next.js | 15.4 | All products |
| React | 19.1 | All products |
| TypeScript | 5.7+ | All products |
| Tailwind CSS | 4.x | All products |
| shadcn/ui | Latest | MyBotBox, Yarlis.ai |
| @dnd-kit | Latest | Yarlis.ai (Kanban) |
| ReactFlow | 11.11 | MyBotBox (Workflow builder) |

### Backend
| Technology | Version | Used In |
|------------|---------|---------|
| NestJS | 10.x | MyBotBox API |
| Drizzle ORM | 0.44 | MyBotBox, Yarlis.ai |
| PostgreSQL | 15+ | MyBotBox, Yarlis.ai |
| Firestore | Latest | RapidTriageMe |
| Firebase RTDB | Latest | MyBotBox (realtime) |

### Authentication
| Technology | Version | Used In |
|------------|---------|---------|
| Auth0 SDK | 4.15 | MyBotBox, Yarlis.ai |
| Firebase Auth | 11.x | RapidTriageMe, MyBotBox |

### Background Jobs
| Technology | Used In | Purpose |
|------------|---------|---------|
| Cloud Tasks | MyBotBox | Job queuing |
| Cloud Functions | MyBotBox, RapidTriageMe | Serverless execution |

### AI/LLM
| Provider | Models | Used In |
|----------|--------|---------|
| Anthropic | Claude 4.5 Opus/Sonnet | All products |
| Google | Gemini 2.5 Pro | MyBotBox |
| AWS Bedrock | Various | MyBotBox |
| OpenAI | GPT-4 | Fallback |

### Infrastructure
| Service | Provider | Used In |
|---------|----------|---------|
| Hosting (Static) | Firebase Hosting | All products |
| Hosting (API) | Cloud Run | MyBotBox, Yarlis.ai |
| Load Balancer | GCP HTTPS LB | MyBotBox staging |
| Storage | GCS, AWS S3 | All products |
| Queues | AWS SQS | MyBotBox |
| DNS | AWS Route 53 | yarlis.com, mybotbox.com, yarlis.io, sdods.com |
| DNS | Cloudflare | yarlis.ai, rapidtriage.me |

### Payments & Email
| Service | Used In |
|---------|---------|
| Stripe | MyBotBox, Yarlis.com |
| Resend | MyBotBox |
| Twilio SendGrid | MyBotBox |

### Monitoring
| Tool | Purpose |
|------|---------|
| OpenTelemetry | Distributed tracing |
| Datadog | Metrics & logs |
| Google Cloud Logging | Cloud Run logs |

### Dev Tools
| Tool | Version | Purpose |
|------|---------|---------|
| Turborepo | 2.5 | Monorepo orchestration |
| Bun | 1.2.12 | Package manager & runtime |
| Biome | 2.0 | Linting & formatting |
| Vitest | 3.x | Unit testing |
| Playwright | 1.48 | E2E testing |
| Husky | 9.x | Git hooks |

---

## ❌ Deprecated / Removed Technologies

| Technology | Removed Date | Replacement |
|------------|--------------|-------------|
| Socket.io | 2026-02-18 | Firebase Realtime Database |
| Trigger.dev | 2026-02-18 | Cloud Tasks + Cloud Functions |

---

## Architecture Patterns

### Monorepo Structure (MyBotBox)
```
mybotbox-platform/
├── apps/
│   ├── sat/          # Main Next.js app
│   └── docs/         # Documentation
├── packages/
│   ├── db/           # Drizzle schemas
│   ├── auth/         # Auth utilities
│   ├── cli/          # CLI tool
│   └── ts-sdk/       # TypeScript SDK
└── functions/        # Cloud Functions
```

### Data Flow
```
Client (React) 
    │
    ▼
Firebase Hosting (CDN)
    │
    ▼
Cloud Run (Next.js API)
    │
    ├──▶ PostgreSQL (source of truth)
    │
    ├──▶ Firebase RTDB (realtime presence)
    │
    └──▶ Cloud Tasks (background jobs)
              │
              ▼
         Cloud Functions
```

### Auth Flow
```
User ──▶ Auth0 ──▶ Firebase Auth ──▶ App
                        │
                        ▼
                   Custom Claims
                   (roles, workspace)
```

---

## Security Standards

- ✅ HTTPS everywhere
- ✅ Auth0 for B2B authentication
- ✅ Firebase Security Rules
- ✅ Cloud Run IAM
- ✅ Secret Manager for credentials
- ✅ CORS properly configured
- ✅ Rate limiting (Redis)

---

## Compliance

- WCAG 2.1 AA (accessibility)
- GDPR-ready (data handling)
- SOC 2 Type II (in progress)

---

*This document is auto-updated during Monday Doc Sync.*
