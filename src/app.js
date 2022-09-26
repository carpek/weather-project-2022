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



let form = document.querySelector("#form");
form.addEventListener("submit", handleSubmit);



function showPosition(position) {
let lat = position.coord.lat;
let lon = position.coord.lon;

let apiKey = "bfc01845a820d4f79bd680fec76e9289";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
axios.get(apiUrl).then(showWeather);
}

navigator.geolocation.getCurrentPosition(showPosition);

//Weather

let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

function forecast() {

let forecastElement = document.querySelector("#forecast");
let forecastHtml = `
<div class="row" >
    <h5>This weeks preview</h5>`;


let days = [ "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
days.forEach(function (day) {
  forecastHtml = forecastHtml + ` 
<div class="col-sm">
        <div class="card iconWeather">
        <div class="card-body">
                   
        <p class="weatherForecast">
        <i class="fa-solid fa-cloud-rain"></i>
       
        <p class="card-title">${day}</p>
        <p class="card-text">26°C / 77°F</p>
        </p>
            
        </div>
    </div>       
    </div>`;
}); 
forecastHtml = forecastHtml + `</div>`;

forecastElement.innerHTML = forecastHtml;

}

function showWeather(response) {

let city = document.querySelector("#weather-city");
city.innerHTML = response.data.name;

let temperatureElement = document.querySelector("#current-degrees")
temperatureElement.innerHTML = Math.round(response.data.main.temp);

let weatherElement = document.querySelector("#weatherToday");
weatherElement.innerHTML = response.data.weather[0].description;

let iconElement = document.querySelector("#iconToday");
iconElement.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);

let humidityElement = document.querySelector("#humidity");
humidityElement.innerHTML = response.data.main.humidity;

let windElement = document.querySelector("#windSpeed");
windElement.innerHTML = Math.round(response.data.wind.speed);

let realTempElement = document.querySelector("#realFeel");
realTempElement.innerHTML = Math.round(response.data.main.feels_like);

let sunriseElement = document.querySelector("sunrise");
sunriseElement.innerHTML = response.data.sys.sunrise * 1000;

let sunsetElement = document.querySelector("sunset");
sunsetElement.innerHTML = response.data.sys.sunset * 1000;

let celsiusTemperature = document.querySelector("#current-degrees");
celsiusTemperature.innerHTML = response.data.main.temp;
  
let minCelsius = document.querySelector("#min-temp");
minCelsius.innerHTML = Math.round(response.data.main.temp_min);

let maxCelsius = document.querySelector("#max-temp");
maxCelsius.innerHTML = Math.round(response.data.main.temp_max);

}
  
  axios.get(apiUrl).then(showWeather);
// Date-Display

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

}



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

search("Vienna");