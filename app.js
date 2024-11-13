let currentUnit = "metric";
const apiKey = "358af07939445d0f4e5c3daf89f19537"; // Replace with your OpenWeatherMap API key

async function getWeather(city) {
  const cityInput = city || document.getElementById("cityInput").value;
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&appid=${apiKey}&units=${currentUnit}`;

  showLoader(true);
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) throw new Error("City not found");

    const data = await response.json();
    displayWeather(data);
    getForecast(data.coord.lat, data.coord.lon);
  } catch (error) {
    alert(error.message);
  } finally {
    showLoader(false);
  }
}

function toggleUnit(unit) {
  currentUnit = unit;
  const city = document.getElementById("cityName").innerText;
  if (city) getWeather(city);
}

function displayWeather(data) {
  document.body.style.background = getBackgroundColor(data.weather[0].main);

  document.getElementById("cityName").innerText = data.name;
  document.getElementById("temperature").innerText = `Temperature: ${
    data.main.temp
  }°${currentUnit === "metric" ? "C" : "F"}`;
  document.getElementById(
    "description"
  ).innerText = `Description: ${data.weather[0].description}`;
  document.getElementById(
    "humidity"
  ).innerText = `Humidity: ${data.main.humidity}%`;
  document.getElementById("windSpeed").innerText = `Wind Speed: ${
    data.wind.speed
  } ${currentUnit === "metric" ? "m/s" : "mph"}`;
  document.getElementById(
    "date"
  ).innerText = `Date: ${new Date().toLocaleDateString()}`;

  document.getElementById("weatherResult").classList.remove("hidden");
}

async function getForecast(lat, lon) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${currentUnit}`;
  const response = await fetch(apiUrl);
  const data = await response.json();

  const forecastElement = document.getElementById("forecast");
  forecastElement.innerHTML = "";
  for (let i = 0; i < data.list.length; i += 8) {
    const day = data.list[i];
    const date = new Date(day.dt * 1000).toLocaleDateString("en-US", {
      weekday: "short",
    });
    forecastElement.innerHTML += `
            <div class="day">
                <p>${date}</p>
                <p>${day.main.temp}°${currentUnit === "metric" ? "C" : "F"}</p>
                <p>${day.weather[0].description}</p>
            </div>
        `;
  }
}

function getBackgroundColor(weather) {
  switch (weather) {
    case "Clear":
      return "linear-gradient(135deg, #2193b0, #6dd5ed)";
    case "Rain":
      return "linear-gradient(135deg, #1e3c72, #2a5298)";
    case "Snow":
      return "linear-gradient(135deg, #d7d2cc, #304352)";
    case "Clouds":
      return "linear-gradient(135deg, #bdc3c7, #2c3e50)";
    default:
      return "linear-gradient(135deg, #2193b0, #6dd5ed)";
  }
}

function getWeatherByLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(async (position) => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
      showLoader(true);
      await getWeatherByCoords(lat, lon);
      showLoader(false);
    });
  } else {
    alert("Geolocation is not supported by this browser.");
  }
}

async function getWeatherByCoords(lat, lon) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${currentUnit}`;
  const response = await fetch(apiUrl);
  const data = await response.json();
  displayWeather(data);
  getForecast(lat, lon);
}

function showLoader(show) {
  document.getElementById("loader").classList.toggle("hidden", !show);
}
