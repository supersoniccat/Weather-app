//Set current Time & date

let now = new Date();
let currentdate = document.querySelector("#current-date");

let date = now.getDate();
let year = now.getFullYear();
let hour = now.getHours();
let min = now.getMinutes();
let week = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let weekday = week[now.getDay()];

let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
let month = months[now.getMonth()];
currentdate.innerHTML = `<strong>${weekday}, ${hour}:${min}</strong><br/> ${date} of  ${month} ${year} `;

//set city & temperature

function showcityWeather(response) {
  let cityElement = document.querySelector("#city");
  let temperatureElement = document.querySelector("#current-temp");
  let iconElement = document.querySelector("#weather-icon");
  let descriptionElement = document.querySelector("#description");

  cityElement.innerHTML = response.data.name;
  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  descriptionElement.innerHTML = response.data.weather[0].description;
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
}

function search(city) {
  let apiKey = "630a779b896cbbb265d0e5f66fda7b06";
  let citySearchUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  axios.get(citySearchUrl).then(showcityWeather);
}
function findCity(event) {
  event.preventDefault();
  let city = document.querySelector("#city-search-input").value;
  search(city);
}

let form = document.querySelector("#search-city-bar");
form.addEventListener("submit", findCity);

search("Aveiro");

// get local temperature

function localWeather(response) {
  let place = document.querySelector("#city");
  place.innerHTML = `${response.data.name}`;
  showcityWeather(response);
}

function getPosition(position) {
  let lat = position.coords.latitude;
  let long = position.coords.longitude;
  let apiKey = "630a779b896cbbb265d0e5f66fda7b06";
  let urlcords = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}&units=metric`;
  axios.get(urlcords).then(localWeather);
}

function setCurrentLocal() {
  navigator.geolocation.getCurrentPosition(getPosition);
}

let button = document.querySelector("#local-temperature");
button.addEventListener("click", setCurrentLocal);

//change temperature units

function changeToFar(event) {
  event.preventDefault();
  var celsius = 18;
  var fahrenheit = Math.round((celsius * 9) / 5 + 32);
  let FarTemp = document.querySelector("#current-temp");
  FarTemp.innerHTML = `${fahrenheit}`;
}

let TFar = document.querySelector("#far-btn");
TFar.addEventListener("click", changeToFar);

function changeToCelcius(event) {
  event.preventDefault();
  var celsius = 18;
  let CelsiusTemp = document.querySelector("#current-temp");
  CelsiusTemp.innerHTML = `${celsius}`;
}

let TCel = document.querySelector("#celsius-btn");
TCel.addEventListener("click", changeToCelcius);
