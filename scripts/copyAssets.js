const fs = require("fs")

async function copyAssets() {
  fs.copyFileSync('src/index.html', 'dist/index.html')
}

module.exports = copyAssets
