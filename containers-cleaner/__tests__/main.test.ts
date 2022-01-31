import * as path from "path"
import sub from "date-fns/sub"
import * as process from "process"
import * as cp from "child_process"
import { expect, test } from "@jest/globals"
import type { Endpoints } from "@octokit/types"
import { isProtectedTag, getVersionsToDelete } from "../src/clean-up"

type PackageVersionsResponse =
  Endpoints["GET /orgs/{org}/packages/{package_type}/{package_name}/versions"]["response"]

const containers = [
  "mano/api",
  // "fabrique/standup",
  // "fabrique/carnets",
  // "fabrique/hasura",
  // "docker/pg-cleaner",
  // "docker/fluentd-modsecurity",
]

const protectedTags = [
  "^prod$",
  "^latest$",
  "^master$",
  "^preprod$",
  "^prod-(\\w+)$",
  "^(\\d+\\.\\d+)(\\.\\d+)?(-(alpha|beta).\\d+)?$",
]

const tags = {
  "0.0.1": true,
  "21.75.93": true,
  "0.42": true,
  prod: true,
  preprod: true,
  latest: true,
  "prod-8aa55591e2307e214": true,
  "0.0.1-alpha.42": true,
  "0.0.1-beta.42": true,
  master: true,
  "sha-8aa55591e2307e214": false,
  dev: false,
  "dev-8aa55591e2307e214": false,
  "my-supa-branch": false,
  "my-custom-version-9.1": false,
}

const versions = [
  {
    updated_at: sub(new Date(), { weeks: 5 }).toString(),
    metadata: {
      container: { tags: ["sha-4eac3eedb852a90ce3414", "1.0.4"] },
    },
  },
  {
    updated_at: sub(new Date(), { weeks: 5 }).toString(),
    metadata: {
      container: { tags: ["sha-4eac3eedb852a90ce3414", "latest"] },
    },
  },
  {
    updated_at: sub(new Date(), { weeks: 5 }).toString(),
    metadata: {
      container: { tags: ["sha-4eac3eedb852a90ce3414", "preprod"] },
    },
  },
  {
    updated_at: sub(new Date(), { weeks: 5 }).toString(),
    metadata: {
      container: { tags: ["sha-4eac3eedb852a90ce3414", "master"] },
    },
  },
  {
    updated_at: sub(new Date(), { weeks: 5 }).toString(),
    metadata: {
      container: { tags: ["sha-4eac3eedb852a90ce3414", "1.3.42-alpha.99"] },
    },
  },
  {
    updated_at: sub(new Date(), { weeks: 5 }).toString(),
    metadata: {
      container: { tags: ["sha-4eac3eedb852a90ce3414", "4.39.5-beta.1"] },
    },
  },
  {
    updated_at: sub(new Date(), { weeks: 1 }).toString(),
    metadata: {
      container: { tags: ["sha-5aeedb852a42bc333", "my-supa-branch"] },
    },
  },
  {
    updated_at: sub(new Date(), { weeks: 5 }).toString(),
    metadata: {
      container: { tags: ["sha-5aefcb852a69bc382", "my-supa-branch"] },
    },
  },
] as PackageVersionsResponse["data"]

test.each(Object.entries(tags))(
  "Is it a protected tag: %s",
  async (tag, isProtected) => {
    const answer = isProtectedTag(String(tag), protectedTags)
    expect(answer).toBe(isProtected)
  }
)

test("Get versions to delete", () => {
  const versionsToDelete = getVersionsToDelete(versions, 2, protectedTags)
  expect(versionsToDelete.length).toBe(1)
  expect(versionsToDelete[0].metadata?.container?.tags[0]).toBe(
    "sha-5aefcb852a69bc382"
  )
})

test("Test lib/main.js", () => {
  process.env["INPUT_RETENTION-WEEKS"] = "4"
  process.env["INPUT_ORGANIZATION"] = "socialgouv"
  process.env["INPUT_CONTAINERS"] = containers.join("\n")
  process.env["INPUT_PROTECTED-TAGS"] = protectedTags.join("\n")
  process.env["DEBUG"] = "*"
  const np = process.execPath
  const ip = path.join(__dirname, "..", "lib", "main.js")

  const options: cp.ExecFileSyncOptions = {
    env: process.env,
  }
  const result = cp.execFileSync(np, [ip], options).toString()
  console.log(result)
})
