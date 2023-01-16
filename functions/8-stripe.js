require("dotenv").config()
const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY)

exports.handler = async (event, context, callback) => {
  const method = event.httpMethod
  if (method !== "POST") {
    return {
      statusCode: 405,
      body: "Only Accepts POST Requests",
    }
  }
  const { purchase, total_amount, shipping_fee } = JSON.parse(event.body)
  //console.log(purchase, total_amount, shipping_fee)
  const calculateOrderAmount = () => {
    // Replace this constant with a calculation of the order's amount
    // Calculate the order total on the server to prevent
    // people from directly manipulating the amount on the client
    return shipping_fee + total_amount
  }

  try {
    //note the method on stripe is paymentIntents with an s, also for the clientSecret: keep as expected on front end
    const paymentIntent = await stripe.paymentIntents.create({
      amount: calculateOrderAmount(),
      currency: "usd",
    })

    return {
      statusCode: 200,
      body: JSON.stringify({ clientSecret: paymentIntent.client_secret }),
    }
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    }
  }
}
