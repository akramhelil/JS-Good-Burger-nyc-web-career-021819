document.addEventListener("DOMContentLoaded", () => {
  let burgers;
  //Implement Your Code Here
  const burgerMenu = document.querySelector("#burger-menu");
  const orderList = document.querySelector("#order-list");
  const customBurger = document.querySelector("#custom-burger");

  fetch("http://localhost:3000/burgers", { method: "GET" })
    .then(res => res.json())
    .then(burgJson => {
      burgers = burgJson;
      burgers.forEach(burger => {
        renderSingleBurger(burger);
      });
      //end of the for each
    }); //end of the fetch.then

  burgerMenu.addEventListener("click", ev => {
    const burgerId = parseInt(ev.target.dataset.id);
    const addedBurger = burgers.find(burger => burger.id === burgerId);
    if (ev.target.dataset.action === "add") {
      orderList.innerHTML += `<li>${addedBurger.name}</li>`;
    } //end of the if statment
  });

  document.addEventListener("submit", ev => {
    ev.preventDefault();
    const name = document.querySelector("#burger-name").value;
    const image = document.querySelector("#burger-image").value;
    const description = document.querySelector("#burger-description").value;

    fetch("http://localhost:3000/burgers", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: name,
        description: description,
        image: image
      })
    })
      .then(re => re.json())
      .then(burger => renderSingleBurger(burger));
      
      burgers.push(burger);

      document.querySelector("#burger-name").value = ''
      document.querySelector("#burger-image").value = ''
      document.querySelector("#burger-description").value = ''
  });

  function renderSingleBurger(burger) {
    return burgerMenu.innerHTML += `
      <div id="burg-${burger.id}"class="burger">
      <h3 class="burger_title">${burger.name}</h3>
      <img src="${burger.image}">
      <p class="burger_description">${burger.description}</p>
        <button data-id="${
          burger.id
        }" data-action="add" class="button">Add to Order</button>
        </div>
        `}

  //end of the vurger event listner
}); // end of the EVENT CONTENT DownLOAD
