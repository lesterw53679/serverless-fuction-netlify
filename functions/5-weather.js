require("dotenv").config()
const axios = require("axios")

const url = `https://api.openweathermap.org/data/2.5/weather?appid=${process.env.OPEN_WEATHER_API_KEY}&units=imperial&q=`

exports.handler = async (event, context, callback) => {
  //first check the method of the request
  const method = event.httpMethod
  if (method !== "POST") {
    return {
      statusCode: 405,
      body: "Only POST Requests Allowed",
    }
  }
  const { city } = JSON.parse(event.body)
  // above this will throw error cause you cannont parse undefined when a get request comes in and that is why we check method being used
  // get the data now
  try {
    //console.log(`${url}${city}`)
    const resp = await axios.get(`${url}${city}`)
    return {
      statusCode: 200,
      body: JSON.stringify(resp.data),
      //rememeber we are getting a massive object but we can just grab the data part (resp.data)
      //now go back to the frontend
    }
  } catch (error) {
    return {
      statusCode: 404,
      body: JSON.stringify(error),
    }
  }
}

//https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
