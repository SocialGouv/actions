apiVersion: v1
kind: Namespace
metadata:
  annotations:
    socialgouv/creator: autodevops
    {{- if eq .Env.ENVIRONMENT "dev" }}
    {{- if strings.HasPrefix "renovate" .Env.BRANCH_NAME }}
    janitor/ttl: 1d
    {{- end }}
    janitor/ttl: 7d
    {{- end }}
    field.cattle.io/creatorId: gitlab
    field.cattle.io/projectId: {{ .Env.RANCHER_PROJECT_ID }}
    git/branch: {{ .Env.GITHUB_REF }}
    git/remote: {{ .Env.GITHUB_REPOSITORY }}
    app.github.com/job: {{ .Env.GITHUB_JOB }}
    app.github.com/ref: {{ .Env.GITHUB_REF }}
    app.github.com/repo: {{ .Env.GITHUB_REPOSITORY }}
    app.github.com/run: "{{ .Env.GITHUB_RUN_ID }}"
    app.github.com/sha: "{{ .Env.GITHUB_SHA | strings.Trunc 7 }}"
  labels:
  {{- if eq .Env.ENVIRONMENT "dev" }}
    cert: wildcard
  {{- end }}
  name: {{ .Env.NAMESPACE }}
