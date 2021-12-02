import * as core from "@actions/core"
import type { Endpoints } from "@octokit/types"
import { Octokit } from "octokit"
// import delay from "delay"
import isBefore from "date-fns/isBefore"
import pThrottle from "p-throttle"
import sub from "date-fns/sub"

type PackageVersionsResponse =
  Endpoints["GET /orgs/{org}/packages/{package_type}/{package_name}/versions"]["response"]

const octokit = new Octokit({ auth: core.getInput("token") })

export const isProtectedTag = (tag: string, protectedTags: string[]): boolean =>
  protectedTags.some((protectedTag) => {
    const regex = new RegExp(protectedTag)
    return regex.test(tag)
  })

export const isOldVersion = (
  updateDate: string,
  retentionWeeks: number
): boolean =>
  isBefore(new Date(updateDate), sub(new Date(), { weeks: retentionWeeks }))

export const deletePackageVersion = async (
  org: string,
  packageName: string,
  versionId: number
): Promise<void> => {
  await octokit.request(
    "DELETE /orgs/{org}/packages/{package_type}/{package_name}/versions/{package_version_id}",
    {
      org,
      package_type: "container",
      package_name: packageName,
      package_version_id: versionId,
    }
  )
}

export const deletePackageVersions = async (
  org: string,
  packageName: string,
  versions: PackageVersionsResponse["data"]
): Promise<void> => {
  const throttle = pThrottle({ limit: 1, interval: 800 })

  const throttled = throttle(async (id: number) =>
    deletePackageVersion(org, packageName, id)
  )

  for (const version of versions) {
    core.debug(
      `Delete version: ${version.name} -- ${
        version.updated_at
      } -- [${version.metadata?.container?.tags.join(", ")}]`
    )
    await throttled(version.id)
  }
}

export const getPackageVersions = async (
  org: string,
  name: string,
  page: number,
  limit: number
): Promise<PackageVersionsResponse["data"]> => {
  const result = await octokit.request(
    "GET /orgs/{org}/packages/{package_type}/{package_name}/versions",
    {
      org,
      page,
      per_page: limit,
      package_name: name,
      package_type: "container",
    }
  )
  return result.data
}

export const getVersionsToDelete = (
  versions: PackageVersionsResponse["data"],
  retentionWeeks: number,
  tags: string[]
): PackageVersionsResponse["data"] =>
  versions.filter(
    (version) =>
      isOldVersion(version.updated_at, retentionWeeks) &&
      !version.metadata?.container?.tags.some((tag) =>
        isProtectedTag(String(tag), tags)
      )
  )

interface Params {
  org: string
  page: number
  limit: number
  tags: string[]
  packageName: string
  retentionWeeks: number
}

const cleanUp = async (params: Params): Promise<number> => {
  // await delay(800)
  let count = 0
  const { org, packageName, page, limit, retentionWeeks, tags } = params

  core.debug(`==> Page ${page} (limit: ${limit})`)

  const versions = await getPackageVersions(org, packageName, page, limit)
  core.debug(`Versions found: ${versions.length}`)

  if (versions.length) {
    const versionsToDelete = getVersionsToDelete(versions, retentionWeeks, tags)
    core.debug(`Versions to delete: ${versionsToDelete.length}`)
    count += versionsToDelete.length

    if (count) {
      await deletePackageVersions(org, packageName, versionsToDelete)
      count += await cleanUp(params)
    } else if (versions.length === limit) {
      params.page++
      count += await cleanUp(params)
    }
  }

  return count
}

// const purge = async (
//   org: string,
//   packageName: string,
//   page = 1,
//   limit = 100,
//   retentionWeeks = 2
// ): Promise<number> => {
//   await delay(100)
//   let count = 0
//   core.debug(`==> Page ${page} (limit: ${limit})`)
//   const versions = await getPackageVersions(org, packageName, page, limit)
//   core.debug(`Versions found: ${versions.length}`)

//   if (versions.length) {
//     const versionsToDelete = getVersionsToDelete(versions, retentionWeeks)
//     core.debug(`Versions to delete: ${versionsToDelete.length}`)
//     count += versionsToDelete.length

//     if (count) {
//       await deletePackageVersions(org, packageName, versionsToDelete)
//       count += await purge(org, packageName, page, limit, retentionWeeks)
//     } else if (versions.length === limit) {
//       count += await purge(org, packageName, page + 1, limit, retentionWeeks)
//     }
//   }

//   return count
// }

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

export default cleanUp
