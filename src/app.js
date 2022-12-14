// Date-Display
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
  
  return `${weekDay}, ${day} ${currentMonth} ${hours}:${minutes} ${year}`;
  
  }

  // Forcast-Days
  function formatDay(timestamp) {
    let date = new Date(timestamp * 1000);
    let day = date.getDay();
    let days = [
      "Sun",
      "Mon",
      "Tue",
      "Wed",
      "Thu",
      "Fri",
      "Sat"
    ];
    
    return day[days];
    }
// Weather Display
  //  Weather Forecast

function forecast(response) {
  let forecast = response.data.daily;
  
  let forecastElement = document.querySelector(`#forecast`);

  let forecastHTML = `<div class="row">`;
  
  forecast.forEach(function (forecastDay, index) {
  if (index > 0 && index < 6) {
    forecastHTML 
    = forecastHTML + 
  `<div class="col-sm">
      <div class="card-body">
        <div class="card text-center">${formatDay(forecastDay.dt)}
          <div class="card-body">
            <img 
            src="http://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png" 
            alt="forecast-icon" 
            width="40%" 
            id="forecast-icon" />
          <p class="card-text weather-temp"> <span id="forecast-max-temp"> ${Math.round(forecastDay.temp.max)}°C </span> / 
          <span id="forecast-min-temp"> ${Math.round(forecastDay.temp.min)} °C </span>
          </p>
          </div> 
          </div>
      </div>       
    </div>`;
    }
  }); 
  forecastHTML = forecastHTML + `</div>`; 
  forecastElement.innerHTML = forecastHTML;
  
  }

  function getForecast(coordinates) {
    let apiKey = "bfc01845a820d4f79bd680fec76e9289";
    let apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(forecast); 
  }

// Sunshine
function formateSun(timestamp)  {
  let now = new Date(timestamp);

  let hours = now.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${hours}:${minutes}`;

}

// Current Weather
  function showWeather(response) {

    let temperatureElement = document.querySelector("#current-degrees");
    let city = document.querySelector("#weather-city");
    let weatherElement = document.querySelector("#weatherToday");
    let iconElement = document.querySelector("#iconToday");
    
    let humidityElement = document.querySelector("#humidity");
    let windElement = document.querySelector("#windSpeed");
    let realTempElement = document.querySelector("#realFeel");
    let sunriseElement = document.querySelector("#sunrise");
    let sunsetElement = document.querySelector("#sunset");
    let minCelsiusElement = document.querySelector("#min-temp");
    let maxCelsiusElement = document.querySelector("#max-temp");
    let dateElement = document.querySelector("#current-date");
    
    celciusTemp = response.data.main.temp;
    
    temperatureElement.innerHTML = Math.round(response.data.main.temp);
    city.innerHTML = response.data.name;
    weatherElement.innerHTML = response.data.weather[0].description;
   
    iconElement.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
    iconElement.setAttribute("alt", `http://openweathermap.org/img/wn/${response.data.weather[0].description}@2x.png`);
    
    humidityElement.innerHTML = response.data.main.humidity;
    windElement.innerHTML = Math.round(response.data.wind.speed);
    realTempElement.innerHTML = Math.round(response.data.main.feels_like);
    sunriseElement.innerHTML = formateSun(response.data.sys.sunrise * 1000);
    sunsetElement.innerHTML = formateSun(response.data.sys.sunset * 1000);
    minCelsiusElement.innerHTML = Math.round(response.data.main.temp_min);
    maxCelsiusElement.innerHTML = Math.round(response.data.main.temp_max);
    dateElement.innerHTML = formateDate(response.data.dt * 1000);
    
    getForecast(response.data.coord);
    
    }

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

function searchLocation(position) {
let apiKey = "bfc01845a820d4f79bd680fec76e9289";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather);
}

function currentPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
  }

// Celcius - Fahrenheit Calculation

function fahrenheitCalculation(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#current-degrees");
  let fahrenheitTemp = (celciusTemp * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemp);
}

function celciusCalculation(event) {
event.preventDefault();
let temperatureElement = document.querySelector("#current-degrees");
temperatureElement.innerHTML = Math.round(celciusTemp);
}

let celciusTemp = null;

let fahrenheitTemperature = document.querySelector("#fahrenheit-link");
fahrenheitTemperature.addEventListener("click", fahrenheitCalculation);

let celciusTemperature = document.querySelector("#celcius-link");
celciusTemperature.addEventListener("click", celciusCalculation);


let form = document.querySelector("#form");
form.addEventListener("submit", handleSubmit);

let locationButton = document.querySelector("#current-location");
locationButton.addEventListener("click", currentPosition);

navigator.geolocation.getCurrentPosition(currentPosition);

search("Vienna");
