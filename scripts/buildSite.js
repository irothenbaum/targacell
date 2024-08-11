const compilePages = require('./compilePages')
const compileStyles = require('./compileStyles')
const copyAssets = require('./copyAssets')

async function buildSite() {
  console.log("Building site...")
  await compilePages()
  await compileStyles()
  await copyAssets()
  console.log("Site built to build folder")
}

module.exports = buildSite

