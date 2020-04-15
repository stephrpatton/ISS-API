const axios = require("axios");
require("babel-polyfill");
const L = require("leaflet");

// URLS
const get_location_url = "http://api.open-notify.org/iss-now.json";
const post_location_url =
  "https://cors-anywhere.herokuapp.com/http://api.open-notify.org/iss-pass.json?lat=52.516045&lon=13.396610";
const get_people_url = "http://api.open-notify.org/astros.json";

// Elements
const numOfPasses = document.querySelector(".num_1");
const numOfPeople = document.querySelector(".num_2");
const getPeopleList = document.querySelector(".people_list");
const showLocationList = document.querySelector(".place_list");
const loader = document.querySelector(".loader");

// create map
const map = L.map("map").setView([0, 0], 3);
const attribution =
  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

const tileUrl = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
const tiles = L.tileLayer(tileUrl, { attribution });
tiles.addTo(map);

const marker = L.marker([0, 0]).addTo(map);

// get data
const getLocation = async () => {
  try {
    return await axios.get(get_location_url);
  } catch (error) {
    console.error(error);
  }
};
// get data
const showPlace = async () => {
  try {
    return await axios.get(post_location_url);
  } catch (error) {
    console.error(error);
  }
};

// get people
const getPeople = async () => {
  try {
    return await axios.get(get_people_url);
  } catch (error) {
    console.error(error);
  }
};

// display data
const showLocation = async () => {
  const location = await getLocation();
  let latitude = location.data.iss_position.latitude;
  let longitude = location.data.iss_position.longitude;

  if (location.data) {
    map.setView([latitude, longitude], map.getZoom());
    marker.setLatLng([latitude, longitude]);
  }
};

// create list of li
const createList = newLi => {
  const list = document.createElement("li");
  list.appendChild(document.createTextNode(newLi));
  console.log(list);
  return list;
};

// show location for specific place
const displayPlaces = async () => {
  const place = await showPlace();
  console.log(place);
  numOfPasses.appendChild(document.createTextNode(place.data.request.passes));
  loader.style.display = "none";
  place.data.response.forEach(d => {
    let date = new Date(d.risetime * 1000);
    showLocationList.appendChild(createList(date));
  });
};

// show people in space
const showPeople = async () => {
  const names = await getPeople();
  numOfPeople.appendChild(document.createTextNode(names.data.number));
  names.data.people.forEach(n => {
    getPeopleList.appendChild(createList(n.name));
  });
};

// run all functions
setInterval(showLocation, 1000);
displayPlaces();
showPeople();
