const {
  SOCIALGOUV_PRODUCTION,
  SOCIALGOUV_PREPRODUCTION,
  KEEP_ALIVE,
  BRANCH_NAME,
  COMPONENT,
  PROJECT_NAME,
  PG_CREATE_EXTENSIONS,
} = process.env;

const isProduction = Boolean(SOCIALGOUV_PRODUCTION);
const isPreProduction = Boolean(SOCIALGOUV_PREPRODUCTION);
const keepAlive = Boolean(KEEP_ALIVE);

const isDev = !isPreProduction && !isProduction;
const isRenovate = BRANCH_NAME?.startsWith("renovate")
const isDestroyable = isDev && !keepAlive;

let ttl = "";
if(isDestroyable){
  ttl = isRenovate ? "1d" : "7d";
}

const component = COMPONENT || PROJECT_NAME

const pgCreateExtensions = PG_CREATE_EXTENSIONS

const values = {
  ttl,
  component,
  pgCreateExtensions,
}

console.log(JSON.stringify(values, null, 2))
