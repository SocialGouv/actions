const {
  REPOSITORY_NAME,
  ENVIRONMENT,
  NAMESPACE,
  RANCHER_PROJECT_ID,
  IMAGE_REGISTRY,
  IMAGE_NAME,
  GITHUB_REPOSITORY,
  GITHUB_REF,
  GITHUB_SHA,
  BRANCH_NAME,
  BRANCH_SLUG,
  BASE_DOMAIN,
  SUBDOMAIN,
  PRODUCTION_HOST,
  KEEP_ALIVE,
  CERT_SECRET_NAME,
  JOB_NAMESPACE,
  PRODUCTION_DATABASE,
} = process.env;

const gitBranch = GITHUB_REF || "";

const isProduction = ENVIRONMENT === "prod";
const isPreProduction = ENVIRONMENT === "preprod";
const isDev = !(isProduction || isPreProduction);

const repository = GITHUB_REPOSITORY
const repositoryName = REPOSITORY_NAME || "";

const keepAlive = Boolean(KEEP_ALIVE);

const branchName = BRANCH_NAME;

const isRenovate = branchName.startsWith("renovate");
const isDestroyable = isDev && !keepAlive;

const ttl = isDestroyable ? (isRenovate ? "1d" : "7d") : "";

const sha = GITHUB_SHA || "";
const imageTag = isPreProduction
  ? `preprod-${sha}`
  : gitBranch.startsWith("refs/tags/")
  ? (gitBranch.split("/").pop() || "").substring(1)
  : `sha-${sha}`;

const namespace = NAMESPACE || "";

const MAX_HOSTNAME_SIZE = 53;
const shortenHost = (hostname) =>
  hostname.slice(0, MAX_HOSTNAME_SIZE).replace(/-+$/, "");

const domain = BASE_DOMAIN || "";
const subdomain = SUBDOMAIN

const host =
  isProduction && PRODUCTION_HOST
    ? PRODUCTION_HOST
    : `${shortenHost(subdomain)}.${domain}`;

const registry = IMAGE_REGISTRY || "ghcr.io/socialgouv";
const imageName = IMAGE_NAME || repositoryName;
const image = `${registry}/${imageName}`;

const rancherProjectId = RANCHER_PROJECT_ID;

const certSecretName =
  CERT_SECRET_NAME || (isProduction ? `${repositoryName}-crt` : "wildcard-crt");

const branchSlug = BRANCH_SLUG;

const pgSecretName = isProduction ? "pg-user" :
  isPreProduction ? "pg-user-preprod"
  : `pg-user-${branchSlug}`

const productionDatabase = PRODUCTION_DATABASE || repositoryName

const pgDatabase = isProduction ? productionDatabase :
  isPreProduction ? "preprod"
    : `autodevops_${branchSlug}`
    
const pgUser = isProduction ? productionDatabase :
  isPreProduction ? "preprod"
    : `user_${branchSlug}`

const jobNamespace = JOB_NAMESPACE || namespace

const values = {
  global: {
    repository,
    repositoryName,
    isProduction,
    isPreProduction,
    ttl,
    namespace,
    gitBranch,
    rancherProjectId,
    certSecretName,
    pgSecretName,
    pgDatabase,
    pgUser,
    host,
    image,
    imageTag,
    branchSlug,
    branchName,
  },
  app: {},
  hasura: {},
  jobs: {
    namespace: jobNamespace,
  }
};

const dump = JSON.stringify(values, null, 2);

console.log(dump);
