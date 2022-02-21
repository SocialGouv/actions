#!/usr/bin/env bash
set -e

USER_WORKING_DIR="$PWD"

export GITHUB_WORKSPACE=${GITHUB_WORKSPACE:-"$PWD"}
export GITHUB_ACTION_PATH=${GITHUB_ACTION_PATH:-"/tmp/autodevops/actions/autodevops-helm"}
export ENVIRONMENT=${ENVIRONMENT:-"dev"}
export AUTODEVOPS_PATH=${AUTODEVOPS_PATH:-"/tmp/audodevops"}

# sample variables
export PROJECT_NAME=${PROJECT_NAME:-"standup"}
export RANCHER_PROJECT_ID=${RANCHER_PROJECT_ID:-"1234"}
export IMAGE_NAME=${IMAGE_NAME:-standup}
export GITHUB_REF=${GITHUB_REF:-refs/heads/feature-branch-1}
export GITHUB_SHA=${GITHUB_SHA-ffac537e6cbbf934b08745a378932722df287a53}
export BASE_DOMAIN=${BASE_DOMAIN:-fabrique.social.gouv.fr}
export NAMESPACE=${NAMESPACE:-standup-dev}

mkdir -p $AUTODEVOPS_PATH
cd $AUTODEVOPS_PATH

if [ ! -d $GITHUB_ACTION_PATH ]; then
  mkdir -p $GITHUB_ACTION_PATH
  npx degit https://github.com/SocialGouv/actions/autodevops-helm $GITHUB_ACTION_PATH --force
fi
if [ ! -d $GITHUB_ACTION_PATH/node_modules ]; then
  yarn --cwd $GITHUB_ACTION_PATH install
fi

yarn --cwd $GITHUB_ACTION_PATH run -s values > values.env.yaml

$GITHUB_ACTION_PATH/build-manifests.sh 2> >(grep -v 'found symbolic link' >&2)

cp manifests.yaml "$USER_WORKING_DIR/manifests.yaml"
echo "Built: $USER_WORKING_DIR/manifests.yaml"
