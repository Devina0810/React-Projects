import React, { useState } from "react";

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY; // Replace with your OpenWeather API key

const Weather = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);

  const fetchWeather = async () => {
    if (!city) return;

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
      );

      if (!response.ok) throw new Error("City not found");

      const data = await response.json();
      setWeather(data);
      setError(null);
    } catch (err) {
      setWeather(null);
      setError(err.message);
    }
  };

  // Function to determine weather emoji and background class
  const getWeatherStyle = () => {
    if (!weather) return { emoji: "🌎", bgClass: "" };
  
    const condition = weather.weather[0].main.toLowerCase();
  
    if (condition.includes("clear")) return { emoji: "☀️", bgClass: "clear" };
    if (condition.includes("cloud")) return { emoji: "☁️", bgClass: "cloudy" };
    if (condition.includes("rain")) return { emoji: "🌧️", bgClass: "rainy" };
    if (condition.includes("thunderstorm")) return { emoji: "⛈️", bgClass: "thunderstorm" };
    if (condition.includes("drizzle")) return { emoji: "🌦️", bgClass: "rainy" };
    if (condition.includes("snow")) return { emoji: "❄️", bgClass: "snowy" };
    if (condition.includes("mist") || condition.includes("fog") || condition.includes("haze"))
      return { emoji: "🌫️", bgClass: "cloudy" };
    if (condition.includes("smoke") || condition.includes("dust") || condition.includes("sand"))
      return { emoji: "🌪️", bgClass: "cloudy" };
    if (condition.includes("squall") || condition.includes("tornado"))
      return { emoji: "🌪️", bgClass: "thunderstorm" };
  
    return { emoji: "🌎", bgClass: "" }; // Default case
  };
  

  const { emoji, bgClass } = getWeatherStyle();

  return (
    <div className={`weather-container ${bgClass}`}>
      <h1>Weather App {emoji}</h1>
      
      <div className="search">
        <input
          type="text"
          placeholder="Enter city name..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button onClick={fetchWeather}>Get Weather</button>
      </div>

      {error && <p className="error">{error}</p>}

      {weather && (
        <div className="weather-info">
          <h2>{weather.name}, {weather.sys.country}</h2>
          <p className="emoji">{emoji}</p>
          <p>Temperature: {weather.main.temp}°C</p>
          <p>Humidity: {weather.main.humidity}%</p>
          <p>Wind Speed: {weather.wind.speed} m/s</p>
          <p>Condition: {weather.weather[0].description}</p>
        </div>
      )}
    </div>
  );
};

export default Weather;

