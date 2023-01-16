require("dotenv").config()
const axios = require("axios")
const url = "https://api.buttondown.email/v1/subscribers"
exports.handler = async (event, context, callback) => {
  const method = event.httpMethod
  if (method !== "POST") {
    return {
      statusCode: 405,
      body: "Only POST requests allowed",
    }
  }

  // remember that we need to parse the data comming from from front end
  // this will give us an email in the body
  const { email } = JSON.parse(event.body)
  if (!email) {
    return {
      statusCode: 400,
      body: "Please provide email value",
    }
  }
  try {
    //the third argument is the token with a header object
    //console.log(email)
    //console.log("inside try block app.js before axios.post")
    const data = await axios.post(
      url,
      { email },
      {
        headers: {
          Authorization: `Token ${process.env.BUTTONDOWN_API_KEY}`,
        },
      }
    )
    //if success then
    console.log(data)
    return {
      statusCode: 201,
      body: "Success",
    }
  } catch (error) {
    return {
      statusCode: 400,
      body: JSON.stringify(error.response.data),
    }
  }
}
