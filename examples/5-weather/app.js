// it takes few minutes

const form = document.querySelector(".form")
const input = document.querySelector(".form-input")
const alert = document.querySelector(".alert")
const result = document.querySelector(".result")
alert.style.display = "none"

// we can add an event listener on the form using the event object
// but notice we use event.preventDefault() function to
// stop the page for a full submission which is the default

form.addEventListener("submit", (event) => {
  event.preventDefault()
  const city = input.value

  if (city) {
    getWeatherData(city)
  }
  //console.log(city)
})

async function getWeatherData(city) {
  alert.style.display = "none"
  //this is where we will make a post request to our weather api
  try {
    const { data } = await axios.post("/api/5-weather", { city })
    //console.log(data)
    //lets descructure the data and grab what we need
    const { name } = data
    const { country } = data.sys
    const { temp_max: max, temp_min: min, feels_like } = data.main
    //notice the syntax above 'temp_max: max'  this is telling to use the alias 'max' for that param
    const { description } = data.weather[0]

    result.innerHTML = `
<article class="card">
<h3>${name}, ${country}</h3>
<p>${description}</p>
<p> min temp : ${min}&#8457</p>
<p> max temp : ${max}&#8457</p>
<p> feels like : ${feels_like}&#8457</p>

</article>`
  } catch (error) {
    alert.style.display = "block"
    alert.textContent = `Cannot find weather data for city : " ${city}"`
    //console.log(error.response) //the error.response is an axios property
  }
}
