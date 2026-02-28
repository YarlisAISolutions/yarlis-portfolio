# 🔐 Yarlis Vault — Central Secret Management

## Architecture
- **Backend:** GCP Secret Manager (single source of truth)
- **Auth:** GitHub OIDC → Workload Identity Federation (zero stored tokens)
- **Naming:** `ypid_<domain>_<env>_<secret-name>`
- **Scopes:** per-domain + shared (all domains)

## Secret Naming Convention
```
ypid_{domain}_{env}_{name}

Examples:
  ypid_rtm_prod_firebase-token        → rapidtriage.me prod Firebase token
  ypid_rtm_staging_firebase-token     → rapidtriage.me staging Firebase token
  ypid_mbx_prod_stripe-secret-key     → mybotbox.com prod Stripe key
  ypid_all_prod_npm-token             → shared npm token (all domains)
  ypid_all_prod_cloudflare-token      → shared Cloudflare token
  ypid_yai_prod_anthropic-api-key     → yarlis.ai Anthropic key
```

## Domain Codes
| Code | Domain |
|------|--------|
| yrl  | yarlis.com |
| yai  | yarlis.ai |
| mbx  | mybotbox.com |
| sdo  | sdods.com |
| rtm  | rapidtriage.me |
| yio  | yarlis.io |
| all  | shared across all domains |

## Environments
| Env | Description |
|-----|-------------|
| prod | Production |
| staging | Staging / preview |
| dev | Local development |

## Access Pattern
```
GitHub Action Run
    → OIDC token (auto-generated, expires in minutes)
    → GCP Workload Identity Pool
    → Impersonate Service Account (domain-scoped)
    → Fetch secrets from Secret Manager
    → Inject into build step
    → Secret never stored anywhere
```
