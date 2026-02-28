# 🔱 Onboarding a New Project to Yarlis Vault

## Step 1 — Define secrets in registry
Add entries to `infra/vault/secrets-registry.yaml`:
```yaml
- id: ypid_<domain>_<env>_<secret-name>
  name: Human readable name
  domains: [<domain>]
  env: prod
  rotation: 90d
```

## Step 2 — Populate the secret
```bash
bash infra/vault/populate-secrets.sh <domain> prod
```

## Step 3 — Create GitHub workflow
Copy `.github/workflows/rapidtriage.yml` → rename for your domain.
Update: `domain`, `project_id`, `base_url_prod`.

## Step 4 — Add to GitHub repo secrets (one-time only)
In the target repo → Settings → Secrets → Actions:
```
GCP_WIF_PROVIDER  = projects/123/locations/global/workloadIdentityPools/yarlis-github-pool/providers/yarlis-github-provider
GCP_WIF_SA_<DOMAIN> = github-actions-<domain>@yarlis-platform.iam.gserviceaccount.com
```
These are NOT secret values — just resource identifiers. Safe to expose.

## Step 5 — Done
Push to main. Pipeline runs. Secrets fetched live from Vault per run.
No secrets stored in GitHub. No long-lived tokens anywhere.

## Rotating a Secret
1. Update value in GCP Secret Manager (new version auto-created)
2. Old version kept (rollback possible)
3. Next pipeline run picks up new version automatically
4. Update `secrets-registry.yaml` rotation date

## Emergency Revoke
```bash
gcloud secrets versions disable <version> \
  --secret=ypid_<domain>_<env>_<name> \
  --project=yarlis-platform
```
