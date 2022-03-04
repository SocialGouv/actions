#!/usr/bin/env bash
set -e

# dev-local
export TARGET_DIR=${TARGET_DIR:-"$PWD"}

# github sample variables
export GITHUB_WORKSPACE=${GITHUB_WORKSPACE:-"$PWD"}
export GITHUB_REPOSITORY=${GITHUB_REPOSITORY:-"SocialGouv/$(basename $GITHUB_WORKSPACE)"}
export GITHUB_ACTION_PATH=${GITHUB_ACTION_PATH:-"$(dirname $0)"}
export GITHUB_REF=${GITHUB_REF:-refs/heads/feature-branch-1}
export GITHUB_SHA=${GITHUB_SHA-ffac537e6cbbf934b08745a378932722df287a53}
export GITHUB_ENV=${GITHUB_ENV:-/tmp/.github_env}

# load env
export ENVIRONMENT=${ENVIRONMENT:-dev}
export RANCHER_PROJECT_ID=${RANCHER_PROJECT_ID:-1234}
export RANCHER_PROJECT_NAME=${RANCHER_PROJECT_NAME:-awesome}

source $GITHUB_ACTION_PATH/../util-env/env.sh

cd $AUTODEVOPS_PATH

# generate values.env.yaml
node $GITHUB_ACTION_PATH/values.js > values.env.yaml

# generate manifests
$GITHUB_ACTION_PATH/build-manifests.sh 2> >(grep -v 'found symbolic link' >&2)

# copy manifests to current working dir
cp manifests.yaml "$TARGET_DIR/manifests.yaml"
echo "Built: $TARGET_DIR/manifests.yaml"
