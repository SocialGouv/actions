## [1.0.2](https://github.com/SocialGouv/actions/compare/v1.0.1...v1.0.2) (2021-09-01)


### Bug Fixes

* **k8s-funeral:** try to get the namespace from the artifact ([0817024](https://github.com/SocialGouv/actions/commit/0817024f9d470b8118ebb0e1a2f1ee631f6ab07e))

## [1.0.1](https://github.com/SocialGouv/actions/compare/v1.0.0...v1.0.1) (2021-09-01)


### Bug Fixes

* Avoid creating namesapce on prod. ([#7](https://github.com/SocialGouv/actions/issues/7)) ([abc4a04](https://github.com/SocialGouv/actions/commit/abc4a04200b3b2c85124d02fc247999ef0edaf4b))

# 1.0.0 (2021-08-31)


### Bug Fixes

* Add release workflow. ([07b99ce](https://github.com/SocialGouv/actions/commit/07b99ce08b98c86ce778423a12eb20620fc7cf86))
* Create namespace from manifest. ([1ddba56](https://github.com/SocialGouv/actions/commit/1ddba56199f6a6911a8919bcde1c7c5cfdcc0cdc))
* if in composite are not allowed ([1a3b89a](https://github.com/SocialGouv/actions/commit/1a3b89a3c3b2e28a05b7aab0bc450e06aa6f0ceb))
* missing $ ([c650c36](https://github.com/SocialGouv/actions/commit/c650c36b6df2218750311d740e821282c79897c4))
* pass GITLAB_TOKEN in inputs ([dab7afd](https://github.com/SocialGouv/actions/commit/dab7afd323c94957c4c732d0438e065318bb1377))
* reformat yaml ([48d1800](https://github.com/SocialGouv/actions/commit/48d1800782d939b549ede74428d1efdb1e72a112))
* Release rules. ([b0ffd47](https://github.com/SocialGouv/actions/commit/b0ffd47d36ff52ddbfbd34e6ba602756c7ad997e))
* require explicite gitlab-token ([2d6552c](https://github.com/SocialGouv/actions/commit/2d6552c617d08cbdf2b99abe4ba53a7b53cc15a5))
* use a switch case ([478eb7a](https://github.com/SocialGouv/actions/commit/478eb7aa0915af08dd87395e644504afec24dfd3))
* Use env suffix to name namesapce manifests. ([0b42e08](https://github.com/SocialGouv/actions/commit/0b42e08b22c67a9dfb5787a92ae3f8cfa79af3a9))
* Use imageName within autodevops build and register action. ([e092737](https://github.com/SocialGouv/actions/commit/e0927373dc95b8e41a591e1a5416dd230bb4f515))
* **github:** use rlespinasse/github-slug-action slug variables ([cef1836](https://github.com/SocialGouv/actions/commit/cef18364bb29ad3b4930e0dc5734158c1e80f645))
* **k8s-funeral:** missing kapp app name ([fd2e81b](https://github.com/SocialGouv/actions/commit/fd2e81b97a76cfd54391199557107fbef1f62355))
* **k8s-funeral:** use GITHUB_HEAD_REF_SLUG_URL as branch name ([32b4dad](https://github.com/SocialGouv/actions/commit/32b4dad14ee845fc5a0ae0d4d9fba79767f5dc9f))
* **mirror-gitlab:** just push the github.event.ref ([8dff85a](https://github.com/SocialGouv/actions/commit/8dff85a2f42a884594ff38e8f81fb6809a0f8bb0))


### Features

* socialgouv/actions/k8s-manifests-debug ([#1](https://github.com/SocialGouv/actions/issues/1)) ([fa44c3c](https://github.com/SocialGouv/actions/commit/fa44c3c4a67995e0a1bad3097ee3f1230ec58790))
* **k8s-manifests-debug:** use the :robot: ([#2](https://github.com/SocialGouv/actions/issues/2)) ([8a3e452](https://github.com/SocialGouv/actions/commit/8a3e4529bbd02dd99d5f3f83949d06dd9328d016))
* socialgouv/actions/k8s-manifests-debug ([#1](https://github.com/SocialGouv/actions/issues/1)) ([7bfbb19](https://github.com/SocialGouv/actions/commit/7bfbb19d0c52efb9d786a2a2f0041a997db8973b))
* **actions:** add mirror gitlab action ([181bcb9](https://github.com/SocialGouv/actions/commit/181bcb9c457d248af03e3aff984864dabd10c802))
* **k8s-funeral:** actually busy the thing ([7fa4c5e](https://github.com/SocialGouv/actions/commit/7fa4c5e1540a1489a690a1246cc63a9c19d573ee))
* **k8s-funeral:** add k8s funeral action ([9cf7503](https://github.com/SocialGouv/actions/commit/9cf7503a24601742b40375c1821d8ef031294636))
* **k8s-funeral:** install kapp ([eec42fe](https://github.com/SocialGouv/actions/commit/eec42febc9a6390b73ee6be1f0dcfb5808c91a6e))
* **k8s-funeral:** install kapp (2) ([b8d6d66](https://github.com/SocialGouv/actions/commit/b8d6d6652e5ea36db9cec2f4032abc8667b925bb))
* **k8s-funeral:** pass the kubeconfig ([da2a40c](https://github.com/SocialGouv/actions/commit/da2a40c5076d1a2bd0982d564186db5d0511871d))
* **mirror:** the remote is a variable now ([11ea24a](https://github.com/SocialGouv/actions/commit/11ea24ac254efb15bbe4b3ce0845b77d35818a63))

# 1.0.0-alpha.1 (2021-08-31)


### Bug Fixes

* Add release workflow. ([07b99ce](https://github.com/SocialGouv/actions/commit/07b99ce08b98c86ce778423a12eb20620fc7cf86))
* Create namespace from manifest. ([1ddba56](https://github.com/SocialGouv/actions/commit/1ddba56199f6a6911a8919bcde1c7c5cfdcc0cdc))
* if in composite are not allowed ([1a3b89a](https://github.com/SocialGouv/actions/commit/1a3b89a3c3b2e28a05b7aab0bc450e06aa6f0ceb))
* missing $ ([c650c36](https://github.com/SocialGouv/actions/commit/c650c36b6df2218750311d740e821282c79897c4))
* pass GITLAB_TOKEN in inputs ([dab7afd](https://github.com/SocialGouv/actions/commit/dab7afd323c94957c4c732d0438e065318bb1377))
* reformat yaml ([48d1800](https://github.com/SocialGouv/actions/commit/48d1800782d939b549ede74428d1efdb1e72a112))
* Release rules. ([b0ffd47](https://github.com/SocialGouv/actions/commit/b0ffd47d36ff52ddbfbd34e6ba602756c7ad997e))
* require explicite gitlab-token ([2d6552c](https://github.com/SocialGouv/actions/commit/2d6552c617d08cbdf2b99abe4ba53a7b53cc15a5))
* use a switch case ([478eb7a](https://github.com/SocialGouv/actions/commit/478eb7aa0915af08dd87395e644504afec24dfd3))
* Use env suffix to name namesapce manifests. ([0b42e08](https://github.com/SocialGouv/actions/commit/0b42e08b22c67a9dfb5787a92ae3f8cfa79af3a9))
* Use imageName within autodevops build and register action. ([e092737](https://github.com/SocialGouv/actions/commit/e0927373dc95b8e41a591e1a5416dd230bb4f515))
* **github:** use rlespinasse/github-slug-action slug variables ([cef1836](https://github.com/SocialGouv/actions/commit/cef18364bb29ad3b4930e0dc5734158c1e80f645))
* **k8s-funeral:** missing kapp app name ([fd2e81b](https://github.com/SocialGouv/actions/commit/fd2e81b97a76cfd54391199557107fbef1f62355))
* **k8s-funeral:** use GITHUB_HEAD_REF_SLUG_URL as branch name ([32b4dad](https://github.com/SocialGouv/actions/commit/32b4dad14ee845fc5a0ae0d4d9fba79767f5dc9f))
* **mirror-gitlab:** just push the github.event.ref ([8dff85a](https://github.com/SocialGouv/actions/commit/8dff85a2f42a884594ff38e8f81fb6809a0f8bb0))


### Features

* socialgouv/actions/k8s-manifests-debug ([#1](https://github.com/SocialGouv/actions/issues/1)) ([fa44c3c](https://github.com/SocialGouv/actions/commit/fa44c3c4a67995e0a1bad3097ee3f1230ec58790))
* **k8s-manifests-debug:** use the :robot: ([#2](https://github.com/SocialGouv/actions/issues/2)) ([8a3e452](https://github.com/SocialGouv/actions/commit/8a3e4529bbd02dd99d5f3f83949d06dd9328d016))
* socialgouv/actions/k8s-manifests-debug ([#1](https://github.com/SocialGouv/actions/issues/1)) ([7bfbb19](https://github.com/SocialGouv/actions/commit/7bfbb19d0c52efb9d786a2a2f0041a997db8973b))
* **actions:** add mirror gitlab action ([181bcb9](https://github.com/SocialGouv/actions/commit/181bcb9c457d248af03e3aff984864dabd10c802))
* **k8s-funeral:** actually busy the thing ([7fa4c5e](https://github.com/SocialGouv/actions/commit/7fa4c5e1540a1489a690a1246cc63a9c19d573ee))
* **k8s-funeral:** add k8s funeral action ([9cf7503](https://github.com/SocialGouv/actions/commit/9cf7503a24601742b40375c1821d8ef031294636))
* **k8s-funeral:** install kapp ([eec42fe](https://github.com/SocialGouv/actions/commit/eec42febc9a6390b73ee6be1f0dcfb5808c91a6e))
* **k8s-funeral:** install kapp (2) ([b8d6d66](https://github.com/SocialGouv/actions/commit/b8d6d6652e5ea36db9cec2f4032abc8667b925bb))
* **k8s-funeral:** pass the kubeconfig ([da2a40c](https://github.com/SocialGouv/actions/commit/da2a40c5076d1a2bd0982d564186db5d0511871d))
* **mirror:** the remote is a variable now ([11ea24a](https://github.com/SocialGouv/actions/commit/11ea24ac254efb15bbe4b3ce0845b77d35818a63))
