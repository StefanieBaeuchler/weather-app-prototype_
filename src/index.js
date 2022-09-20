let currentDate = document.querySelector("#date");
let now = new Date();
let day = now.getDay();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let month = now.getMonth();
let months = [
  "JAN",
  "FEB",
  "MARCH",
  "APR",
  "MAI",
  "JUNE",
  "JULY",
  "AUG",
  "SEP",
  "OCT",
  "NOV",
  "DEC",
];

date = now.getDate();

currentDate.innerHTML = `${days[day]} ${months[month]} ${date}`;

let currentTime = document.querySelector("#time");
let hours = now.getHours();
let minutes = now.getMinutes();
if (hours < 10) {
  hours = `0${hours}`;
}
if (minutes < 10) {
  minutes = `0${minutes}`;
}
currentTime.innerHTML = `${hours}:${minutes}`;

function showTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  let temperatureElement = document.querySelector("#temp");
  temperatureElement.innerHTML = ` ${temperature}°C`;
}

function search(event) {
  event.preventDefault();
  let cityElement = document.querySelector("#city");
  let city = document.querySelector("#enter-city");
  cityElement.innerHTML = city.value;
  let apiKey = "c95d60a1e3adbeb286133f1ebebc2579";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showTemperature);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", search);

function showWeatherConditions(response) {
  let city = response.data.name;
  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = `${city}`;
  let temperature = Math.round(response.data.main.temp);
  let temperatureElement = document.querySelector("#temp");
  temperatureElement.innerHTML = ` ${temperature}°C`;
}

function showPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;

  let apiKey = "c95d60a1e3adbeb286133f1ebebc2579";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showWeatherConditions);
}

function getCurrentPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}

let button = document.querySelector("button");
button.addEventListener("click", getCurrentPosition);
