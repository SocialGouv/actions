const { execFile, execSync } = require('child_process');

const promiseFromChildProcess = (child) => {
  return new Promise(function (resolve, reject) {
    child.addListener("error", reject);
    child.addListener("exit", resolve);
  });
}

const shell = (cmd) => execSync(cmd, { encoding: 'utf8' })
const asyncShell = ([cmd, ...args], pipe = false) => {
  const childProcess = execFile(cmd, args, { encoding: 'utf8' })
  if (pipe) {
    childProcess.stdout.pipe(process.stdout)
    childProcess.stderr.pipe(process.stderr)
  }
  return promiseFromChildProcess(childProcess)
}

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

module.exports = {
  shell,
  asyncShell,
  miniHash,
}