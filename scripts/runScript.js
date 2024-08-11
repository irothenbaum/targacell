const fs = require('fs')
const path = require('path')

async function run() {
  const script = process.argv[2]
  if (!script) {
    throw new Error('No script provided')
  }
  if (script === 'runScript' || script === 'deploySite') {
    throw new Error('Cannot run this script')
  }

  if (!fs.existsSync(path.join(__dirname, script + '.js'))) {
    throw new Error(`Script "${script}" does not exist`)
  }

  console.log(`Running ${script}...`)

  const scriptFunc = require(path.join(__dirname, script))
  await scriptFunc()
}

run().then(() => {
  console.log('- DONE- ')
}).catch((err) => {
  console.error(err)
})
