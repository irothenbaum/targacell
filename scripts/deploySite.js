const buildSite = require('./buildSite')
const {execSync} = require('child_process')
const {BUILD_DIR} = require("./constants");

const BUCKET = 's3://targacell-website';

async function run() {
  await buildSite()

  // wait 5 seconds
  for (let i = 3; i > 0; i--) {
    console.log(`Deploying to ${BUCKET} in ${i} seconds...`)
    await pause(1000)
  }

  execSync(`aws s3 sync ${BUILD_DIR} ${BUCKET} --acl public-read`, {stdio: 'inherit'})
}

async function pause(timeMS) {
  await new Promise(r => setTimeout(r, timeMS))
}

run().then(() => {
  console.log('- DONE- ')
}).catch((err) => {
  console.error(err)
})
