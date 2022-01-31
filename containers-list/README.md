# @SocialGouv Github Containers Cleaner Action

### Usage

```yaml
- uses: @socialgouv/actions/containers-list@v1
  id: containers-list
  with:
    organization: socialgouv

- run: echo ${{ steps.containers-list.output.containers }}
```

### Inputs

| variable        | description                                                                  |
|-----------------|------------------------------------------------------------------------------|
| organization    | Github organization                                                          |

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
yarn test
```

Run the actions
```bash
act
```
