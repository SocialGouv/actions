# @SocialGouv Github Containers Cleaner Action

### Usage

```yaml
- uses: @socialgouv/actions/containers-cleaner@v1
  with:
    organization: socialgouv
    token: ${{ github.token }}
    retention-weeks: '2'
    containers: |
      fabrique/standup
```

### Inputs

| variable        | description                                                         |
|-----------------|---------------------------------------------------------------------|
| organization    | Github organization                                                 |
| token           | Github personal access token to perform requests over Github API    |
| retention-weeks | Number of weeks of retention preventing packages from being deleted |
| containers      | List of container packages to clean up *(multi lines input)*        |

### Development

Install the dependencies  
```bash
yarn
```

Build the typescript and package it for distribution
```bash
yarn build; yarn package
```

Run the tests
```bash
INPUT_TOKEN=<github_personal_access_token> yarn test
```

Run the actions
```bash
act -s GITHUB_TOKEN=<github_personal_access_token>
```
