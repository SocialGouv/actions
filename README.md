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
    RANCHER_PROJECT_ID: some-project-id
```

see [.github/workflows/k8s-manifests-debug-test.yaml](.github/workflows/k8s-manifests-debug-test.yaml)
