import * as core from "@actions/core"
import listContainers from "./list-containers"

const ORGANIZATION = core.getInput("organization")

async function run(): Promise<void> {
  try {
    const containers = await listContainers(ORGANIZATION)
    core.setOutput("containers", containers.join("\n"))
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)
  }
}

run()
