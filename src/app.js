// Date-Display
let now = new Date();

let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday" ];
let weekDay = days[now.getDay()];
let day = now.getDate();
let months = ["Jan.", "Feb.", "Mar.", "Apr.", "May", "Jun.", "Jul.", "Aug.", "Sept.", "Oct.", "Nov.", "Dec."];
let currentMonth = months[now.getMonth()];
let hours = now.getHours();
let minutes = now.getMinutes();
let year = now.getFullYear();

let currentDate = document.querySelector("#current-date");
currentDate.innerHTML = weekDay + ", " + day + "." + currentMonth + " " + year + ", " + hours + "." + minutes;

let currentDay = document.querySelector("#current-day");
currentDay.innerHTML = weekDay;

// Search engine api + calls

function search(event) {
event.preventDefault();
let apiKey = "bfc01845a820d4f79bd680fec76e9289";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
let city = document.querySelector("#city-search-input").value;
axios.get(apiUrl).then(showWeather);
};


function showWeather(response) {
//city api call into html doc
  document.querySelector("#weather-city").innerHTML = response.data.name;
  
// temperature api call into html doc
  document.querySelector("#current-degrees").innerHTML = Math.round(response.data.main.temp);
  
  }

// search engine:
let form = document.querySelector("form");
form.addEventListener("submit", search);


 










