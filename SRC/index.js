function formatDate(date) {
  let hour = date.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  let day = days[date.getDay()];

  return `${day} ${hour}:${minutes}`;
}
let newDate = document.querySelector("#filler");
let currentTime = new Date();

newDate.innerHTML = formatDate(currentTime);

function showWeather(response) {

    document.querySelector("#location").innerHTML=response.data.name;
    document.querySelector("#temperature").innerHTML=Math.round(response.data.main.temp);
    document.querySelector("#description").innerHTML=response.data.weather[0].main;
    document.querySelector("#humidity").innerHTML=response.data.main.humidity;
    document.querySelector("#wind").innerHTML=Math.round(response.data.wind.speed);

  
}

function search(city){
     let apiKey = "a94486606c7144d9240b3e10941fae9c";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showWeather);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#search-input").value;
  search(city);
 
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);

search("Bali");

function searchLocation(position){
    let apiKey="a94486606c7144d9240b3e10941fae9c";
    let apiUrl=`https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(showWeather);
}

function getLocation(event){
    event.preventDefault();
    navigator.geolocation.getCurrentPosition(searchLocation);
    
}

let button=document.querySelector("#locate-button");
button.addEventListener("click", getLocation);
