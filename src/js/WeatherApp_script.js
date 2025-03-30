// Get date
let current_date = new Date();
let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "Rocktober", "November", "December"];

let current_hour = current_date.getHours();
let current_minutes = current_date.getMinutes().toString().padStart(2, '0');
let current_day = current_date.getDay();
let day_counter = current_day;

// Set date and change days
document.getElementById('date').innerHTML = days[current_day] + ", " + current_hour + ":" + current_minutes;

for (let i = 0; i < 4; i++) {
  if (day_counter > 5) day_counter -= 7;
  document.getElementById("day" + (i + 2)).innerHTML = days[day_counter + 1];
  day_counter++;
}

// Change city name
function getCity(event) {
  event.preventDefault();
  let city = document.getElementById('get_city').value;
  let change_text = document.getElementById('what_city');

  if (city) {
    change_text.innerHTML = "Weather in " + city;
    let apiURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=metric&appid=" + openweathermap_key;
    axios.get(apiURL).then(showTempbyCity);
  } else {
    alert("Enter a city.");
    change_text.innerHTML = "Currently no city selected";
  }
}

document.querySelector("#search-form").addEventListener("submit", getCity);

// Get current location
function getPosition() {
  navigator.geolocation.getCurrentPosition(showPositionLat_Lon);
}

document.getElementById("current_location").addEventListener("click", getPosition);

let openweathermap_key = "b80a9f2d6fa519ca9ccead159af15950";
let tempToday = 0;
let letTempChange = 0;

function showTempbyCity(response) {
  let weatherToday = Math.round(response.data.main.temp);
  document.querySelector("#tempDay1").innerHTML = weatherToday;
  document.querySelector(".day1Description").innerHTML = response.data.weather[0].description;
  document.querySelector(".weatherIcon").src = "http://openweathermap.org/img/wn/" + response.data.weather[0].icon + "@2x.png";
  tempToday = weatherToday;
  letTempChange = 1;
}

function showTempFromCoord(response) {
  let weatherToday = Math.round(response.data.list[0].main.temp - 273.15);
  document.querySelector("#tempDay1").innerHTML = weatherToday;
  document.querySelector(".day1Description").innerHTML = response.data.list[0].weather[0].description;
  document.getElementById('what_city').innerHTML = "Weather in " + response.data.city.name;
  document.querySelector(".weatherIcon").src = "http://openweathermap.org/img/wn/" + response.data.list[0].weather[0].icon + "@2x.png";
  tempToday = weatherToday;
  letTempChange = 1;
}

function showPositionLat_Lon(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiURL = "https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&appid=" + openweathermap_key;
  axios.get(apiURL).then(showTempFromCoord);
}