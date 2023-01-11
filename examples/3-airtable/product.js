const result = document.querySelector(".result")

const fetchProduct = async () => {
  result.innerHTML = `<h2>loading ...</h2>`
  try {
    //hell of a trick below, how do we get the id
    //const id = `?id=1`
    const id = window.location.search
    //since data is an object lets destructure it and get the fields
    //the following two lines gets it
    // const {
    //   data: { fields },
    // } = await axios.get(`/api/3-product${id}`)

    const {
      data: { fields },
    } = await axios.get(`/api/3-z-complete${id}`)

    const { name, desc, price, image } = fields
    //setup a template string
    result.innerHTML = `<h1 class="title">${name}</h1>
  <article class="product">
    <img class="product-img"
    src="${image[0].url}"
    alt="${name}"
    />
    <div class="product-info">
      <h5 class="title">${name}</h5>
      <h5 class="price">${price}</h5>
      <p class="desc">${desc}</p>
    </div>
  </article>
  `
    //above is a template string we will use to display
  } catch (error) {
    result.innerHTML = `<h2>${error.response.data}</h2>`
  }
}

fetchProduct()
