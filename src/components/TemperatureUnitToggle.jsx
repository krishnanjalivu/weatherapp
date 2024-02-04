import React from 'react';

function TemperatureUnitToggle({ unit, onUnitChange }) {
  return (
    <button className='temp glass' onClick={() => onUnitChange(unit === 'metric' ? 'imperial' : 'metric')}>
      {unit === 'imperial' ? 'Fahrenheit' : 'Celsius'}
    </button>
  );
}

export default TemperatureUnitToggle;
