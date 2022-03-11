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

VALUES_FILES=""
if [ -f "values.project.yaml" ]; then
  VALUES_FILES+=" values.project.yaml"
fi
VALUES_FILES+=" values.env.yaml"
if [ -f "values.${ENVIRONMENT}.yaml" ]; then
  VALUES_FILES+=" values.${ENVIRONMENT}.yaml"
fi

echo "Compiling composite uses"
which degit >/dev/null 2>&1 || npm i -g degit
cp values.yaml values.merged.yaml
for valuefile in $VALUES_FILES; do
  echo "$(yq eval-all -o yaml 'select(fileIndex == 0) * select(fileIndex == 1)' values.merged.yaml $valuefile)" \
    >values.merged.yaml
done
USES_DEFS=$(cat values.merged.yaml | yq eval '.jobs.runs.[].use')
for usedef in $USES_DEFS; do
  if [[ "$usedef" == *"/"* ]]; then
    usedef_slug=$(env-slug $usedef)
    usedef_path="uses/$usedef_slug"
    echo "use: $usedef"
    if [ ! -e "$usedef_path" ]; then
      degit "${usedef/\@/\#}" "$usedef_path"
    fi
    if [ -d "$usedef_path" ]; then
      usedef_path+="/use.yaml"
    fi
    usedef_dest="charts/jobs/templates/$usedef_slug"
    echo '{{- define "uses.'$usedef_slug'" -}}'>$usedef_dest
    cat $usedef_path>>$usedef_dest
    echo '{{- end -}}'>>$usedef_dest
    yq -i e '(.jobs.runs.[] | select(.use == "'$usedef'").use) |= "'$usedef_slug'"' values.merged.yaml
  fi
done

echo "Build base manifest using helm"
HELM_TEMPLATE_ARGS=" -f values.merged.yaml"

if [ -n "$COMPONENTS" ]; then
  # first disable all existing components
  while IFS= read -r value; do
    component="$(echo $value | sed 's/- //g')"
    HELM_TEMPLATE_ARGS+=" --set components.$component=false"
  done < <(yq '.components | keys' values.yaml)
  
  # then enable that was specified by `components` input
  for component in "$COMPONENTS"; do
    HELM_TEMPLATE_ARGS+=" --set components.$component=true"
  done
fi

helm template $HELM_TEMPLATE_ARGS . \
  > manifests.base.yaml

echo "Build final manifests using kustomize"

kustomize build \
  --load-restrictor=LoadRestrictionsNone \
  "env/$ENVIRONMENT" \
  > manifests.yaml