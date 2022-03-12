#!/bin/bash
set -e

export GITHUB_WORKSPACE="$( cd -- "$(dirname "$0")" >/dev/null 2>&1 ; pwd -P )"
export GITHUB_ACTION_PATH=$(dirname $GITHUB_WORKSPACE)

export AUTODEVOPS_PATH="/tmp/autodevops"

$GITHUB_ACTION_PATH/dev-local.sh

cp $AUTODEVOPS_PATH/manifests.yaml $GITHUB_WORKSPACE/manifests.yaml.snap

echo "Snapshot: $GITHUB_WORKSPACE/manifests.yaml.snap"