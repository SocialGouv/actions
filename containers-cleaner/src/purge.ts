import * as core from "@actions/core"
import type { Endpoints } from "@octokit/types"
import { Octokit } from "octokit"
import delay from "delay"
import isBefore from "date-fns/isBefore"
import pThrottle from "p-throttle"
import sub from "date-fns/sub"

type PackageVersionsResponse =
  Endpoints["GET /orgs/{org}/packages/{package_type}/{package_name}/versions"]["response"]

const octokit = new Octokit({
  auth: core.getInput("token"),
})

const protectedTags = [
  /^prod$/,
  /^latest$/,
  /^preprod$/,
  /^prod-(\w+)$/,
  /^(\d+\.\d+)(\.\d+)?$/,
]

export const isProtectedTag = (tag: string): boolean =>
  protectedTags.some((protectedTag) => protectedTag.test(tag))

export const isOldVersion = (
  updateDate: string,
  retentionWeeks: number
): boolean =>
  isBefore(new Date(updateDate), sub(new Date(), { weeks: retentionWeeks }))

export const deletePackageVersion = async (
  packageName: string,
  versionId: number
): Promise<void> => {
  await octokit.request(
    "DELETE /orgs/{org}/packages/{package_type}/{package_name}/versions/{package_version_id}",
    {
      org: "socialgouv",
      package_type: "container",
      package_name: packageName,
      package_version_id: versionId,
    }
  )
}

export const deletePackageVersions = async (
  packageName: string,
  versions: PackageVersionsResponse["data"]
): Promise<void> => {
  const throttle = pThrottle({ limit: 1, interval: 800 })

  const throttled = throttle(async (id: number) =>
    deletePackageVersion(packageName, id)
  )

  for (const version of versions) {
    core.debug(`Delete version: ${version.name} -- ${version.updated_at}`)
    await throttled(version.id)
  }
}

export const getPackageVersions = async (
  name: string,
  page: number,
  limit: number
): Promise<PackageVersionsResponse["data"]> => {
  const result = await octokit.request(
    "GET /orgs/{org}/packages/{package_type}/{package_name}/versions",
    {
      page,
      per_page: limit,
      org: "socialgouv",
      package_name: name,
      package_type: "container",
    }
  )
  return result.data
}

export const getVersionsToDelete = (
  versions: PackageVersionsResponse["data"],
  retentionWeeks: number
): PackageVersionsResponse["data"] =>
  versions.filter(
    (version) =>
      isOldVersion(version.updated_at, retentionWeeks) &&
      !version.metadata?.container?.tags.some((tag) =>
        isProtectedTag(String(tag))
      )
  )

const purge = async (
  packageName: string,
  page = 1,
  limit = 100,
  retentionWeeks = 2
): Promise<number> => {
  await delay(100)
  let count = 0
  core.debug(`==> Page ${page} (limit: ${limit})`)
  const versions = await getPackageVersions(packageName, page, limit)
  core.debug(`Versions found: ${versions.length}`)

  if (versions.length) {
    const versionsToDelete = getVersionsToDelete(versions, retentionWeeks)
    core.debug(`Versions to delete: ${versionsToDelete.length}`)
    count += versionsToDelete.length

    if (count) {
      await deletePackageVersions(packageName, versionsToDelete)
      count += await purge(packageName, page, limit, retentionWeeks)
    } else if (versions.length === limit) {
      count += await purge(packageName, page + 1, limit, retentionWeeks)
    }
  }

  return count
}

// export const getRepositoryPackages = async (): Promise<
//   PackagesResponse["data"]
// > => {
//   try {
//     const {data: packages} = await octokit.request("GET /orgs/{org}/packages", {
//       org: "socialgouv",
//       package_type: "container"
//     })
//     return packages
//   } catch (error) {
//     throw error
//   }
// }

export default purge
