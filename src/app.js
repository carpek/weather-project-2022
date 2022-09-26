//search

function search(city) {
  let apiKey = "bfc01845a820d4f79bd680fec76e9289";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather);
}

function handleSubmit(event) {
  event.preventDefault();
let cityInputElement = document.querySelector("#input-city");
search(cityInputElement.value);

}



// Current Position
function showPosition(position) {
let lat = position.coord.lat;
let lon = position.coord.lon;

let apiKey = "bfc01845a820d4f79bd680fec76e9289";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
axios.get(apiUrl).then(showWeather);
}

navigator.geolocation.getCurrentPosition(showPosition);

// Weather Display
// Current Weather

function showWeather(response) {

let city = document.querySelector("#weather-city");

let temperatureElement = document.querySelector("#current-degrees")
let weatherElement = document.querySelector("#weatherToday");
let iconElement = document.querySelector("#iconToday");

let humidityElement = document.querySelector("#humidity");
let windElement = document.querySelector("#windSpeed");
let realTempElement = document.querySelector("#realFeel");
let sunriseElement = document.querySelector("#sunrise");
let sunsetElement = document.querySelector("#sunset");
let minCelsius = document.querySelector("#min-temp");
let maxCelsius = document.querySelector("#max-temp");
let dateElement = document.querySelector("#current-date");

celciusTemp = Math.round(response.data.main.temp);

city.innerHTML = response.data.name;
temperatureElement.innerHTML = Math.round(response.data.main.temp);
weatherElement.innerHTML = response.data.weather[0].description;
iconElement.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
iconElement.setAttribute("alt", `http://openweathermap.org/img/wn/${response.data.weather[0].description}@2x.png`);
humidityElement.innerHTML = response.data.main.humidity;
windElement.innerHTML = Math.round(response.data.wind.speed);
realTempElement.innerHTML = Math.round(response.data.main.feels_like);
sunriseElement.innerHTML = response.data.sys.sunrise * 1000;
sunsetElement.innerHTML = response.data.sys.sunset * 1000;
minCelsius.innerHTML = Math.round(response.data.main.temp_min);
maxCelsius.innerHTML = Math.round(response.data.main.temp_max);
dateElement.innerHTML = formateDate(response.data.dt * 1000);

function getForecast(response.data.coord);

}

let apiKey = "bfc01845a820d4f79bd680fec76e9289";  
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
axios.get(apiUrl).then(showWeather);

//Weather Forecast

function forecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  
  let forecastHtml = `<div class="row" >
      <h5>This weeks preview</h5>`;
  
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
    forecastHtml = forecastHtml + ` 
      <div class="col-sm">
          <div class="card iconWeather">
          <div class="card-body">
          <p class="card-title">${formatDay(forecastDay.dt)}</p>
  
          <p class="weatherForecast">
          <img src="http://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png" alt="" width="40" />
          </p>
          <p class="card-text">${Math.round(forecastDay.temp.max)}°C / ${Math.round(forecastDay.temp.min)} °C</p>
         
          </div>
          </div>       
      </div>`;
    }
  }); 
  forecastHtml = forecastHtml + `</div>`;
  
  forecastElement.innerHTML = forecastHtml;
  
  }

  function getForecast(coordinates) {
    let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
    let apiKey = "bfc01845a820d4f79bd680fec76e9289";
  axios.get(apiUrl).then(forecast); 
  }

// Date-Display
// Forcast-Days
function formatDay(timestamp) {
let date = new Date(timestamp * 1000);
let day = date.getDay();
let days = let days = [
  "Sun",
  "Mon",
  "Tues",
  "Wed",
  "Thu",
  "Fri",
  "Sat"
];

return day[days];
}

// Current weather day and time
function formateDate(timestamp)  {
 
let now = new Date(timestamp);

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
  "Sep.",
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

return `${weekDay}, ${day} ${months} ${hours}:${minutes} ${year}`;

}

// Celcius - Fahrenheit Calculation

function fahrenheitCalculation(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#current-degrees");
  let fahrenheitTemp = (celciusTemp * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemp);
   
}

let celciusTemp = null;

let fahrenheitTemperature = document.querySelector("#fahrenheit-link");
fahrenheitTemperature.addEventListener("click", fahrenheitCalculation);

let form = document.querySelector("#form");
form.addEventListener("submit", handleSubmit);

search("Vienna");
