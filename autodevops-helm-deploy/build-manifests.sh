#!/usr/bin/env bash
set -e

# check mandatory environment variables
MANDATORY_VARS="AUTODEVOPS_PATH GITHUB_ACTION_PATH ENVIRONMENT"
for VAR in $MANDATORY_VARS; do
  if [[ -z "${!VAR}" ]]; then
    echo "${VAR} environment variable is empty"
    exit 1
  fi
done

BASE_PATH=${BASE_PATH:-"${GITHUB_WORKSPACE}"}

rm -rf $AUTODEVOPS_PATH/*

echo "Generate values file"
node $GITHUB_ACTION_PATH/values.js > values.env.yaml

echo "Prepare charts and overlays"
cp -r "$GITHUB_ACTION_PATH/chart/." .

if [ -d "$BASE_PATH/.socialgouv/chart" ]; then
  cp -r "$BASE_PATH/.socialgouv/chart/." .
fi

echo "Merge .socialgouv env manifests"
shopt -s globstar
for filename in $BASE_PATH/.socialgouv/environments/$ENVIRONMENT/**/*.{yml,yaml}; do
  [ -f "$filename" ] || continue
  echo "Merging $filename to manifests templates"
  target="templates/$(basename $filename)"
  cp "$filename" "$target"
  yq -i e '.metadata.namespace |= "'$NAMESPACE'"' "$target"
done

echo "Build base manifest using helm"
HELM_TEMPLATE_ARGS=""
if [ -f "values.project.yaml" ]; then
  HELM_TEMPLATE_ARGS+=" -f values.project.yaml"
fi
HELM_TEMPLATE_ARGS+=" -f values.env.yaml"
if [ -f "values.${ENVIRONMENT}.yaml" ]; then
  HELM_TEMPLATE_ARGS+=" -f values.${ENVIRONMENT}.yaml"
fi
HELM_TEMPLATE_ARGS+=" $HELM_ARGS"

helm template $HELM_TEMPLATE_ARGS . \
  > manifests.base.yaml

echo "Build final manifests using kustomize"

kustomize build \
  --load-restrictor=LoadRestrictionsNone \
  "env/$ENVIRONMENT" \
  > manifests.yaml