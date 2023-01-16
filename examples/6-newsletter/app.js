const form = document.querySelector(".form")
const emailInput = document.querySelector(".email-input")
const alert = document.querySelector(".alert")
alert.style.display = "none" //hide alert by default

//add an event listener on the submit button
form.addEventListener("submit", async function (e) {
  e.preventDefault() //invoke the callback function to override the page reload
  form.classList.add("loading")
  //above is using the css to bring up the loading animation
  //look in the .css file for the class
  //also next line added to hide the alert just in case
  alert.style.display = "none"
  const email = emailInput.value
  //ok so now lets connect to our serverless function
  // use axios post method sending the fuction and then
  // the object {email}

  console.log("about to post new subscriber")
  try {
    await axios.post("/api/6-newsletter", { email })
    form.innerHTML = `<h4 class="success">Success please check your email</h4>`
  } catch (error) {
    console.log(error.response)
    alert.style.display = "block"
    alert.textContent = "Something went wrong. Please use valid email address."
    //alert.textContent = error.response.data[0]
  }
  form.classList.remove("loading")
})
