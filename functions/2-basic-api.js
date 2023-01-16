const items = require("../assets/data")

exports.handler = async (event, context, callback) => {
  //callback(null, { statusCode: 200, body: "hello world" })
  //console.log(event)
  return {
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
    statusCode: 200,
    //body: JSON.stringify(person),
    body: JSON.stringify(items),
  }
}

//above fixes the CORS problem
