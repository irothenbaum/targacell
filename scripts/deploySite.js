const buildSite = require('./buildSite')

async function run() {
  await buildSite()

  // TODO: deploy to s3
}

run().then(() => {
  console.log('- DONE- ')
}).catch((err) => {
  console.error(err)
})
