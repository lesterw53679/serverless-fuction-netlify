require("dotenv").config()
const Airtable = require("airtable-node")

const airtable = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY })
  .base("appn0pGxE3P0pG2pO")
  .table("products")

exports.handler = async (event, context, callback) => {
  try {
    const { records } = await airtable.list()
    const products = records.map((product) => {
      const { id } = product
      const { name, image, price } = product.fields
      const url = image[0].url
      return { id, name, url, price }
    })
    return {
      statusCode: 200,
      body: JSON.stringify(products),
      // in ES6 returning the names the same as what is above so dont need
      // to explicitly set these return vals
    }
  } catch (error) {}
  return {
    statusCode: 500,
    body: "Server Error",
    // in ES6 returning the names the same as what is above so dont need
    // to explicitly set these return vals
  }
}
