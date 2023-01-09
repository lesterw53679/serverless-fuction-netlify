const { default: axios } = require("axios")

const result = document.querySelector(".result")

const fetchData = async () => {
  //console.log("inside fetch our data")
  // put curly braces around {data}  to return only what you want "structure it"

  try {
    const { data } = await axios.get("/api/1-hello")
    //console.log(data)
    result.textContent = data
  } catch (error) {
    console.log(error.response.data) // tricky this is axios thing more useful error response, if you put a .data on the end it will only return part of the response object
    result.textContent = error.response.data
  }
}

fetchData()
