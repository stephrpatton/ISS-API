const axios = require("axios");
require("babel-polyfill");
const cors = require("cors");

// URLS
const get_location_url = "http://api.open-notify.org/iss-now.json";
const get_people_url = "http://api.open-notify.org/astros.json";
const post_location_url =
  "http://api.open-notify.org/iss-pass.json?lat=LAT&lon=LON";

// Elements
const location_div = document.querySelector(".current_location");
const getLatitude = document.getElementById("lat");
const getLongitude = document.getElementById("long");
const btn_location = document.querySelector(".current_location-btn");
const getPeopleList = document.querySelector(".people_list");
const form = document.querySelector("form");
// get data
const getLocation = async () => {
  try {
    return await axios.get(get_location_url);
  } catch (error) {
    console.error(error);
  }
};

// post location
const postLocation = async () => {
  try {
    return await axios.post(post_location_url);
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
  if (location.data) {
    let latitude = document.createTextNode(location.data.iss_position.latitude);
    let longitude = document.createTextNode(
      location.data.iss_position.longitude
    );

    btn_location.addEventListener("click", () => {
      location_div.classList.toggle("display_location");
      getLatitude.appendChild(latitude);
      getLongitude.appendChild(longitude);
    });
  } else {
    let load = document.createTextNode("Loading..");
    load.appendChild(getLatitude);
  }
};

// post location to get timestamp
// const giveLocation = form.addEventListener("submit", async e => {
//   e.preventDefault();

//   const latitude = document.querySelector("#latitudeForm");
//   const longitude = document.querySelector("#longitudeForm");
//   const altitude = document.querySelector("#altitudeForm");

//   const data = {
//     lat: latitude,
//     lon: longitude,
//     altitude
//   };
//   console.log(data);
//   postLocation(data).use(cors());
// });

// create list of li for people
const createList = person => {
  const list = document.createElement("li");
  list.appendChild(document.createTextNode(person.name));
  return list;
};

// show people in space
const showPeople = async () => {
  const names = await getPeople();
  console.log(names.data);
  if (Array.isArray(names.data.people) && names.data.people.length > 0) {
    names.data.people.map(name => {
      getPeopleList.appendChild(createList(name));
    });
  }
};

// run all functions
showLocation();
showPeople();
