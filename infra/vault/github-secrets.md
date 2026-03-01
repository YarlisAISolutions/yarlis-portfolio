# GitHub Secrets — Yarlis Vault
Add these to each repo: Settings → Secrets and variables → Actions → New repository secret

## Shared (add to ALL repos)
| Secret Name | Value |
|-------------|-------|
| `GCP_WIF_PROVIDER` | `projects/1034667185264/locations/global/workloadIdentityPools/yarlis-github-pool/providers/yarlis-github-provider` |

## Per-repo service accounts
| Secret Name | Value | Add to repo |
|-------------|-------|-------------|
| `GCP_WIF_SA_RTM` | `github-actions-rtm@yarlis-platform.iam.gserviceaccount.com` | smartrapidtriage |
| `GCP_WIF_SA_MBX` | `github-actions-mbx@yarlis-platform.iam.gserviceaccount.com` | mybotbox |
| `GCP_WIF_SA_YAI` | `github-actions-yai@yarlis-platform.iam.gserviceaccount.com` | yarlisai |
| `GCP_WIF_SA_SDO` | `github-actions-sdo@yarlis-platform.iam.gserviceaccount.com` | sdods |
| `GCP_WIF_SA_YRL` | `github-actions-yrl@yarlis-platform.iam.gserviceaccount.com` | yarlis-platform |
| `GCP_WIF_SA_ALL` | `github-actions-all@yarlis-platform.iam.gserviceaccount.com` | yarlis-portfolio |

## Note
These are NOT sensitive — they are resource identifiers, not credentials.
Safe to commit. Actual secrets live in GCP Secret Manager only.
