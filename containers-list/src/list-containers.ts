import { JSDOM } from "jsdom"

const listContainers = async (org: string, page = 1): Promise<string[]> => {
  const options = {}
  const url = `https://github.com/orgs/${org}/packages?ecosystem=container&page=${page}`

  const dom = await JSDOM.fromURL(url, options)

  const containers = Array.from(
    dom.window.document.querySelectorAll("#org-packages .Link--primary")
  ).map((node) =>
    decodeURIComponent(
      String(`https://github.com/${node.getAttribute("href")}`.split("/").pop())
    )
  )

  const next = dom.window.document.querySelector(
    ".paginate-container a[rel='next']"
  )

  if (next) {
    const nextContainers = await listContainers(org, page + 1)
    return containers.concat(nextContainers)
  }

  return containers
}

export default listContainers
