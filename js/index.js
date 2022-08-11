document.addEventListener('DOMContentLoaded', () => {
  const create = document.getElementById('create-monster')
  const container = document.getElementById('monster-container')
  const forward = document.getElementById('forward')
  const back = document.getElementById('back')
  let page = 19
  let innerForm =
`<form id="monster-form">
  <input id="name" placeholder="name">
      <input id="age" placeholder="age">
          <input id="description" placeholder="description">
              <button>Create</button></form>`
  

create.innerHTML += innerForm

fetch('http://localhost:3000/monsters/?_limit=20&_page=1') 
  .then(res => res.json())
  .then(data => data.map(monster => renderMonster(monster)))

const form = document.getElementById('monster-form')
const name = document.getElementById('name')
const age = document.getElementById('age')
const description = document.getElementById('description')

form.addEventListener('submit', (e) => {
  e.preventDefault()
  addMonster(e.target.name.value, e.target.age.value, e.target.description.value)
  })

  function addMonster(name, age, description) {
  fetch('http://localhost:3000/monsters', {
  method: 'POST',
  headers: {
    'Content-type': 'application/json',
    Accept: 'application/json'
  },
  body: JSON.stringify({
      'name': name,
      'age': age,
      'description': description
          })
      })
      .then(res => res.json())
      .then(data => renderMonster(data))
  }
  fetch('http://localhost:3000/monsters/') 
  .then(res => res.json())
  .then(data => console.log(data))

back.addEventListener('click', () => {
    if (page === 1) {
        window.alert('No More!')
    } else {
    page -= 1
    fetch(`http://localhost:3000/monsters/?_limit=50&_page=${page}`)
    .then(res => res.json())
    .then(data => {
        container.innerHTML = `Page ${page}`
        data.map(monster => container.append(renderMonster(monster)))
    })
    }
})
forward.addEventListener('click', () => {
page += 1
  fetch(`http://localhost:3000/monsters/?_limit=50&_page=${page}`)
  .then(res => res.json())
    .then(data => {
        container.innerHTML = `Page ${page}`
        data.map(monster => container.append(renderMonster(monster)))
    })
})

function renderMonster(monster) {
    let newMonster = 
        `<div>
        <h2>${monster.name}</h2>
        <h4>age: ${monster.age}</h4>
        <p>Bio: ${monster.description}</p>
        </div>`
    container.innerHTML += newMonster
 }
})
