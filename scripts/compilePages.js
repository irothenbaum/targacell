const path = require("path")
const {BUILD_DIR, SRC_DIR} = require("./constants")
const fs = require("fs")
const Twig = require("twig")

async function compilePages() {
  console.log("Compiling pages...")
  const pagesDir = path.join(SRC_DIR, 'templates', 'pages')
  const pages = fs.readdirSync(pagesDir)

  for (const file of pages) {
    const pageName = file.split('.')[0]
    await new Promise((resolve, reject) => Twig.renderFile(path.join(pagesDir, file), {}, (err, html) => {
      if (err) {
        reject(err)
      }

      console.log(`Compiling ${file}`)
      try {
        fs.writeFileSync(path.join(BUILD_DIR, `${pageName}.html`), html)

        // Copy home.html to index.html
        if (pageName === 'home') {
          fs.writeFileSync(path.join(BUILD_DIR, `index.html`), html)
        }

        resolve(pageName)
      } catch (err) {
        reject(err)
      }
    }))

    console.log(`- ${pageName} built`)
  }
  console.log("Pages compiled")
}

module.exports = compilePages
