#!/usr/bin/env bash
set -xe

PROJECT_PATH=${PROJECT_PATH:-$CWD}

export PROJECT_NAME=standup
export RANCHER_PROJECT_ID=1234
export IMAGE_NAME=standup
export GITHUB_REF=refs/heads/feature-branch-1
export GITHUB_SHA=ffac537e6cbbf934b08745a378932722df287a53
export BASE_DOMAIN=fabrique.social.gouv.fr
export ENVIRONMENT=dev
export NAMESPACE=standup-dev

AUTODEVOPS_PATH=/tmp/audodevops
mkdir -p $AUTODEVOPS_PATH
cd $AUTODEVOPS_PATH

mkdir -p autodevops-helm
npx degit https://github.com/SocialGouv/actions/autodevops-helm autodevops-helm --force
yarn --cwd autodevops-helm install
yarn --cwd autodevops-helm run -s values > values.env.yaml

mkdir -p project/.socialgouv
cp -r $PROJECT_PATH/.socialgouv/. project/.socialgouv

cp -r "autodevops-helm/chart/." .
shopt -s globstar
for filename in $AUTODEVOPS_PATH/chart/**/kustomization.yaml; do
  [ -f "$filename" ] || continue
  cp "$filename" "$(dirname $filename)/kustomization.autodevops.yaml"
done
cp -r "project/.socialgouv/chart/." .

for filename in project/.socialgouv/environments/$ENVIRONMENT/*.{yml,yaml}; do
  [ -f "$filename" ] || continue
  echo "merging $filename to manifests templates"
  target="templates/$(basename $filename)"
  cp "$filename" "$target"
  yq -i e '.metadata.namespace |= "'$NAMESPACE'"' "$target"
done

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

kustomize build \
  --load-restrictor=LoadRestrictionsNone \
  "env/$ENVIRONMENT" \
  > manifests.yaml

cat manifests.yaml