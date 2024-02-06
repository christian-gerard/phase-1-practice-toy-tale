let addToy = false;

document.addEventListener("DOMContentLoaded", () => {

  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  const toyList = document.querySelector('#toy-collection');
  const toyForm = document.querySelector('form');

  const url = 'http://localhost:3000/toys';

  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }

  });

  toyForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const newName = e.target.name.value;
    const newImg = e.target.image.value;
    const newLikes = 0

    const newToy = {
      name: newName,
      image: newImg,
      likes: newLikes
    }

    renderToy(newToy)

    postToy(newToy)

    console.log(newToy)

  })

  const getToys = (url) => {
    return fetch(url)
    .then(resp => resp.json())
    .then((toy) => {
      toy.map((toy) => {
        renderToy(toy)
      })
      
      
    })
  }
  const postToy = (toy) => {

    fetch(url,{
      method: 'POST',
      headers: {
        'Content-Type': "application/json"
      },
      body:JSON.stringify(toy)
    })
    .catch(error => alert(error))
  }
  const patchToy = (toy) => {
    
    fetch(`${url}/${toy.id}`, {
      method: 'PATCH',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(toy)
    })
    .then(resp => resp.json())
    .then(toy => console.log(toy))
  }

  const renderToy = (toy) => {
    const newToy = document.createElement('div')
    const newName = document.createElement('h2')
    const newImg = document.createElement('img')
    const newLikes = document.createElement('p')
    const likeButton = document.createElement('button')
    
    newToy.classList = 'card'
    newName.innerText = toy.name
    newImg.src = toy.image
    newImg.classList = 'toy-avatar'
    newLikes.innerText = toy.likes
    likeButton.innerText = "like"
    likeButton.classList = 'like-btn'
    likeButton.id = toy.id

    likeButton.addEventListener('click', (e) => {
      toy.likes += 1
      newLikes.innerHTML = toy.likes
      patchToy(toy)
    })

    newToy.appendChild(newName)
    newToy.appendChild(newImg)
    newToy.appendChild(newLikes)
    newToy.appendChild(likeButton)

    toyList.appendChild(newToy)

  }



getToys(url)


});
