import generate from "@socialgouv/env-slug";
import yaml from "js-yaml";

const {
  REPOSITORY_NAME,
  ENVIRONMENT,
  NAMESPACE,
  RANCHER_PROJECT_ID,
  IMAGE_NAME,
  GITHUB_REF,
  GITHUB_SHA,
  BASE_DOMAIN,
  BASE_SUBDOMAIN,
  PRODUCTION_HOST,
  KEEP_ALIVE,
  CERT_SECRET_NAME,
} = process.env;

const gitBranch = GITHUB_REF ?? "";

const isProduction = ENVIRONMENT === "prod";
const isPreProduction = ENVIRONMENT === "preprod";
const isDev = !(isProduction || isPreProduction);

const repositoryName = REPOSITORY_NAME ?? "";

const keepAlive = Boolean(KEEP_ALIVE);

const branchName = gitBranch
.replace("refs/heads/", "")
.replace("refs/tags/", "");

const isRenovate = branchName.startsWith("renovate");
const isDestroyable = isDev && !keepAlive;

const ttl = isDestroyable ? (isRenovate ? "1d" : "7d") : "";

const imageName = IMAGE_NAME ?? repositoryName;
const sha = GITHUB_SHA ?? "";
const imageTag = gitBranch.startsWith("refs/tags/")
  ? (gitBranch.split("/").pop() ?? "").substring(1)
  : `sha-${sha}`;

const namespace = NAMESPACE ?? "";


const MAX_HOSTNAME_SIZE = 53;
const shortenHost = (hostname: string): string =>
hostname.slice(0, MAX_HOSTNAME_SIZE).replace(/-+$/, "");

const domain = BASE_DOMAIN ?? "";
const baseSubdomain = BASE_SUBDOMAIN ?? repositoryName;

const subdomain = isProduction
  ? baseSubdomain
  : isPreProduction
  ? `${baseSubdomain}-preprod`
  : generate(`${baseSubdomain}-${branchName}`);

const host =
  isProduction && PRODUCTION_HOST
    ? PRODUCTION_HOST
    : `${shortenHost(subdomain)}.${domain}`;

const registry = `ghcr.io/socialgouv/${imageName}`;

const rancherProjectId = RANCHER_PROJECT_ID;

const certSecretName = CERT_SECRET_NAME ?? (isProduction ? `${repositoryName}-crt` : "wildcard-crt")

const values = {
  global: {
    repositoryName,
    isProduction,
    isPreProduction,
    ttl,
    namespace,
    registry,
    gitBranch,
    rancherProjectId,
    certSecretName,
  },
  app: {
    host,
    imageTag,
  },
};

const dump: string = yaml.dump(values);

console.log(dump);
