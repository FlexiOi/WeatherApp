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

  function change_city(event) {
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
  form.addEventListener("submit", change_city);

  // get current location

  let openweathermap_key = "b80a9f2d6fa519ca9ccead159af15950";

  function showTemp(response) {
    console.log(response.data);
    console.log(response.data.main.temp);
    change_h1 = document.querySelector("#tempToday");
    change_h1.innerHTML = `${Math.round(response.data.main.temp)}°C - ${response.data.weather[0].description}`;
    change_text = document.getElementById('what_city');
    change_text.innerHTML = `Weather in ${response.data.name}`;

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


  let click_button2 = document.getElementById("current_location");
  click_button2.addEventListener("click", getPosition);
