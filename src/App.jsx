import React, { useState, useEffect } from "react";
import axios from "axios";
import CurrentWeather from "./components/CurrentWeather";
import FiveDayForecast from "./components/FiveDayForecast";
import TemperatureUnitToggle from "./components/TemperatureUnitToggle";

function App() {
  const [city, setCity] = useState("");
  const [error, setError] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [unit, setUnit] = useState("metric"); // Default unit

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const data = await fetchWeatherData(city, unit);
        setWeatherData(data);
        setError(null);
      } catch (error) {
        setError(
          "Failed to fetch weather data. Please check your city name or API key."
        );
      }
    };
    const fetchforecast = async () => {
      try {
        const data = await fetchforecastData(city, unit);
        setForecast(data);
        setError(null);
      } catch (error) {
        setError(
          "Failed to fetch weather data. Please check your city name or API key."
        );
      }
      finally {
        setTimeout(() => {
          setError(null); // Clear error after a delay
        }, 2000);
      }
    };


    
    if (city) {
      fetchWeather();
      fetchforecast();
    }
  }, [city, unit]);

  const fetchWeatherData = async (city, unit) => {
    const apiKey = import.meta.env.VITE_API_KEY; // Replace with your actual API key
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${unit}`;

    try {
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      console.error("Error fetching weather data:", error);
      throw error;
    }
  };
  const fetchforecastData = async (city, unit) => {
    const apiKey = import.meta.env.VITE_API_KEY;
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=${unit}&exclude=current`;

    try {
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      console.error("Error fetching weather data:", error);
      throw error;
    }
  };

  const handleCityChange = (event) => {
    setCity(event.target.value);
  };

  const handleUnitChange = (newUnit) => {
    setUnit(newUnit);
    fetchWeatherData(city, newUnit); // Refetch data with new unit
  };

  return (
    <div className="app">
      <div className="head1">
        <h1>Weather Forecast</h1>     {" "}
        <input
         id="cityinput"
          className="glass"
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={handleCityChange}
        />
        <TemperatureUnitToggle unit={unit} onUnitChange={handleUnitChange} />
      </div>
      <div className="bodyerror">
   {error && <p className="error">City Not Found</p>}
      </div>
      <div className="data">
           {" "}
        {weatherData && (
          <>
            <div className="weather">
                        <CurrentWeather weatherData={weatherData} unit={unit} />
            </div>
            <div className="forecast">
                       {" "}
              {forecast && (
                <FiveDayForecast weatherData={forecast} unit={unit} />
              )}
            </div>
                   {" "}
          </>
        )}
      </div>
         {" "}
    </div>
  );
}

export default App;