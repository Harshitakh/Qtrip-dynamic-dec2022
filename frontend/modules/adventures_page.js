import config from "../conf/index.js";

//Implementation to extract city from query params
function getCityFromURL(search) {
  // TODO: MODULE_ADVENTURES
  // 1. Extract the city id from the URL's Query Param and return it
  let params = new URLSearchParams(search);
  return params.get("city");
}

//Implementation of fetch call with a paramterized input based on city
async function fetchAdventures(city) {
  // TODO: MODULE_ADVENTURES
  // 1. Fetch adventures using the Backend API and return the data
  // console.log({ city });
  try {
    let res = await fetch(config.backendEndpoint + `/adventures?city=${city}`);
    const adventures = await res.json();
    // console.log({ adventures });
    return adventures;
  } catch (error) {
    return null;
  }
}

//Implementation of DOM manipulation to add adventures for the given city from list of adventures
function addAdventureToDOM(adventures) {
  // TODO: MODULE_ADVENTURES
  // 1. Populate the Adventure Cards and insert those details into the DOM
  // console.log({ adventures });
  adventures.forEach((adventure) => {
    // console.log({ adventure });
    var parent = document.getElementById("data");
    var child = document.createElement("div");
    child.className = "col-6 col-lg-3 mb-4 position-relative";
    child.innerHTML = `<a href= "detail/?adventure=${adventure.id}" id=${adventure.id}>
    <div class="category-banner">${adventure.category}</div>
    <div class="activity-card">
    <img class="img-responsive" src="${adventure.image}" alt="..." />
    <div class="activity-card-text text-md-center w-100 mt-3">
    <div class= "d-block d-md-flex justify-content-between flex-wrap ps-3 pe-3">
    <h5 class="text-left">${adventure.name}</h5>
    <p>₹${adventure.costPerHead}</p>
    </div>
    <div class= "d-block d-md-flex justify-content-between flex-wrap ps-3 pe-3">
    <h5 class="text-left">Duration</h5>
    <p>${adventure.duration} Hours</p>
    </div>
    </div>
    </div>
    </a>`;
    parent.appendChild(child);
  });
}

//Implementation of filtering by duration which takes in a list of adventures, the lower bound and upper bound of duration and returns a filtered list of adventures.
function filterByDuration(list, low, high) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on Duration and return filtered list
  const filteredByDuration = list.filter(
    (adventure) => adventure.duration >= low && adventure.duration <= high
  );
  return filteredByDuration;
}

//Implementation of filtering by category which takes in a list of adventures, list of categories to be filtered upon and returns a filtered list of adventures.
function filterByCategory(list, categoryList) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on their Category and return filtered list
  const filteredByCategory = list.filter((adventure) =>
    categoryList.includes(adventure.category)
  );
  // console.log({ list, categoryList, filteredByCategory });
  return filteredByCategory;
}

// filters object looks like this filters = { duration: "", category: [] };

//Implementation of combined filter function that covers the following cases :
// 1. Filter by duration only
// 2. Filter by category only
// 3. Filter by duration and category together

function filterFunction(list, filters) {
  // TODO: MODULE_FILTERS
  // 1. Handle the 3 cases detailed in the comments above and return the filtered list of adventures
  // 2. Depending on which filters are needed, invoke the filterByDuration() and/or filterByCategory() methods

  // Place holder for functionality to work in the Stubs
  if (filters.duration && filters.category.length) {
    const low = filters.duration.split("-")[0];
    const high = filters.duration.split("-")[1];
    const filteredByCategory = filterByCategory(list, filters.category);
    const filteredByCategoryAndDuration = filterByDuration(
      filteredByCategory,
      low,
      high
    );
    return filteredByCategoryAndDuration;
  } else if (filters.duration) {
    const low = filters.duration.split("-")[0];
    const high = filters.duration.split("-")[1];
    return filterByDuration(list, low, high);
  } else if (filters.category.length) {
    return filterByCategory(list, filters.category);
  } else {
    return list;
  }
}

//Implementation of localStorage API to save filters to local storage. This should get called everytime an onChange() happens in either of filter dropdowns
function saveFiltersToLocalStorage(filters) {
  // TODO: MODULE_FILTERS
  // 1. Store the filters as a String to localStorage
  window.localStorage.setItem("filters", JSON.stringify(filters));
  return true;
}

//Implementation of localStorage API to get filters from local storage. This should get called whenever the DOM is loaded.
function getFiltersFromLocalStorage() {
  // TODO: MODULE_FILTERS
  // 1. Get the filters from localStorage and return String read as an object

  // Place holder for functionality to work in the Stubs
  const filterString = window.localStorage.getItem("filters");
  return JSON.parse(filterString);
}

//Implementation of DOM manipulation to add the following filters to DOM :
// 1. Update duration filter with correct value
// 2. Update the category pills on the DOM

function generateFilterPillsAndUpdateDOM(filters) {
  // TODO: MODULE_FILTERS
  // 1. Use the filters given as input, update the Duration Filter value and Generate Category Pills
  if (filters.category.length) {
    const parent = document.getElementById("category-list");
    filters.category.forEach((filter) => {
      const child = document.createElement("div");
      child.className = "category-filter";
      child.innerHTML = filter;
      parent.appendChild(child);
    });
  }
}
export {
  getCityFromURL,
  fetchAdventures,
  addAdventureToDOM,
  filterByDuration,
  filterByCategory,
  filterFunction,
  saveFiltersToLocalStorage,
  getFiltersFromLocalStorage,
  generateFilterPillsAndUpdateDOM,
};
