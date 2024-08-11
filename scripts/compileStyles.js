const path = require("path")
const {BUILD_DIR, SRC_DIR} = require("./constants")
const fs = require("fs")
const sass = require("sass")

async function compileStyles() {
  console.log("Compiling styles...")
  const sassDir = path.join(SRC_DIR, 'styles')
  const styles = fs.readdirSync(sassDir)

  for (const file of styles) {
    if (fs.lstatSync(path.join(sassDir, file)).isDirectory() ) {
      continue
    }
    console.log(`Compiling ${file}`)
    const styleName = file.split('.')[0]
    const result = sass.compile(path.join(sassDir, file))

    fs.writeFileSync(path.join(BUILD_DIR, 'styles', `${styleName}.css`), result.css)
    console.log(`- ${styleName}`)
  }

  console.log("Styles compiled")
}

module.exports = compileStyles
