let addToy = false;


document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
  
});

document.querySelector(".add-toy-form").addEventListener('submit',handleSubmit)
  



function handleSubmit(e){
  e.preventDefault();
  // console.log(e.target.name.value)
  let toyObj ={
    name:e.target.name.value,
    image:e.target.image.value,
    likes: 0
  }
  if(e.target.name.value=== "" | e.target.image.value===""){
    console.log('there is empty input')
  }else{
    renderToy(toyObj);
    AddToy(toyObj);
  }
 
 
}

function renderToy(toyObj){
  let card = document.createElement('div');
  card.className = 'card';
  card.innerHTML=`
    <h2>${toyObj.name}</h2>
    <img src=${toyObj.image} class="toy-avatar">
    <p> ${toyObj.likes} Likes</p>
    <button class="like-btn" id=${toyObj.id}>Like ❤️</button>
  `
  card.querySelector('.like-btn').addEventListener('click',()=>{
    toyObj.likes += 1;
    card.querySelector('p').textContent = `${toyObj.likes} Likes`;
    updateLikes(toyObj)
  })
  document.querySelector("#toy-collection").appendChild(card)
  
}

function AddToy(ToyObj){
  fetch("http://localhost:3000/toys",{
    method:"POST",
    headers:{
      "Content-Type":"application/json",
      Accept:"application/json"
    },
    body: JSON.stringify(ToyObj)
  })
  .then(res=>res.json())
  .then(toy=> console.log(toy))
  .catch(error=>console.log(error.message))
  
}


function updateLikes(toyObj){
  fetch(`http://localhost:3000/toys/${toyObj.id}`,{
    method: "PATCH",
    headers:{
      "Content-Type":"application/json",
      Accept:"application/json"
    },
    body: JSON.stringify(toyObj)
  })
}




function getAllToys(){
  fetch("http://localhost:3000/toys")
  .then(res => res.json())
  .then(Toys => Toys.forEach(toy => renderToy(toy)))

}
function initialize(){
  getAllToys();
  
}
initialize()