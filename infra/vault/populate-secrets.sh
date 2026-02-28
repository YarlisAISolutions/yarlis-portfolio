#!/bin/bash
# ============================================================
# Populate GCP Secret Manager from local env
# Run after setup.sh — interactively sets each secret
# Usage: bash infra/vault/populate-secrets.sh [domain] [env]
# ============================================================
set -e

PROJECT="yarlis-platform"
DOMAIN=${1:-"all"}
ENV=${2:-"prod"}

create_secret() {
  local SECRET_ID=$1
  local DESCRIPTION=$2
  local VALUE=$3

  if gcloud secrets describe $SECRET_ID --project=$PROJECT &>/dev/null; then
    echo "  ↻ Updating: $SECRET_ID"
    echo -n "$VALUE" | gcloud secrets versions add $SECRET_ID --data-file=- --project=$PROJECT
  else
    echo "  + Creating: $SECRET_ID"
    echo -n "$VALUE" | gcloud secrets create $SECRET_ID \
      --data-file=- \
      --replication-policy=automatic \
      --project=$PROJECT
  fi
}

echo "🔱 Populating Yarlis Vault — domain: $DOMAIN | env: $ENV"
echo ""

if [[ "$DOMAIN" == "all" || "$DOMAIN" == "rtm" ]]; then
  echo "📦 rapidtriage.me secrets..."
  
  # Firebase token (run: firebase login:ci)
  read -sp "  ypid_rtm_${ENV}_firebase-token: " VAL && echo
  create_secret "ypid_rtm_${ENV}_firebase-token" "Firebase CI token" "$VAL"
  
  read -sp "  ypid_rtm_${ENV}_anthropic-api-key: " VAL && echo
  create_secret "ypid_rtm_${ENV}_anthropic-api-key" "Anthropic API key" "$VAL"
  
  read -sp "  ypid_rtm_${ENV}_stripe-secret-key: " VAL && echo
  create_secret "ypid_rtm_${ENV}_stripe-secret-key" "Stripe secret key" "$VAL"
fi

if [[ "$DOMAIN" == "all" ]]; then
  echo ""
  echo "📦 Shared secrets..."
  
  read -sp "  ypid_all_prod_npm-token: " VAL && echo
  create_secret "ypid_all_prod_npm-token" "npm automation token" "$VAL"
  
  read -sp "  ypid_all_prod_cloudflare-token: " VAL && echo
  create_secret "ypid_all_prod_cloudflare-token" "Cloudflare API token" "$VAL"
fi

echo ""
echo "✅ Secrets populated in GCP Secret Manager"
echo "   View: https://console.cloud.google.com/security/secret-manager?project=$PROJECT"
