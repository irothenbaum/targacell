const nodemailer = require('nodemailer')

// Create a transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.SENDER_EMAIL,
    pass: process.env.SENDER_PASSWORD
  }
})

exports.handler = async (event) => {
  console.log('Received event:', JSON.stringify(event, null, 2))
  let retVal = {
    isBase64Encoded: false,
    statusCode: 0,
    body: '',
    headers: {
      'content-type': 'application/json',
    },
  }

  try {
    // Deconstruct body params
    const body = event.isBase64Encoded ? Buffer.from(event.body, 'base64').toString('utf-8') : event.body
    const {form_name, name, phone, email, subject, message} = JSON.parse(body)

    // Email options
    const mailOptions = {
      from: process.env.SENDER_EMAIL,
      to: process.env.TARGET_EMAIL,
      subject: subject,
      text: `
        Form Name:
        ${form_name}
        
        Name: 
        ${name}
        
        Phone: 
        ${phone}
        
        Email: 
        ${email}
        
        Message: 
        ${message}
      `
    }

    console.log("Sending email with options:", mailOptions)

    await new Promise((resolve, reject) => {
      // Send the email
      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          reject(error)
        } else {
          resolve(info)
        }
      })
    }).then(() => {
      retVal.statusCode = 200
      retVal.body = {status: true}
    }).catch(err => {
      console.error(err)
      retVal.statusCode = 500
      retVal.body = {status: false, error: err.message}
    })
  } catch (err) {
    console.error(err)
    retVal.statusCode = 422
    retVal.body = {status: false, error: err.message}
  }

  retVal.body = JSON.stringify(retVal.body)

  return retVal
}
