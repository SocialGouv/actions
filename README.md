# actions

The SocialGouv GitHub Actions. Actions designed for repos with a `.socialgouv` folder.

| Workflow Action                                                          | usage                                                        | 
| ------------------------------------------------------------------------ | ------------------------------------------------------------ | 
| [autodevops-build-register](#socialgouvactionsautodevops-build-register) | Build and register docker images on ghcr.io                  | 
| [autodevops-manifests](#socialgouvactionsautodevops-manifests)           | Generate kubernetes manifests                                | 
| [autodevops-deploy](#socialgouvactionsautodevops-deploy)                 | Deploy kubernetes manifests                                  | 
| [autodevops-create-db](#socialgouvactionsautodevops-create-db)           | Create a review branch database                              | 
| [autodevops-release](#socialgouvactionsautodevops-release)               | Trigger semantic release run                                 |
| [autodevops-deactivate](#socialgouvactionsautodevops-deactivate)         | Cleanup environments and databases                           |
| [containers-cleaner](#socialgouvactionscontainers-cleaner)               | Organization container packages versions cleaner             |

| Internal Action                                                          | usage                                                        | 
| ------------------------------------------------------------------------ | ------------------------------------------------------------ | 
| [autodevops-env](#socialgouvactionsautodevops-env)                       | Return kubernetes-friendly env variables                     | 
| [harbor-build-register](#socialgouvactionsharbor-build-register)         | Build and register docker images on internal harbor registry | 
| [autodevops](#socialgouvactionsautodevops)                               | Register and Deploy application                              | 
| [autodevops-restore-db](#socialgouvactionsautodevops-restore-db)         | -                                                            | 
| [mirror-gitlab](#socialgouvactionsmirror-gitlab)                         | Push changes to GitLab                                       |


## `socialgouv/actions/autodevops-build-register`

- Build docker image and register it to GHCR

```yaml
- uses: SocialGouv/actions/autodevops-build-register@v1
  with:
    project: "my_product"
    imageName: my_product/my_component
    token: ${{ secrets.GITHUB_TOKEN }}
    dockerfile: "/path/to/Dockerfile" # optional
    dockercontext: "/path/to/content" # optional
    dockerbuildargs: | # optional
      NODE_ENV=production
    environment: "preprod" # optional

```

## `socialgouv/actions/autodevops-manifests`

- Generate kubernetes manifests based on autodevops (`.socialgouv`) config

```yaml
- uses: SocialGouv/actions/autodevops-manifests@v1
  with:
    environment: "dev"
    productionNamespace: "alternative-namespace" # optional
    rancherId: ${{ secrets.RANCHER_PROJECT_ID }}
    socialgouvBaseDomain: ${{ secrets.SOCIALGOUV_BASE_DOMAIN }}
```

## `socialgouv/actions/autodevops-deploy`

- Deploy application over kubernetes

```yaml
- uses: SocialGouv/actions/autodevops-deploy@v1
  id: deploy
  with:
    environment: "dev"
    token: ${{ secrets.GITHUB_TOKEN }}
    kubeconfig: ${{ secrets.KUBECONFIG }}
    rancherId: ${{ secrets.RANCHER_PROJECT_ID }}
```

Export main URL as `steps.deploy.outputs.url`

## `socialgouv/actions/autodevops-restore-db`

- Restore database based on autodevops (`.socialgouv`) config

```yaml
- uses: SocialGouv/actions/autodevops-restore-db@v1
  with:
    kubeconfig: ${{ secrets.KUBECONFIG }}
```

## `socialgouv/actions/autodevops-release`

- Trigger semantic release run

```yaml
- uses: SocialGouv/actions/autodevops-release@v1
  with:
    github-token: ${{ secrets.SOCIALGROOVYBOT_BOTO_PAT }}
    author-name: ${{ secrets.SOCIALGROOVYBOT_NAME }}
    author-email: ${{ secrets.SOCIALGROOVYBOT_EMAIL }}
```

## `socialgouv/actions/autodevops-deactivate`

- Clean review branches whenever a pull request is closed.
- Drop branch databases

Should be added as `.github/workflows/deactivate.yml` in your repo.

```yaml
name: Deactivate

on:
  pull_request:
    types: [closed]

jobs:
  bury_review_env:
    name: Deactivate review branch
    runs-on: ubuntu-latest
    steps:
      - uses: SocialGouv/actions/autodevops-deactivate@v1
        with:
          kube-config: ${{ secrets.KUBECONFIG }}
          github-token: ${{ secrets.GITHUB_TOKEN }}
```

## `socialgouv/actions/autodevops-env`

- Return kubernetes-friendly environment variables

#### Outputs

 - namespace
 - project
 - branch

```yaml
- uses: SocialGouv/actions/autodevops-env@v1
  id: env
- shell: bash
  run: echo ${{ steps.env.outputs.namespace }}
```

## `socialgouv/actions/autodevops-create-db`

- Create a dedicated database for a review branch

```yaml
- uses: SocialGouv/actions/autodevops-create-db@v1
  with:
    environment: dev
    socialgouvBaseDomain: ${{ secrets.SOCIALGOUV_BASE_DOMAIN }}
    kubeconfig: ${{ secrets.KUBECONFIG }}
    rancherId: ${{ secrets.RANCHER_PROJECT_ID }}
```


## `socialgouv/actions/autodevops`

- Deploy app/package to target environment

```yaml
- uses: SocialGouv/actions/autodevops@v1
  with:
    project: "my_app"
    environment: dev # dev, preprod, prod
    imageName: my_product/my_app
    token: ${{ secrets.GITHUB_TOKEN }}
    kubeconfig: ${{ secrets.KUBECONFIG }}
    rancherId: ${{ secrets.RANCHER_PROJECT_ID }}
    socialgouvBaseDomain: ${{ secrets.SOCIALGOUV_BASE_DOMAIN }}
```


## `socialgouv/actions/k8s-manifests-debug`

- Display [useful informations from your kubernetes manifests](https://github.com/SocialGouv/sre-tools/tree/master/packages/parse-manifests) in action log
- Post a sticky comment in associated PR
- Outputs : `markdown`, `json`, `text` variables

```yaml
- uses: socialgouv/actions/k8s-manifests-debug@v1
  with:
    path: kubernetes-manifests.yaml
    token: ${{ secrets.GITHUB_TOKEN }}
  env:
    RANCHER_PROJECT_ID: ${{ secrets.RANCHER_PROJECT_ID }} # optional
```

see [.github/workflows/k8s-manifests-debug-test.yaml](.github/workflows/k8s-manifests-debug-test.yaml)

## `socialgouv/actions/containers-cleaner`

```yaml
- uses: @socialgouv/actions/containers-cleaner@v1
  with:
    organization: socialgouv
    token: ${{ github.token }}
    retention-weeks: '2'
    protected-tags: |
      ^prod$
      ^latest$
      ^preprod$
      ^prod-(\w+)$
      ^(\d+\.\d+)(\.\d+)?(-(alpha|beta).\d+)?$
    containers: |
      fabrique/standup
```

Detailed information [here](https://github.com/SocialGouv/actions/tree/master/containers-cleaner).
