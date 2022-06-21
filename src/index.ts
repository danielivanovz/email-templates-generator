import { readdir, readFileSync, writeFileSync } from "fs"
import { join } from "path"
import mjml from "mjml"
import mustache from "mustache"

const dir = join(__dirname, "../src/templates")
const out = join(__dirname, "../src/html/")

const HTML = ".html"
const MJML = ".mjml"

export function poshta() {
  return {
    convert: (dir: string, out: string) => {
      return readdir(dir, (err, templates) => {
        if (err) throw Error(`Error reading templates: ${err.message}`)

        templates.forEach((template) => {
          console.info("Processing", template)

          const current = readFileSync(join(dir, template), "utf8")
          const html = out.concat(template.replace(MJML, HTML))

          writeFileSync(html, mjml(current).html)
        })
      })
    },
    render: (template: string, data: Record<string, unknown>) => {
      return mustache.render(template, data)
    },
  }
}

export default poshta()
