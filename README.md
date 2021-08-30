# actions

The SocialGouv Github Actions

## `socialgouv/actions/k8s-manifests-debug`

- Display [useful informations from your kubernetes manifests](https://github.com/SocialGouv/sre-tools/tree/master/packages/parse-manifests) in action log
- Post a sticky comment in associated PR
- Outputs : `markdown`, `json`, `text` variables

```yaml
- uses: socialgouv/actions/k8s-manifests-debug
  with:
    path: kubernetes-manifests.yaml
    token: ${{ secrets.GITHUB_TOKEN }}
  env:
    RANCHER_PROJECT_ID: some-project-id # to provide a decent rancher url
```

see [.github/workflows/k8s-manifests-debug-test.yaml](.github/workflows/k8s-manifests-debug-test.yaml)

## `socialgouv/actions/autodevops-build-register`

- Build docker image and register it to GHCR

```yaml
- uses: SocialGouv/actions/autodevops-build-register
  with:
    project: "my_app"
    group: "my_product"
    token: ${{ secrets.GITHUB_TOKEN }}
```

## `socialgouv/actions/autodevops-manifests`

- Generate kubernetes manifests via kosko-charts

```yaml
- uses: SocialGouv/actions/autodevops-manifests
  with:
    environment: "dev"
```

## `socialgouv/actions/autodevops-deploy`

- Deploy application over kubernetes

```yaml
- uses: SocialGouv/actions/autodevops-deploy
  with:
    environment: "dev"
    token: ${{ secrets.GITHUB_TOKEN }}
    kubeconfig: ${{ secrets.SOCIALGOUV_KUBE_CONFIG }}
```

## `socialgouv/actions/autodevops-restore-db`

- Restore database

```yaml
- uses: SocialGouv/actions/autodevops-restore-db
  with:
    kubeconfig: ${{ secrets.SOCIALGOUV_KUBE_CONFIG_DEV }}
```
