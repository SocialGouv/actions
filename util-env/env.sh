#!/bin/bash
set -e

which env-slug || npm i -g @socialgouv/env-slug

## start of exported variables
set -a

ENVIRONMENT=${ENVIRONMENT:-dev}
REPOSITORY_NAME=${GITHUB_REPOSITORY##*/}

if [ -n "$GITHUB_HEAD_REF" ]; then
  BRANCH_NAME=$GITHUB_HEAD_REF
else
  BRANCH_NAME=${GITHUB_REF#refs/heads/}
  BRANCH_NAME=${BRANCH_NAME#refs/tags/}
fi

BRANCH_SLUG=$(env-slug ${BRANCH_NAME})

BASE_NAMESPACE=${BASE_NAMESPACE:-"$REPOSITORY_NAME"}
JOB_NAMESPACE=${RANCHER_PROJECT_NAME:-"$REPOSITORY_NAME"}-ci
SECRETS_NAMESPACE="${RANCHER_PROJECT_NAME:-"$REPOSITORY_NAME"}-secret"

if [ -z "$BASE_SUBDOMAIN" ]; then
  BASE_SUBDOMAIN=$REPOSITORY_NAME;
fi

if [ "$ENVIRONMENT" = "prod" ]; then
  SUBDOMAIN=$BASE_SUBDOMAIN
  NAMESPACE=$BASE_NAMESPACE
elif [ "$ENVIRONMENT" = "preprod" ]; then
  SUBDOMAIN="${BASE_SUBDOMAIN}-preprod"
  NAMESPACE=${BASE_NAMESPACE}-preprod
else
  SUBDOMAIN=$(env-slug "${BASE_SUBDOMAIN}-${BRANCH_NAME}")
  NAMESPACE=$(env-slug "${BASE_NAMESPACE}-${BRANCH_NAME}")
fi

BASE_DOMAIN=${BASE_DOMAIN:-"fabrique.social.gouv.fr"}

AUTODEVOPS_PATH=/tmp/autodevops

set +a
## end of exported variables

mkdir -p $AUTODEVOPS_PATH
