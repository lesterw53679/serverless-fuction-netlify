const title = document.querySelector(".title h2")
const result = document.querySelector(".result")

const fetchData = async () => {
  try {
    const { data } = await axios.get("/api/4-survey")
    //now iterate over the array
    const response = data
      .map((vote) => {
        const { room, votes, id } = vote
        return `<li>
<div class="key">${room.toUpperCase().substring(0, 2)}</div>
<div>
<h4>${room}</h4>
<p class="vote-${id}" data-votes="${votes}">${votes}</p>
</div>
<button data-id="${id}">
<i class="fas fa-vote-yea"></i>
</button>
</li>`
      })
      .join("")
    result.innerHTML = response
  } catch (error) {
    result.innerHTML = `<h4>There was an error</h4>`
  }
}

//add a page load event and use the callback fuction to fetch the data onload

window.addEventListener("load", () => {
  fetchData()
})

result.addEventListener("click", async function (e) {
  if (e.target.classList.contains("fa-vote-yea")) {
    const btn = e.target.parentElement
    const id = btn.dataset.id
    //above is confusing but the font-awsome element is inside
    //the parent button which stores our unique id
    //call the dataset dot and then the name of the id
    //as in <button data-id=....
    const voteNode = result.querySelector(`.vote-${id}`)
    const votes = voteNode.dataset.votes
    const newVotes = await modifyData(id, votes)
    title.textContent = "Survey"
    if (newVotes) {
      voteNode.textContent = `${newVotes} votes`
      voteNode.dataset.votes = newVotes
    }
  }
  //console.log(e.target)
})

//modify data
async function modifyData(id, votes) {
  title.textContent = "Loading..."
  try {
    const { data } = await axios.put(`/api/4-survey`, { id, votes })
    //axios will return this data oject with the incremented vote count
    const newVotes = data.fields.votes
    //now if everything went good return the newVotes object
    return newVotes
  } catch (error) {
    //console.log(error.response.data)
    return null
  }
}
