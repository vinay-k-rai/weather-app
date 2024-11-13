async function getWeather() {
  const cityInput = document.getElementById("cityInput").value;
  const apiKey = "358af07939445d0f4e5c3daf89f19537"; // OpenWeatherMap API key
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&appid=${apiKey}&units=metric`; // API

  try {
    const response = await fetch(apiUrl);
    if (!response.ok) throw new Error("City not found");

    const data = await response.json();
    displayWeather(data);
  } catch (error) {
    alert(error.message);
  }
}

function displayWeather(data) {
  const cityName = document.getElementById("cityName");
  const temperature = document.getElementById("temperature");
  const description = document.getElementById("description");
  const humidity = document.getElementById("humidity");
  const windSpeed = document.getElementById("windSpeed");
  const weatherResult = document.getElementById("weatherResult");

  cityName.innerText = data.name;
  temperature.innerText = `Temperature: ${data.main.temp} °C`;
  description.innerText = `Description: ${data.weather[0].description}`;
  humidity.innerText = `Humidity: ${data.main.humidity}%`;
  windSpeed.innerText = `Wind Speed: ${data.wind.speed} m/s`;

  weatherResult.classList.remove("hidden");
}
