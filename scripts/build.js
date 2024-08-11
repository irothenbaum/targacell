const Twig = require('twig')
const fs = require('fs')

async function run() {
  console.log("Building site...")
  await buildPages()
  console.log("Pages built, building styles...")
  await buildStyles()
  console.log("Styles built, copying assets...")
  await copyAssets()
  console.log("Site built to build folder")
}

async function buildPages() {
}

async function buildStyles() {

}

async function copyAssets() {
  fs.copyFileSync('src/index.html', 'dist/index.html')
}

run().then(() => {
  console.log('- DONE- ')
}).catch((err) => {
  console.error(err)
})
