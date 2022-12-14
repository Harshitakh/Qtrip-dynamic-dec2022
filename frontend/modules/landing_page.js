import config from "../conf/index.js";

async function init() {
  //Fetches list of all cities along with their images and description
  let cities = await fetchCities();
  //Updates the DOM with the cities
  if (cities) {
    cities.forEach((key) => {
      addCityToDOM(key.id, key.city, key.description, key.image);
    });
  }
}
//Implementation of fetch call
async function fetchCities() {
  // TODO: MODULE_CITIES
  // 1. Fetch cities using the Backend API and return the data
  try {
    let res = await fetch(config.backendEndpoint + "/cities");
    var cities = await res.json();
    return cities;
  } catch (error) {
    return null;
  }
}

//Implementation of DOM manipulation to add cities
function addCityToDOM(id, city, description, image) {
  // TODO: MODULE_CITIES
  // 1. Populate the City details and insert those details into the DOM
  // let container = document.createElement("div");
  // container.className="FILL OUT BOOTSTRAP CLASSES";
  // let innerHTML = "<p>Examples</p>"
  // container.innerHTML = innerHTML;
  // document.getElementById("data").appendChild(container);
  var parent = document.getElementById("data");
  var child = document.createElement("div");
  child.className = "col-6 col-lg-3 mb-3";
  child.innerHTML = `<a href= "pages/adventures/?city=${id}" id="${id}"> <div class="tile"> <div class="tile-text text-center"> <h5>${city}</h5> <p>${description}</p> </div> <img class="img-responsive" src="${image}" /></div> </a> `;
  parent.appendChild(child);
}

export { init, fetchCities, addCityToDOM };
