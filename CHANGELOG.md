## [1.6.6](https://github.com/SocialGouv/actions/compare/v1.6.5...v1.6.6) (2021-10-11)


### Bug Fixes

* Add sleep between namespace creation and app deployment ([98454ac](https://github.com/SocialGouv/actions/commit/98454ace3872cd2899dc2885010df05316619164))

## [1.6.5](https://github.com/SocialGouv/actions/compare/v1.6.4...v1.6.5) (2021-10-06)


### Bug Fixes

* Add SOCIALGOUV_PRODUCTION_NAMESPACE to k8s-manifests action ([ce4ff7c](https://github.com/SocialGouv/actions/commit/ce4ff7cb0a97d4bec412c1d9d8332faaf6bcd8c8))

## [1.6.4](https://github.com/SocialGouv/actions/compare/v1.6.3...v1.6.4) (2021-10-04)


### Bug Fixes

* **deactivate:** rm useless ([#34](https://github.com/SocialGouv/actions/issues/34)) ([3771bdd](https://github.com/SocialGouv/actions/commit/3771bddb25f87bc3ea53d433b1bc9726b9ce60a9))

## [1.6.3](https://github.com/SocialGouv/actions/compare/v1.6.2...v1.6.3) (2021-10-04)


### Bug Fixes

* **deactivate:** directory works only with v2 ([#37](https://github.com/SocialGouv/actions/issues/37)) ([a1be969](https://github.com/SocialGouv/actions/commit/a1be969dce67fab31a7f649670a488d8cd08f647))

## [1.6.2](https://github.com/SocialGouv/actions/compare/v1.6.1...v1.6.2) (2021-10-04)


### Bug Fixes

* **deactivate:** run yarn cache in .k8s directory ([#36](https://github.com/SocialGouv/actions/issues/36)) ([e9f7e30](https://github.com/SocialGouv/actions/commit/e9f7e307398476edb082ddbcccfbef0e8dcbf346))

## [1.6.1](https://github.com/SocialGouv/actions/compare/v1.6.0...v1.6.1) (2021-09-28)


### Bug Fixes

* Add rancherId inputs to k8s-restore-db action ([a647887](https://github.com/SocialGouv/actions/commit/a647887d3d5125f498c99d3831591af4ed2b83b3))

# [1.6.0](https://github.com/SocialGouv/actions/compare/v1.5.7...v1.6.0) (2021-09-28)


### Features

* Add k8s-namespace action ([#32](https://github.com/SocialGouv/actions/issues/32)) ([676dd59](https://github.com/SocialGouv/actions/commit/676dd59d40a2583bb4e5a21d485e6784af2ac64b))

## [1.5.7](https://github.com/SocialGouv/actions/compare/v1.5.6...v1.5.7) (2021-09-27)


### Bug Fixes

* Add socialgouvBaseDomain inputs to k8s-restore-db action ([51fb54a](https://github.com/SocialGouv/actions/commit/51fb54a642f52cd8a3edeb0b16bea0a3ab160175))

## [1.5.6](https://github.com/SocialGouv/actions/compare/v1.5.5...v1.5.6) (2021-09-27)


### Bug Fixes

* Add rancherId and socialgouvBaseDomain inputs to k8s-deactivate action ([11d4cb0](https://github.com/SocialGouv/actions/commit/11d4cb0a7370a504da94c7cc767657aa7bbcfa9e))

## [1.5.5](https://github.com/SocialGouv/actions/compare/v1.5.4...v1.5.5) (2021-09-27)


### Bug Fixes

* Use inputs for RANCHER_PROJECT_ID and SOCIALGOUV_BASE_DOMAIN within restore-db ([eaef395](https://github.com/SocialGouv/actions/commit/eaef395575e2fea0e5b9c7d096d4e6bf6c1a48cd))

## [1.5.4](https://github.com/SocialGouv/actions/compare/v1.5.3...v1.5.4) (2021-09-27)


### Bug Fixes

* Use image name as scope within register action ([#30](https://github.com/SocialGouv/actions/issues/30)) ([4e2c252](https://github.com/SocialGouv/actions/commit/4e2c252590ad11136fce180d0409b2a0fd40b7e3))

## [1.5.3](https://github.com/SocialGouv/actions/compare/v1.5.2...v1.5.3) (2021-09-27)


### Bug Fixes

* Add socialgouvBaseDomain to autodevops action ([dcb647b](https://github.com/SocialGouv/actions/commit/dcb647b1a1bee33846cbfedf9e218510e6e8f73d))

## [1.5.2](https://github.com/SocialGouv/actions/compare/v1.5.1...v1.5.2) (2021-09-23)


### Bug Fixes

* Avoid workflow failure on kubectl delete ([5ac142c](https://github.com/SocialGouv/actions/commit/5ac142c580f71aa7d0081b140f177349cbdf2974))

## [1.5.1](https://github.com/SocialGouv/actions/compare/v1.5.0...v1.5.1) (2021-09-23)


### Bug Fixes

* Add scope to GHA image build cache ([#28](https://github.com/SocialGouv/actions/issues/28)) ([f124337](https://github.com/SocialGouv/actions/commit/f124337adc8e106f2ac57ad97465c71c6b1dd833))

# [1.5.0](https://github.com/SocialGouv/actions/compare/v1.4.0...v1.5.0) (2021-09-23)


### Features

* **autodevops-manifests:** add inputs.rancherId ([#24](https://github.com/SocialGouv/actions/issues/24)) ([42ad9b9](https://github.com/SocialGouv/actions/commit/42ad9b9f2d3e4c3692860e7d97e42525db259a8d))

# [1.4.0](https://github.com/SocialGouv/actions/compare/v1.3.3...v1.4.0) (2021-09-21)


### Features

* add harbor-build-register action ([#25](https://github.com/SocialGouv/actions/issues/25)) ([14f36cf](https://github.com/SocialGouv/actions/commit/14f36cfb50e8692e02898263ee0074daa048969f))

## [1.3.3](https://github.com/SocialGouv/actions/compare/v1.3.2...v1.3.3) (2021-09-20)


### Bug Fixes

* Add rancherId input to autodevops-manifests action ([674d494](https://github.com/SocialGouv/actions/commit/674d494ab28b4b09c0d5dede34893133ea3413aa))

## [1.3.2](https://github.com/SocialGouv/actions/compare/v1.3.1...v1.3.2) (2021-09-20)


### Bug Fixes

* **deploy:** Create instead of apply for k8s namespace ([#23](https://github.com/SocialGouv/actions/issues/23)) ([c7bdfc4](https://github.com/SocialGouv/actions/commit/c7bdfc4472b6e7d4b6514b04fea92dfd97a4d9d7))

## [1.3.1](https://github.com/SocialGouv/actions/compare/v1.3.0...v1.3.1) (2021-09-20)


### Bug Fixes

* Output deploy url from autodevops action ([83d6f9b](https://github.com/SocialGouv/actions/commit/83d6f9bf73cb31df6900c84a74afe09a5b6dd857))

# [1.3.0](https://github.com/SocialGouv/actions/compare/v1.2.3...v1.3.0) (2021-09-20)


### Features

* **autodevops-deploy:** add outputs.url ([#21](https://github.com/SocialGouv/actions/issues/21)) ([86b8272](https://github.com/SocialGouv/actions/commit/86b82722e046fe44d0853bf55611d0c92a304109))

## [1.2.3](https://github.com/SocialGouv/actions/compare/v1.2.2...v1.2.3) (2021-09-20)


### Bug Fixes

* Add id to semantic workflow step ([0757d20](https://github.com/SocialGouv/actions/commit/0757d204b9aa975ac9ba823b824ceb2975fad6ab))

## [1.2.2](https://github.com/SocialGouv/actions/compare/v1.2.1...v1.2.2) (2021-09-20)


### Bug Fixes

* Update major version tag on release ([ca2187f](https://github.com/SocialGouv/actions/commit/ca2187f3931beca344168b6b9fff3cdb9f928b5d))

## [1.2.1](https://github.com/SocialGouv/actions/compare/v1.2.0...v1.2.1) (2021-09-15)


### Bug Fixes

* **k8s-manifests:** yarn cache for .k8s ([#20](https://github.com/SocialGouv/actions/issues/20)) ([d6a5b1f](https://github.com/SocialGouv/actions/commit/d6a5b1f5367816e527ccddfe0aa2adec3ba397b3))

# [1.2.0](https://github.com/SocialGouv/actions/compare/v1.1.3...v1.2.0) (2021-09-13)


### Features

* Add k8s-deactivate action. ([#18](https://github.com/SocialGouv/actions/issues/18)) ([220593f](https://github.com/SocialGouv/actions/commit/220593fe9105f47fbda77d2aa4b31815bcda0d12))

## [1.1.3](https://github.com/SocialGouv/actions/compare/v1.1.2...v1.1.3) (2021-09-09)


### Bug Fixes

* Add docker build args to autodevops build action. ([#19](https://github.com/SocialGouv/actions/issues/19)) ([b552246](https://github.com/SocialGouv/actions/commit/b55224645f13b3bf70a1b06c6a544ec1bfed7e7e))

## [1.1.2](https://github.com/SocialGouv/actions/compare/v1.1.1...v1.1.2) (2021-09-08)


### Bug Fixes

* Add k8s restore db action. ([#15](https://github.com/SocialGouv/actions/issues/15)) ([fad5e93](https://github.com/SocialGouv/actions/commit/fad5e937c2f912c7299d2cb80b09cc4248726ac6))

## [1.1.1](https://github.com/SocialGouv/actions/compare/v1.1.0...v1.1.1) (2021-09-07)


### Bug Fixes

* Get Rancher ID from env files. ([#14](https://github.com/SocialGouv/actions/issues/14)) ([5408e34](https://github.com/SocialGouv/actions/commit/5408e34f97011eb78d81c5f7ce13296159660fe3))

# [1.1.0](https://github.com/SocialGouv/actions/compare/v1.0.14...v1.1.0) (2021-09-06)


### Features

* Add k8s manifests generation action. ([#13](https://github.com/SocialGouv/actions/issues/13)) ([5f0de5d](https://github.com/SocialGouv/actions/commit/5f0de5d621e3c1e94e2931a3c7b5bea4124a7bed))

## [1.0.14](https://github.com/SocialGouv/actions/compare/v1.0.13...v1.0.14) (2021-09-02)


### Bug Fixes

* Add context input to autodevops build action. ([1382e84](https://github.com/SocialGouv/actions/commit/1382e84af7768238b2741f60a2c609326583410f))

## [1.0.13](https://github.com/SocialGouv/actions/compare/v1.0.12...v1.0.13) (2021-09-02)


### Bug Fixes

* autodevops deploy quotes. ([09f6846](https://github.com/SocialGouv/actions/commit/09f684684692643e790831078cde2aaf2bb1269a))

## [1.0.12](https://github.com/SocialGouv/actions/compare/v1.0.11...v1.0.12) (2021-09-02)


### Bug Fixes

* Add autodevops action. ([#11](https://github.com/SocialGouv/actions/issues/11)) ([fd50b00](https://github.com/SocialGouv/actions/commit/fd50b00355beb0c994948d8680de5247320daca4))

## [1.0.11](https://github.com/SocialGouv/actions/compare/v1.0.10...v1.0.11) (2021-09-02)


### Bug Fixes

* **autodevops-manifests:** test if .socialgouv/environments is a directory not a file ([d86b756](https://github.com/SocialGouv/actions/commit/d86b7567577105837a548b54975a8a984723e3ff))

## [1.0.10](https://github.com/SocialGouv/actions/compare/v1.0.9...v1.0.10) (2021-09-02)


### Bug Fixes

* **autodevops-manifests:** remove environments placeholder files ([22a1c01](https://github.com/SocialGouv/actions/commit/22a1c01a902703f86ef9d6c972b92b9233e7c40c))

## [1.0.9](https://github.com/SocialGouv/actions/compare/v1.0.8...v1.0.9) (2021-09-01)


### Bug Fixes

* Add productionNamespace to manifests generation. ([40b31b2](https://github.com/SocialGouv/actions/commit/40b31b208f061831a400a05eb48c82393fc8159f))

## [1.0.8](https://github.com/SocialGouv/actions/compare/v1.0.7...v1.0.8) (2021-09-01)


### Bug Fixes

* Override production namespace. ([#10](https://github.com/SocialGouv/actions/issues/10)) ([6a9c7f1](https://github.com/SocialGouv/actions/commit/6a9c7f184ee3924fe1ec2814c8f42503e260c502))

## [1.0.7](https://github.com/SocialGouv/actions/compare/v1.0.6...v1.0.7) (2021-09-01)


### Bug Fixes

* Check if environments folder exists before copy. ([#9](https://github.com/SocialGouv/actions/issues/9)) ([c170635](https://github.com/SocialGouv/actions/commit/c1706350c5986b1681b7cef1138325df788dd9ba))

## [1.0.6](https://github.com/SocialGouv/actions/compare/v1.0.5...v1.0.6) (2021-09-01)


### Bug Fixes

* **k8s-funeral:** run as dev only (3) ([1b716d0](https://github.com/SocialGouv/actions/commit/1b716d0da27cb8238f3241394deb16c66b42635b))

## [1.0.5](https://github.com/SocialGouv/actions/compare/v1.0.4...v1.0.5) (2021-09-01)


### Bug Fixes

* **k8s-funeral:** run as dev only (2) ([0bc7e4f](https://github.com/SocialGouv/actions/commit/0bc7e4fe1d41bed6f6c0ea2e21cea4ec3cf43728))

## [1.0.4](https://github.com/SocialGouv/actions/compare/v1.0.3...v1.0.4) (2021-09-01)


### Bug Fixes

* **k8s-funeral:** run as dev only ([61d7ab5](https://github.com/SocialGouv/actions/commit/61d7ab5f9a0838d5ab326185d04feb5c69c00680))

## [1.0.3](https://github.com/SocialGouv/actions/compare/v1.0.2...v1.0.3) (2021-09-01)


### Bug Fixes

* **k8s-funeral:** enfore GITHUB_REF with GITHUB_HEAD_REF ([51de6a4](https://github.com/SocialGouv/actions/commit/51de6a4f0fb43d911bebd65009d772a773222cb0))

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
