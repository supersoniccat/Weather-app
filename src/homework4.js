//SET Current Time

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

//set city

function changeCity(event) {
  event.preventDefault();
  let localCity = document.querySelector("#city");
  let newcity = document.querySelector("#city-input");
  localCity.innerHTML = newcity.value;
}

let form = document.querySelector("#search-bar");
form.addEventListener("submit", changeCity);

//change temperature units

function changeToFar(event) {
  event.preventDefault();
  var celsius = 18;
  var fahrenheit = Math.round((celsius * 9) / 5 + 32);
  let FarTemp = document.querySelector("#current-temp");
  FarTemp.innerHTML = `${fahrenheit}º`;
}

let TFar = document.querySelector("#far");
TFar.addEventListener("click", changeToFar);

function changeToCelcius(event) {
  event.preventDefault();
  var celsius = 18;
  let CelsiusTemp = document.querySelector("#current-temp");
  CelsiusTemp.innerHTML = `${celsius}º`;
}

let TCel = document.querySelector("#celsius");
TCel.addEventListener("click", changeToCelcius);

// get city current temperature
function showcityTemp(response) {
  let searchTemp = document.querySelector("#current-temp");
  let temperature = response.data.main.temp;
  searchTemp.innerHTML = Math.round(temperature);
}

let cityWeather = document.querySelector("#search-bar");
let apiKey = "630a779b896cbbb265d0e5f66fda7b06";
let city = "Sydney";
let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityWeather}&units=metric&appid=${apiKey}`;

axios.get(url).then(showcityTemp);
