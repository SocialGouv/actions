import * as core from "@actions/core"
import cleanUp from "./clean-up"

const PAGE_LIMIT = 100 // Number of packages per page (from 1 to 100)
const START_PAGE_INDEX = 1 // Starting page index
const ORGANIZATION = core.getInput("organization")
const CONTAINERS = core.getMultilineInput("containers")
const PROTECTED_TAGS = core.getMultilineInput("protected-tags")
const RETENTION_WEEKS = Number(core.getInput("retention-weeks"))

core.debug("------ INPUTS ------")
core.debug(`containers: ${CONTAINERS}`)
core.debug(`token: ${!!core.getInput("token")}`)
core.debug(`retention-weeks: ${RETENTION_WEEKS}`)
core.debug("--------------------")

async function run(): Promise<void> {
  let total = 0

  try {
    for (const container of CONTAINERS) {
      core.debug(`===> Container: ${container}`)
      const count = await cleanUp({
        tags: PROTECTED_TAGS,
        org: ORGANIZATION,
        limit: PAGE_LIMIT,
        packageName: container,
        page: START_PAGE_INDEX,
        retentionWeeks: RETENTION_WEEKS,
      })
      core.debug(`===> Package versions deleted: ${count}`)
      core.debug("--------------------")
      total += count
    }
    core.setOutput("total", total)
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)
  }
}

run()
