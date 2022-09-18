let currentTime = new Date();
let hours = currentTime.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = currentTime.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
let timeInCity = `${hours}:${minutes}`;

let timeInside = document.querySelector("#current-time");
timeInside.innerHTML = timeInCity;

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[currentTime.getDay()];

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
let month = months[currentTime.getMonth()];

let currentDate = `${day}, ${month} ${currentTime.getDate()}, ${currentTime.getFullYear()}`;
let dateInside = document.querySelector(".day-today");
dateInside.innerHTML = currentDate;

function changeCityTemp(event) {
  event.preventDefault();
  let apiKey = "287a64521ea9136de147467072dc8ccb";
  let input = document.querySelector("input");
  let mainCity = document.querySelector(".main-city");
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${input.value}&units=metric&appid=${apiKey}`;
  mainCity.innerHTML = input.value;
  let apiUrl1 = `https://api.openweathermap.org/data/2.5/forecast?q=${input.value}&units=metric&cnt=4&appid=${apiKey}`;
  axios.get(apiUrl).then(changeTemperature);

  axios.get(apiUrl1).then(changeSmallTemperature);

  function changeTemperature(response) {
    let mainTemperature = document.querySelector("#main-temp");
    celciusTemperature = response.data.main.temp;
    mainTemperature.innerHTML = Math.round(celciusTemperature);
    let windSpeed = document.querySelector("#wind-speed");
    windSpeed.innerHTML = Math.round(response.data.wind.speed);
  }

  function changeSmallTemperature(response) {
    let smallTemp1 = document.querySelector("#small-temp1");
    let smallTemp2 = document.querySelector("#small-temp2");
    let smallTemp3 = document.querySelector("#small-temp3");
    let smallTemp4 = document.querySelector("#small-temp4");
    smallTemp1.innerHTML = `${Math.round(
      response.data.list[0].main.temp_max
    )}°C / ${Math.round(response.data.list[0].main.temp_min)}°C`;
    smallTemp2.innerHTML = `${Math.round(
      response.data.list[1].main.temp_max
    )}°C / ${Math.round(response.data.list[1].main.temp_min)}°C`;
    smallTemp3.innerHTML = `${Math.round(
      response.data.list[2].main.temp_max
    )}°C / ${Math.round(response.data.list[2].main.temp_min)}°C`;
    smallTemp4.innerHTML = `${Math.round(
      response.data.list[3].main.temp_max
    )}°C / ${Math.round(response.data.list[3].main.temp_min)}°C`;
  }
}

let form = document.querySelector("form");
form.addEventListener("submit", changeCityTemp);

function nextDayName(time) {
  if (time === 7) {
    time = 0;
  }
  if (time === 8) {
    time = 1;
  }
  if (time === 9) {
    time = 2;
  }
  if (time === 10) {
    time = 3;
  }
  return time;
}

let nextDay1 = document.querySelector("#next-day1");
nextDay1.innerHTML = days[nextDayName(currentTime.getDay() + 1)];
let nextDay2 = document.querySelector("#next-day2");
nextDay2.innerHTML = days[nextDayName(currentTime.getDay() + 2)];
let nextDay3 = document.querySelector("#next-day3");
nextDay3.innerHTML = days[nextDayName(currentTime.getDay() + 3)];
let nextDay4 = document.querySelector("#next-day4");
nextDay4.innerHTML = days[nextDayName(currentTime.getDay() + 4)];

if (currentTime.getHours() >= 19 || currentTime.getHours() < 7) {
  document.body.style.backgroundImage = "url('../images/night-desert.jpg')";
  document.getElementById("card11").classList.remove("card-1");
  document.getElementById("card12").classList.remove("card-2");
  document.getElementById("card13").classList.remove("card-3");
  document.getElementById("card14").classList.remove("card-4");
}

function changeCityAndTemp(event) {
  event.preventDefault();
  function changeTemperature(response) {
    celciusTemperature = response.data.main.temp;
    let mainTemperature = document.querySelector("#main-temp");
    mainTemperature.innerHTML = Math.round(response.data.main.temp);
    let mainCity = document.querySelector(".main-city");
    mainCity.innerHTML = response.data.name;
    let windSpeed = document.querySelector("#wind-speed");
    windSpeed.innerHTML = Math.round(response.data.wind.speed);
  }

  function changeSmallTemperatureCurrent(response) {
    let smallTemp1 = document.querySelector("#small-temp1");
    let smallTemp2 = document.querySelector("#small-temp2");
    let smallTemp3 = document.querySelector("#small-temp3");
    let smallTemp4 = document.querySelector("#small-temp4");
    smallTemp1.innerHTML = `${Math.round(
      response.data.list[0].main.temp_max
    )}°C / ${Math.round(response.data.list[0].main.temp_min)}°C`;
    smallTemp2.innerHTML = `${Math.round(
      response.data.list[1].main.temp_max
    )}°C / ${Math.round(response.data.list[1].main.temp_min)}°C`;
    smallTemp3.innerHTML = `${Math.round(
      response.data.list[2].main.temp_max
    )}°C / ${Math.round(response.data.list[2].main.temp_min)}°C`;
    smallTemp4.innerHTML = `${Math.round(
      response.data.list[3].main.temp_max
    )}°C / ${Math.round(response.data.list[3].main.temp_min)}°C`;
  }

  function retrievePosition(position) {
    let apiKey = "287a64521ea9136de147467072dc8ccb";
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
    let apiUrl1 = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&cnt=4&appid=${apiKey}`;
    axios.get(url).then(changeTemperature);
    axios.get(apiUrl1).then(changeSmallTemperatureCurrent);
  }
  navigator.geolocation.getCurrentPosition(retrievePosition);
}

let currentCityTemp = document.getElementById("button-location");
currentCityTemp.addEventListener("click", changeCityAndTemp);

function showFahrenheitTemperature(event) {
  event.preventDefault();
  let fahrenheitTemperature = (celciusTemperature * 9) / 5 + 32;
  let temperatureElement = document.querySelector("#main-temp");
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

function showCelciusTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#main-temp");
  temperatureElement.innerHTML = Math.round(celciusTemperature);
}

let celciusTemperature = null;

let fahrenheitLink = document.querySelector("#fahrenheit");
fahrenheitLink.addEventListener("click", showFahrenheitTemperature);

let celciusLink = document.querySelector("#celcius");
celciusLink.addEventListener("click", showCelciusTemperature);
