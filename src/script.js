let date = new Date();
let currentdate = document.querySelector("#current-date");
let currenttime = document.querySelector("#current-hours");

let day = date.getDate();
let week = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
let weekday = week[date.getDay()];
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
let month = months[date.getMonth()];

let hours = date.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = date.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
currentdate.innerHTML = `${weekday}, ${month} ${day}`;
currenttime.innerHTML = `${hours}:${minutes}`;

function displayWeather(response) {
  let cityElement = document.querySelector("#city");
  let temperatureElement = document.querySelector("#current-temp");
  let iconElement = document.querySelector("#weather-icon");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");

  celsiusTemperature = Math.round(response.data.main.temp);

  cityElement.innerHTML = response.data.name;
  temperatureElement.innerHTML = celsiusTemperature;
  descriptionElement.innerHTML = response.data.weather[0].description;
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
}
function formatHours(timestamp) {
  let time = new Date(timestamp);
  let hour = time.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  let min = time.getMinutes();
  if (min < 10) {
    min = `0${min}`;
  }
  return `${hour}:${min}`;
}

function displayForecast(response) {
  console.log(response.data);
  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = null;
  let forecast = null;

  for (let index = 0; index < 5; index++) {
    forecast = response.data.list[index];
    forecastElement.innerHTML += `
  <div class="col-2 hourforecast">
              <div id="hour-forecast">
                ${formatHours(forecast.dt * 1000)}
              </div>
              <img
                src="http://openweathermap.org/img/wn/${
                  forecast.weather[0].icon
                }@2x.png"
                width="50px;"
                id="forecast-icon"/>
              <div id="forecast-temp">
                <span class="max-temp">${Math.round(
                  forecast.main.temp_max
                )}</span>º | <span class="min-temp">${Math.round(
      forecast.main.temp_min
    )}º</span>
              </div>
            </div>`;
  }
}
function search(city) {
  let apiKey = "630a779b896cbbb265d0e5f66fda7b06";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(displayWeather);

  let apiUrl2 = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl2).then(displayForecast);
}
function findCity(event) {
  event.preventDefault();
  let city = document.querySelector("#city-search-input").value;
  search(city);
}

let form = document.querySelector("#search-city-bar");
form.addEventListener("submit", findCity);

search("Aveiro");

function localWeather(response) {
  let place = document.querySelector("#city");
  place.innerHTML = `${response.data.name}`;
  displayWeather(response);
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

function changeToFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#current-temp");
  let fahrTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrTemperature);
}

let fahrenheitLink = document.querySelector("#far-btn");
fahrenheitLink.addEventListener("click", changeToFahrenheit);

function changeToCelcius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#current-temp");
  temperatureElement.innerHTML = celsiusTemperature;
}

let celsiusLink = document.querySelector("#celsius-btn");
celsiusLink.addEventListener("click", changeToCelcius);
