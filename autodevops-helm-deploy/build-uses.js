const fs = require('fs');
const { execFile, execSync } = require('child_process');
const hash = require("./utils/mini-hash")

const promiseFromChildProcess = (child) => {
  return new Promise(function (resolve, reject) {
    child.addListener("error", reject);
    child.addListener("exit", resolve);
  });
}

const shell = (cmd) => execSync(cmd, { encoding: 'utf8' })
const asyncShell = ([cmd, ...args]) => promiseFromChildProcess(
    execFile(cmd, args, { encoding: 'utf8' })
  )

const miniHash = function jenkinsOneAtATimeHash(keyString) {
  let hash = 0;
  for (charIndex = 0; charIndex < keyString.length; ++charIndex) {
    hash += keyString.charCodeAt(charIndex);
    hash += hash << 10;
    hash ^= hash >> 6;
  }
  hash += hash << 3;
  hash ^= hash >> 11;
  return (((hash + (hash << 15)) & 4294967295) >>> 0).toString(16)
}


fs.mkdirSync("uses", {recursive: true})

const downloadingPromises = {}

const requireUse = async (use) => {
  const slug = shell(`env-slug ${use}`).trim()
  use = use.replace("@", "#")
  let target = `uses/${slug}`
  if (!fs.existsSync(target)){
    let loading = downloadingPromises[slug]
    if (!loading){
      loading = await asyncShell(["cp","-r",`/lab/betagouv/socialgouv/actions/uses/${use}`,target])
      // loading = await asyncShell(["degit",use,target])
      downloadingPromises[slug] = loading
    }
  }
  if (fs.lstatSync(target).isDirectory()) {
    target += "/use.yaml"
  }
  return { slug, use, target }
}

const compile = async (file, parentScope = [], parentWith = {}) => {
  const json = shell(`yq ${file} -o json`)
  const values = JSON.parse(json)
  const runs = values.jobs?.runs || values.runs
  if (!runs) return []
  const newRuns = []
  for (let i = 0; i < runs.length; i++) {
    const run = runs[i]
    
    if (!run.name) {
      run.name = miniHash(file)
    }
    if (!run.with) {
      run.with = {}
    }

    const scope = [...parentScope, run.name]
    run.scope = scope
    const scopes = []
    const currentScope = []
    for(const sc of scope){
      currentScope.push(sc)
      scopes.push(currentScope.join("."))
    }
    if (scope.length > 1){
      scopes.push([scope[0], scope[1]].join(".."))
    }
    run.scopes = scopes
    run.parentWith = Object.assign({}, parentWith, run.with)

    if (!run.use){
      newRuns.push(run)
      continue
    }
    
    const { target } = await requireUse(run.use)
    const compiled = await compile(target, scope, run.parentWith)
    if (compiled.runs){
      const flat = compiled.runs.map(r => ({
        ...Object.entries(r).reduce((acc, [key, value]) => {
          if (key != "use") {
            acc[key] = value
          }
          return acc
        }, {}),
        with: run.with,
      }))
      newRuns.push(...flat)
    }
  }
  runs.length = 0
  runs.push(...newRuns)
  return values
}

const main = async() => {
  const compiled = await compile("merged.values.yaml")
  fs.writeFileSync("compiled.values.yaml", JSON.stringify(compiled, null, 2))
}

main()
