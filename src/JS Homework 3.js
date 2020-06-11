let weather = {
  paris: {
    temp: 19.7,
    humid: 80,
  },
  tokyo: {
    temp: 17.3,
    humid: 50,
  },
  lisbon: {
    temp: 30.2,
    humid: 20,
  },
  "san francisco": {
    temp: 20.9,
    humid: 100,
  },
  moscow: {
    temp: -5,
    humid: 20,
  },
};

let city = prompt("Enter a city 👇");
city = city.toLowerCase();

if (weather[city] !== undefined) {
  let temperature = weather[city].temp;
  let celciusTemp = Math.round(temperature);
  let farTemp = Math.round((celciusTemp * 9) / 5 + 32);
  let humidity = weather[city].humid;

  alert(
    `It is currently ${celciusTemp}ºC (${farTemp}ºF) in ${city} with ${humidity}% humidity!`
  );
} else {
  alert(
    `Sorry, we know the weather for this city, try going to https://www.google.com/search?q=weather+${city}`
  );
}
