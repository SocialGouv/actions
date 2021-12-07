import * as path from "path"
// import sub from "date-fns/sub"
// import * as process from "process"
import * as cp from "child_process"
import { expect, test } from "@jest/globals"
// import type { Endpoints } from "@octokit/types"
import listContainers from "../src/list-containers"

test("Get versions to delete", async () => {
  const containers = await listContainers("socialgouv")
  console.log("containers", containers)
  expect(containers.length).toBeGreaterThan(0)
})

test("Test lib/main.js", () => {
  process.env["INPUT_ORGANIZATION"] = "socialgouv"
  const np = process.execPath
  const ip = path.join(__dirname, "..", "lib", "main.js")
  const options: cp.ExecFileSyncOptions = {
    env: process.env,
  }
  console.log(cp.execFileSync(np, [ip], options).toString())
})
