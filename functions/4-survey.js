require("dotenv").config()
const Airtable = require("airtable-node")

const airtable = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY })
  .base("appn0pGxE3P0pG2pO")
  .table("survey")

exports.handler = async (event, context, callback) => {
  const method = event.httpMethod
  if (method === "GET") {
    try {
      const { records } = await airtable.list()
      const survey = records.map((item) => {
        const { id } = item
        const { room, votes } = item.fields
        return { id, room, votes }
      })

      return {
        statusCode: 200,
        body: JSON.stringify(survey),
      }
    } catch (error) {}
    return {
      statusCode: 500,
      body: "Server Error",
    }
  }

  if (method === "PUT") {
    //we have to turn the string body back into a json object
    try {
      const { id, votes } = JSON.parse(event.body)
      //make sure we have both the id and the votes
      if (!id || !votes) {
        return {
          statusCode: 400,
          body: "Please provide id and votes values",
        }
      }
      //the airtable is expecting a fields object, increment +1
      const fields = { votes: Number(votes) + 1 }
      //use the update method passing the id
      const item = await airtable.update(id, { fields })
      console.log(item)
      if (item.error) {
        return {
          statusCode: 400,
          body: JSON.stringify(item),
        }
      }
      return {
        statusCode: 200,
        body: JSON.stringify(item),
      }
    } catch (error) {
      return {
        statusCode: 400,
        body: JSON.stringify(item),
      }
    }
  }
  //Default response
  return {
    statusCode: 405,
    body: "Only GET and PUT Requests Allowed",
  }
}
