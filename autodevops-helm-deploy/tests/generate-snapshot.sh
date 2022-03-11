#!/bin/bash
set -e

export GITHUB_WORKSPACE="$( cd -- "$(dirname "$0")" >/dev/null 2>&1 ; pwd -P )"
export GITHUB_ACTION_PATH=$(dirname $GITHUB_WORKSPACE)

$GITHUB_ACTION_PATH/dev-local.sh
mv manifests.yaml $GITHUB_WORKSPACE/manifests.yaml.snap
echo "Snapshot: $GITHUB_WORKSPACE/manifests.yaml.snap"