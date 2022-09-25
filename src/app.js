function enterCity(event) {
  event.preventDefault();
  let h1 = document.querySelector("#weather-city");
  let input = document.querySelector("#example-input-city");
  h1.innerHTML = input.value;
}

let apiKey = "bfc01845a820d4f79bd680fec76e9289";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=Vienna&appid=${apiKey}&units=metric`;

//Weather

function showWeather(response) {
let city = document.querySelector("#weather-city");
city.innerHTML = response.data.name;

let temperatureElement = document.querySelector("#current-degrees")
temperatureElement.innerHTML = Math.round(response.data.main.temp);

let weatherElement = document.querySelector("#weatherToday");
weatherElement.innerHTML = response.data.weather[0].description;

let humidityElement = document.querySelector("#humidity");
humidityElement.innerHTML = response.data.main.humidity;

let windElement = document.querySelector("#windSpeed");
windElement = response.data.wind.speed;

let realTempElement = document.querySelector("#realFeel");
realTempElement = response.data.main.feels_like;

}
  
  axios.get(apiUrl).then(showWeather);
// Date-Display
let now = new Date();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
let weekDay = days[now.getDay()];
let day = now.getDate();
let months = [
  "Jan.",
  "Feb.",
  "Mar.",
  "Apr.",
  "May",
  "Jun.",
  "Jul.",
  "Aug.",
  "Sept.",
  "Oct.",
  "Nov.",
  "Dec."
];
let currentMonth = months[now.getMonth()];
let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

let year = now.getFullYear();

let currentDate = document.querySelector("#current-date");
currentDate.innerHTML =
  weekDay +
  ", " +
  day +
  "." +
  currentMonth +
  " " +
  year +
  ", " +
  hours +
  "." +
  minutes;

let form = document.querySelector("form");
form.addEventListener("submit", enterCity);

// Celcius - Fahrenheit Calculation

function fahrenheitCalculation(event) {
  event.preventDefault();
  let currentTemperature = document.querySelector("#current-degrees");
  let temperature = currentTemperature.innerHTML;
  temperature = Number(temperature);
  currentTemperature.innerHTML = Math.round((temperature * 9) / 5 + 32);
}

let fahrenheitTemperature = document.querySelector("#fahrenheit-link");
fahrenheitTemperature.addEventListener("click", fahrenheitCalculation);