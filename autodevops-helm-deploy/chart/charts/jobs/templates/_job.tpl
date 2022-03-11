{{- define "job" -}}

{{ $run := $.run }}
{{ $with := $.with }}
{{ $parentWith := $.parentWith }}
{{ $val := $.Values }}

---
apiVersion: batch/v1
kind: Job
metadata:
  name: job-{{ join "--" $run.scope }}
  namespace: {{ or $val.namespace $val.global.namespace }}
  annotations:
    kapp.k14s.io/nonce: ""
    kapp.k14s.io/update-strategy: fallback-on-replace
    {{- range $scope := $run.scopes }}
    kapp.k14s.io/change-group: "autodevops/{{ $scope }}.{{ $val.global.namespace }}"
    {{- end }}
    {{- if $run.needs }}
    {{- range $need := $run.needs }}
    kapp.k14s.io/change-rule.{{ $need }}: "upsert after upserting autodevops/{{ $need }}.{{ $val.global.namespace }}"
    {{- end }}
    {{- end }}
spec:
  backoffLimit: 3
  activeDeadlineSeconds: 3600
  ttlSecondsAfterFinished: 1800
  template:
    metadata:
      annotations: {}
      labels: {}
    spec:
      restartPolicy: Never
      initContainers:
      {{- if or (not (hasKey $run "checkout")) $run.checkout }}
        - name: git-clone-repo
          image: alpine/git:v2.30.0
          command:
            - sh
            - -c
            - |
              git clone \
                --depth 1 \
                {{ $val.repositoryUrl }} \
                --branch {{ $val.branchName }} \
                --single-branch \
                /workspace
              cd /workspace
              git tag --points-at HEAD>/workspace/.git/CURRENT_COMMIT_TAG
          securityContext:
            runAsUser: 1000
            runAsGroup: 1000
          volumeMounts:
            - name: workspace
              mountPath: /workspace
      {{- end }}
      {{- if $run.action }}
        - name: degit-action
          image: node:17
          command:
            - sh
            - -c
            - |
              mkdir -p /action
              cd /action
              npx degit {{ $run.action | replace "@" "#" }}
          securityContext:
            runAsUser: 1000
            runAsGroup: 1000
          volumeMounts:
            - name: action
              mountPath: /action
      {{- end }}
      containers:          
        - name: job
          image: "{{ or $run.image "alpine:3" }}"
          imagePullPolicy: IfNotPresent
          {{- if $run.envFrom }}
          envFrom: {{ tpl ($run.envFrom | toJson) $ }}
          {{- end }}
          env:
            {{- if $run.env }}
              {{- tpl ($run.env | toYaml) $ | nindent 12 }}
            {{- end }}
            {{- range $name, $value := $run.vars }}
            - name: "{{ $name }}"
              value: "{{ $value }}"
            {{- end }}
          
          {{- if $run.run }}
          command:
            - /bin/{{ or $run.shell "bash" }}
            - -c
            - |
              {{- nindent 90 (tpl $run.run $) }}
          {{- else if $run.action }}
          command:
            - /bin/{{ or $run.shell "bash" }}
            - -c
            - |
              /action/action.sh
          {{- end }}

          volumeMounts:
            - name: workspace
              mountPath: /workspace
            - name: action
              mountPath: /action

      volumes:
        - name: workspace
          emptyDir: {}
        - name: action
          emptyDir: {}
      #   {{ .volume }}

{{- end -}}