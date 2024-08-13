const fs = require("fs")
const path = require("path")
const {BUILD_DIR, SRC_DIR} = require("./constants")

async function copyAssets() {
  const assetDirectories = ['images', 'fonts', 'scripts']

  for (const dir of assetDirectories) {
    copyAllFilesInDir(path.join(SRC_DIR, dir), path.join(BUILD_DIR, dir))
  }
}

function copyAllFilesInDir(sourceDir, targetDir) {
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir)
  }
  console.log(`Copying Directory ${sourceDir} to ${targetDir}...`)
  const files = fs.readdirSync(sourceDir)

  for (const file of files) {
    console.log(`Copying "${file}"`)
    const sourceFilePath = path.join(sourceDir, file)
    const targetFilePath = path.join(targetDir, file)

    if (fs.lstatSync(sourceFilePath).isDirectory() ) {
      copyAllFilesInDir(sourceFilePath, targetFilePath)
    } else {
       fs.copyFileSync(sourceFilePath, targetFilePath)
    }
  }
}

module.exports = copyAssets
