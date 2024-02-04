import React from 'react';

function FiveDayForecast({ weatherData,unit }) {
  const displayUnit = unit === 'metric' ? '°C' : '°F';
  const filteredData = weatherData.list.filter((_, index) => index % 7 === 0);
  return (
    <div className="five-day-forecast">
     
      <ul className='list'>
        {filteredData.splice(1,5).map((day, index) => (
          <li key={index} className='daily glass'>
          
            <div className='datetemp'>
            <img src={`http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`} alt={day.weather[0].description} />
            
            <p className='averagetemp'>{Math.round(day.main.temp)}{displayUnit}</p>
            </div>
            <p className='date'>{new Date(day.dt * 1000).toDateString()}</p>
            <p className='desc'> {day.weather[0].description}</p>
            
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FiveDayForecast;
