# actions

The SocialGouv Github Actions

## socialgouv/actions/k8s-manifests-debug

- Display useful informations from your kubernetes manifests in the job log
- Post a comment with the same informations on related PR
- expose a `markdown` output with same content

```yaml
- uses: socialgouv/actions/k8s-manifests-debug
  with:
    path: kubernetes-manifests.yaml
    token: ${{ secrets.GITHUB_TOKEN }}
```
