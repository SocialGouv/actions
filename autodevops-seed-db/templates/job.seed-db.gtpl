{{ $values := (datasource "values") }}

apiVersion: batch/v1
kind: Job
metadata:
  labels:
    component: ci-seed-db-job
  name: seed-db-{{ .Env.BRANCH_SLUG }}
  namespace: {{ .Env.JOB_NAMESPACE }}
spec:
  backoffLimit: 5
  template:
    spec:
    initContainers:
      - name: seed-db-init
        image: alpine/git:v2.30.2
        command:
          - git
        args:
          - clone
          - -b
          - {{ .Env.BRANCH_NAME }}
          - --single-branch
          - --depth=1
          - https://github.com/{{ .Env.GITHUB_REPOSITORY }}.git
          - /mnt/repository
        volumeMounts:
          - name: seed-db-volume
            mountPath: /mnt/repository
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
{{ file.Read (print .Env.ACTION_PATH "/bin/seed-db") | strings.Indent "                " }}
            - name: PGDATABASE
              value: {{ .Env.PGDATABASE }}
            - name: SEED_PATH
              value: {{ $values.seedPath }}
          envFrom:
            - secretRef:
                name: {{ .Env.ADMIN_PG_SECRET }}
          image: ghcr.io/socialgouv/docker/psql:6.70.0
          imagePullPolicy: IfNotPresent
          name: seed-db
          resources:
            limits:
              cpu: 300m
              memory: 256Mi
            requests:
              cpu: 100m
              memory: 64Mi
      restartPolicy: Never
  ttlSecondsAfterFinished: 86400
