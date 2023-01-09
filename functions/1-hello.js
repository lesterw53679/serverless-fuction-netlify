//exports a function called handler, does it with a promise thus using async passing the two args and an arrow function
//always always return an object with statusCode and a body elements
//access this function using the path
// domain/.netlify/functions/1-hello
//later we will do an redirect to get rid of that
//stop and restart the server always after you add a function
//npm run netlify
// note in the node ecosystem we use this exports.handler syntax
// or expects to see the key word handler
// notice we have an async without await, but we must return a promise with the two elements

//the event argument has a lot of info about the incomming request
//the context argument tells the context of where the function is running
// you can use netlify identity package and use context there to get info about the user - wont be using it here
//you can only pass strings in the body, thus if you create an object just JSON.stringafy(person)
//const person = { name: "lester" }

exports.handler = async (event, context, callback) => {
  //callback(null, { statusCode: 200, body: "hello world" })
  //console.log(event)
  return {
    statusCode: 200,
    //body: JSON.stringify(person),
    body: "Our First Netlify Function Example 2",
  }
}
