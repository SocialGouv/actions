import generate from "@socialgouv/env-slug"
import yaml from "js-yaml"

const {
  ENVIRONMENT,
  NAMESPACE,
  PROJECT_NAME,
  RANCHER_PROJECT_ID,
  IMAGE_NAME,
  GITHUB_REF,
  GITHUB_SHA,
  BASE_DOMAIN,
  KEEP_ALIVE,
} = process.env

const gitBranch = GITHUB_REF ?? ""

const isProduction = ENVIRONMENT === "prod"
const isPreProduction = ENVIRONMENT === "preprod"
const isDev = !(isProduction || isPreProduction)

const keepAlive = Boolean(KEEP_ALIVE)

const branchName = gitBranch
  .replace("refs/heads/", "")
  .replace("refs/tags/", "")

const isRenovate = branchName.startsWith("renovate")
const isDestroyable = isDev && !keepAlive

const ttl = isDestroyable ? (isRenovate ? "1d" : "7d") : ""

const imageName = IMAGE_NAME
const sha = GITHUB_SHA ?? ""
const imageTag = gitBranch.startsWith("refs/tags/")
  ? (gitBranch.split("/").pop() ?? "").substring(1)
  : `sha-${sha}`

const projectName = PROJECT_NAME ?? ""
const namespace = NAMESPACE ?? ""

const subdomain = isProduction
  ? projectName
  : isPreProduction
  ? `${projectName}-preprod`
  : generate(`${projectName}-${branchName}`)

const MAX_HOSTNAME_SIZE = 53
const shortenHost = (hostname: string): string =>
  hostname.slice(0, MAX_HOSTNAME_SIZE).replace(/-+$/, "")

const domain = BASE_DOMAIN ?? ""

const host = `${shortenHost(subdomain)}.${domain}`

const registry = `ghcr.io/socialgouv/${imageName ?? projectName}`

const rancherProjectId = RANCHER_PROJECT_ID

const values = {
  global: {
    projectName,
    isProduction,
    isPreProduction,
    ttl,
    namespace,
    registry,
    gitBranch,
    rancherProjectId,
  },
  app: {
    host,
    imageTag,
  }
}

const dump: string = yaml.dump(values)

console.log(dump)