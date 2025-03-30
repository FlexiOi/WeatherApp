  // get date
  let current_date = new Date();
  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "Rocktober", "November", "December"];

  let current_hour = current_date.getHours();

  let current_minutes = current_date.getMinutes();
  if (current_minutes < 10) {
    current_minutes = "0" + current_minutes;
  }
  let current_day = current_date.getDay();

  let day_counter = current_day;

  //set date and changes days

  let date_phrase = `${days[current_day]}, ${current_hour}:${current_minutes} `;
  change_text = document.getElementById('date');
  change_text.innerHTML = date_phrase;
  for (let i = 0; i < 4; i++) {
    if (day_counter > 5) {
      day_counter = day_counter - 7;
    }
    console.log(day_counter);
    day = document.getElementById(i + 2);
    day.innerHTML = `${days[day_counter + 1]}`;
    day_counter = day_counter + 1;

  }

  // change city name

  function getFood(event) {
    event.preventDefault();
    city = document.getElementById('get_city').value;
    if (city) {
      change_text = document.getElementById('what_city');
      change_text.innerHTML = `Weather in ${city}`;
      let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${openweathermap_key}`;
      axios.get(apiURL).then(showTemp);
    } else {
      alert("Enter a city.");
      change_text = document.getElementById('what_city');
      change_text.innerHTML = `Currently no city selected`;
    }

  }

  let form = document.querySelector("#search-form");
  form.addEventListener("submit", getFood);

  // get current location

  let openweathermap_key = "b80a9f2d6fa519ca9ccead159af15950";

  function showTemp(response) {
    weatherIconNumber = response.data.weather[0].icon;
    let weatherToday = response.data.main.temp;
    letTempChange = 1;
    tempToday = Math.round(weatherToday);
    change_tempToday = document.querySelector("#tempTodayCelsius");
    change_tempToday.innerHTML = `${Math.round(weatherToday)}`;

    change_clickCelsius = document.querySelector("#clickCelsius");
    change_clickCelsius.classList.remove("lightgreyFont");

    change_clickFahrenheit = document.querySelector("#clickFahrenheit");
    change_clickFahrenheit.classList.add("curserPointer");

    change_tempFahrenheit = document.querySelector("#tempTodayFahrenheit");

    change_descriptionDay1 = document.querySelector(".day1Description");
    change_descriptionDay1.innerHTML = `${response.data.weather[0].description} `;

    change_text = document.getElementById('what_city');
    change_text.innerHTML = `Weather in ${response.data.name}`;

    change_icon = document.querySelector(".weatherIcon");
    change_icon.src = `http://openweathermap.org/img/wn/${weatherIconNumber}@2x.png`;
  }

  function showPositionLat_Lon(position) {
    let lat = position.coords.latitude;
    console.log(lat);
    let lon = position.coords.longitude;
    console.log(lon);
    let apiURL = `https://api.openweathermap.org/data/2.5/weather?&units=metric&lat=${lat}&lon=${lon}&appid=${openweathermap_key}`;
    axios.get(apiURL).then(showTemp);
  }
  function getPosition() {
    navigator.geolocation.getCurrentPosition(showPositionLat_Lon);
  }

let tempToday = 0;
let weatherIconNumber =0;
let letTempChange = 0;


function changeToFahrenheit()
{
  if (letTempChange != 0) {
    console.log(tempToday);
    change_tempToday = document.querySelector("#tempTodayCelsius");
    change_tempToday.innerHTML = `${Math.round((tempToday * 9/5) + 32)}`;
  
    change_clickCelsius = document.querySelector("#clickCelsius");
    change_clickCelsius.classList.add("lightgreyFont");
    change_clickCelsius.classList.add("curserPointer");

    change_clickFahrenheit = document.querySelector("#clickFahrenheit");
    change_clickFahrenheit.classList.remove("lightgreyFont");
    change_clickFahrenheit.classList.remove("curserPointer");
    
  } 
} 
  function changeToCelsius()
{
  if (letTempChange != 0) {
    console.log(tempToday);
 
    change_tempToday = document.querySelector("#tempTodayCelsius");
    change_tempToday.innerHTML = `${tempToday}`;

  
    change_clickCelsius = document.querySelector("#clickCelsius");
    change_clickCelsius.classList.remove("lightgreyFont");
    change_clickCelsius.classList.remove("curserPointer");

    change_clickFahrenheit = document.querySelector("#clickFahrenheit");
    change_clickFahrenheit.classList.add("lightgreyFont");
    change_clickFahrenheit.classList.add("curserPointer");
    
  } 
}

  let click_button2 = document.getElementById("current_location");
  click_button2.addEventListener("click", getPosition);

  let click_Celsius = document.querySelector("#clickCelsius");
  click_Celsius.addEventListener("click", changeToCelsius);

  let click_Fahrenheit = document.querySelector("#clickFahrenheit");
  click_Fahrenheit.addEventListener("click", changeToFahrenheit);
