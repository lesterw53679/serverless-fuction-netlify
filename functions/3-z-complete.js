//combination function oof 3-product.js and 3-airtable.js
// to debug start server and navigate to
// http://localhost:8888/api/3-z-complete

//http://localhost:8888/api/3-z-complete?id=recQpWVdY4KICBYVl
require("dotenv").config()
const Airtable = require("airtable-node")

const airtable = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY })
  .base("appn0pGxE3P0pG2pO")
  .table("products")

exports.handler = async (event, context, callback) => {
  const { id } = event.queryStringParameters
  if (id) {
    try {
      const product = await airtable.retrieve(id)
      if (product.error) {
        return {
          statusCode: 404,
          body: `No product with id: ${id}`,
        }
      }
      return {
        statusCode: 200,
        body: JSON.stringify(product),
      }
    } catch (error) {
      return {
        statusCode: 500,
        body: `Server Error`,
      }
    }
  }
  //below comes from the block in 3-airtable.js, above comes from 3-product.js
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
