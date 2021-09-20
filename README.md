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

- Deploy app/package to target environment

```yaml
- uses: SocialGouv/actions/autodevops
  with:
    project: "my_app"
    environment: dev # dev, preprod, prod
    imageName: my_product/my_app
    token: ${{ secrets.GITHUB_TOKEN }}
    kubeconfig: ${{ secrets.SOCIALGOUV_KUBE_CONFIG_DEV }}
```

## `socialgouv/actions/autodevops-build-register`

- Build docker image and register it to GHCR

```yaml
- uses: SocialGouv/actions/autodevops-build-register
  with:
    project: "my_app"
    imageName: my_product/my_app
    token: ${{ secrets.GITHUB_TOKEN }}
```

## `socialgouv/actions/k8s-manifests`

- Generate kubernetes manifests based on custom `.k8s` config

```yaml
- uses: SocialGouv/actions/autodevops-manifests
  with:
    environment: "dev"
```

## `socialgouv/actions/autodevops-manifests`

- Generate kubernetes manifests based on autodevops (`.socialgouv`) config

```yaml
- uses: SocialGouv/actions/autodevops-manifests
  with:
    environment: "dev"
```

## `socialgouv/actions/autodevops-deploy`

- Deploy application over kubernetes

```yaml
- uses: SocialGouv/actions/autodevops-deploy
  id: deploy
  with:
    environment: "dev"
    token: ${{ secrets.GITHUB_TOKEN }}
    kubeconfig: ${{ secrets.SOCIALGOUV_KUBE_CONFIG }}
```

Export main URL as `steps.deploy.outputs.url`

## `socialgouv/actions/autodevops-restore-db`

- Restore database based on autodevops (`.socialgouv`) config

```yaml
- uses: SocialGouv/actions/autodevops-restore-db
  with:
    kubeconfig: ${{ secrets.SOCIALGOUV_KUBE_CONFIG_DEV }}
```

## `socialgouv/actions/k8s-restore-db`

- Restore database based on custom `.k8s` config and a `jobs/restore`.

```yaml
- uses: SocialGouv/actions/k8s-restore-db
  with:
    kubeconfig: ${{ secrets.SOCIALGOUV_KUBE_CONFIG_DEV }}
```

## `socialgouv/actions/k8s-deactivate`

- Clean review branches whenever a pull request is closed.

```yaml
- uses: SocialGouv/actions/k8s-deactivate
  with:
    kubeconfig: ${{ secrets.SOCIALGOUV_KUBE_CONFIG_DEV }}
```
