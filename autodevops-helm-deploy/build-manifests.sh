#!/usr/bin/env bash
set -e

echo "Generate values file"
yarn --cwd $GITHUB_ACTION_PATH run -s values > values.env.yaml

echo "Prepare charts and overlays"
cp -r "$GITHUB_ACTION_PATH/chart/." .

shopt -s globstar
for filename in $AUTODEVOPS_PATH/chart/**/kustomization.yaml; do
  [ -f "$filename" ] || continue
  cp "$filename" "$(dirname $filename)/kustomization.autodevops.yaml"
done

cp -r "$GITHUB_WORKSPACE/.socialgouv/chart/." .

echo "Merge .socialgouv env manifests"
for filename in $GITHUB_WORKSPACE/.socialgouv/environments/$ENVIRONMENT/*.{yml,yaml}; do
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

helm template $HELM_TEMPLATE_ARGS . \
  > manifests.base.yaml

echo "Build final manifests using kustomize"

kustomize build \
  --load-restrictor=LoadRestrictionsNone \
  "env/$ENVIRONMENT" \
  > manifests.yaml