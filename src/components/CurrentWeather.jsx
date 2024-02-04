import React from 'react';

function CurrentWeather({ weatherData,unit }) {
  const { name, main: { temp, temp_min, temp_max, humidity }, wind, weather } = weatherData;
 
  const displayUnit = unit === 'metric' ? '°C' : '°F';
  return (
    <div className="current-weather glass">
      <h2>{name}</h2>
      <img src={`http://openweathermap.org/img/wn/${weather[0].icon}@2x.png`} alt={weather[0].description} />
      <p className='temperature' >{Math.round(temp)}{displayUnit}</p>
      <p className='grey'>Max: {Math.round(temp_max)}{displayUnit} / Min: {Math.round(temp_min)}{displayUnit}</p>
      <p className='grey'>Humidity: {humidity}%</p>
      <p className='grey'>Wind: {wind.speed} m/s {wind.deg}</p>
      <p className='grey'>Description: {weather[0].description}</p>
      
    
    </div>
  );
}

export default CurrentWeather;
