import React, { useState, useEffect } from "react";
import axios from "axios";
import CurrentWeather from "./components/CurrentWeather";
import FiveDayForecast from "./components/FiveDayForecast";
import TemperatureUnitToggle from "./components/TemperatureUnitToggle";
import search from "./assets/search.png"
import errorim from "./assets/error (1).png"
function App() {
  const [city, setCity] = useState("");
  const [error, setError] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [unit, setUnit] = useState("metric"); // Default unit

  
  const handleSearch = async () => {
    try {
      const weather = await fetchWeatherData(city, unit);
      const forecastData = await fetchforecastData(city, unit);
      setWeatherData(weather);
      setForecast(forecastData);
      setError(null);
      setCity('');
    } catch (error) {
      setError("Failed to fetch weather data. Please check your city name or API key.");
    }
    finally {
      setTimeout(() => {
        setError(null); // Clear error after a delay
      }, 2000);
    }
  };

  useEffect(() => {
    
    if (city && weatherData) {
      fetchWeatherData(city, unit);
      fetchforecastData(city, unit);
    }
  }, [city, unit, weatherData]);

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
    setError(null);
   
  };

  const handleUnitChange = (newUnit) => {
    setUnit(newUnit);
    fetchWeatherData(city, newUnit); 
  };
  // const handleKeyPress = (event) => {
  //   if (event.key === "Enter") {
  //     handleSearch(); // Trigger search on Enter key press
  //   }
  // };
 


  
  return (
    <div className="app">
      <div className="head1">
        <h1>Weather Forecast</h1>     {" "}
        <div className="searchbar">
        <input
         id="cityinput"
          className="glass"
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={handleCityChange}
          // onKeyPress={handleKeyPress}
          
        />
        <div className="searchbtn"><button onClick={handleSearch}><img src={search} height={25} width={25} alt="search"></img></button></div>
        </div>
        <TemperatureUnitToggle unit={unit} onUnitChange={handleUnitChange}  />
      </div>
      <div className="bodyerror">
   {error && <p className="error">Oops! City Not Found<span className="erroricon"><img src={errorim} alt="error" height={30} width={30}></img></span></p>}
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
