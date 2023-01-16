require("dotenv").config()
const nodemailer = require("nodemailer")
//hella of a tip next line destructure the process.env to get values
const { EMAIL_HOST, EMAIL_PORT, EMAIL_USER, EMAIL_PASSWORD } = process.env

//now with nodemailer we have to just setup the transporter
// see:  https://nodemailer.com/about/
const transporter = nodemailer.createTransport({
  host: EMAIL_HOST,
  port: EMAIL_PORT,
  secure: false, // true for 465, false for other ports
  auth: {
    user: EMAIL_USER, // generated ethereal user
    pass: EMAIL_PASSWORD, // generated ethereal password
  },
})

exports.handler = async (event, context, cb) => {
  const method = event.httpMethod
  if (method !== "POST") {
    return {
      statusCode: 405,
      body: "Only POST Requests Allowed",
    }
  }
  //now check all the fields needed for the email
  //console.log(event.body)
  const { name, email, subject, message } = JSON.parse(event.body)

  //check all present
  // if not name or not email or ...
  if (!name || !email || !subject || !message) {
    console.log("something missing")
    return {
      statusCode: 400,
      body: "Please provide all required fields",
    }
  }

  // next lets create a data object with all of our info
  // notice in the from you have to use this syntax with angle brackets
  // also note the same syntax for the to:  passing in the values in literal string
  const data = {
    from: "John Doe <learncodetutorial@gmail.com>",
    to: `${name} <${email}>`,
    subject: subject,
    html: `<p>${message}</p>`,
  }
  //now we can invoke the sendMail method, using the spread data (...data) so we dont have to supply them one by one
  //return success if ok
  //return error if not ok
  try {
    await transporter.sendMail({ ...data })
    return {
      statusCode: 200,
      body: "Success",
    }
  } catch (error) {
    return {
      statusCode: 400,
      body: JSON.stringify(error.message),
    }
  }
}
