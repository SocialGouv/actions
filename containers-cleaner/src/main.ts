import * as core from "@actions/core"
import purge from "./purge"

const PAGE_LIMIT = 100 // Number of packages per page (from 1 to 100)
const START_PAGE_INDEX = 1 // Starting page index
const CONTAINERS = core.getMultilineInput("containers")
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
      const count = await purge(
        container,
        START_PAGE_INDEX,
        PAGE_LIMIT,
        RETENTION_WEEKS
      )
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
