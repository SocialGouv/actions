{{ $values := (datasource "values") }}

apiVersion: batch/v1
kind: Job
metadata:
  annotations:
    app.github.com/job: {{ .Env.GITHUB_JOB }}
    app.github.com/ref: {{ .Env.GITHUB_REF }}
    app.github.com/repo: {{ .Env.GITHUB_REPOSITORY }}
    app.github.com/run: "{{ .Env.GITHUB_RUN_ID }}"
    app.github.com/sha: "{{ .Env.GITHUB_SHA | strings.Trunc 7 }}"
  labels:
    component: ci-create-db-job
  name: create-db-user-{{ .Env.BRANCH_SLUG }}
  namespace: {{ .Env.JOB_NAMESPACE }}
spec:
  backoffLimit: 5
  template:
    spec:
      containers:
        - command:
            - /bin/sh
            - -c
            - |
              cat > /tmp/job-command <<EOL
              $JOB_COMMAND
              EOL
              chmod +x /tmp/job-command
              exec /tmp/job-command
          env:
            - name: JOB_COMMAND
              value: |
{{ file.Read (print .Env.ACTION_PATH "/bin/ensure-db") | strings.Indent "                " }}
            - name: NEW_DB_NAME
              valueFrom:
                secretKeyRef:
                  key: PGDATABASE
                  name: {{ .Env.DB_SECRET_NAME }}
            - name: NEW_USER
              valueFrom:
                secretKeyRef:
                  key: PGUSER
                  name: {{ .Env.DB_SECRET_NAME }}
            - name: NEW_PASSWORD
              valueFrom:
                secretKeyRef:
                  key: PGPASSWORD
                  name: {{ .Env.DB_SECRET_NAME }}
            - name: PGHOST
              valueFrom:
                secretKeyRef:
                  key: PGHOST
                  name: {{ .Env.DB_SECRET_NAME }}
            - name: NEW_DB_EXTENSIONS
              value: {{ $values.pgCreateExtensions }}
          envFrom:
            - secretRef:
                name: {{ .Env.ADMIN_PG_SECRET }}
          image: ghcr.io/socialgouv/docker/psql:6.70.0
          imagePullPolicy: IfNotPresent
          name: create-db-user
          resources:
            limits:
              cpu: 300m
              memory: 256Mi
            requests:
              cpu: 100m
              memory: 64Mi
      restartPolicy: Never
  ttlSecondsAfterFinished: 86400
