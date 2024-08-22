import React, { useState } from 'react'
import './App.css'
import axios from 'axios';

export default function App() {

  const [city, setCity] = useState();
  const [weather, setWeather] = useState();

  const fetchWeather = async () => {
    if (!city) {
      alert("Please Enter City Name!")
      return;
    }
    try {

      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${'629a183fa45c3f881b61f2faf5c5a12b'}`);
      const data = await response.json();
      if(!response.ok){
        alert("city not found!")
        return;
      }else{
        setWeather(data);
      }
      setCity('');
    } catch (error) {

      console.log("not found", error);

      setCity('');
    }

  }

  const handleClick = () => {
    fetchWeather();
  }

  return (
    <main>
      <div className='container'>
        <input type="text" className='search-box' placeholder='Enter City Name...' value={city} onChange={(e) => setCity(e.target.value)} />
        <button className='btn' onClick={handleClick}>Get Weather</button>

        {
          weather && (
            <div className="weather-info">
              <h1>{weather.name} {weather.sys.country}</h1>
              <p className='data'>Temperature: {weather.main.temp}°C</p>
              <p className='data'>Weather: {weather.weather[0].description}</p>
              <p className='data'>Humidity: {weather.main.humidity}%</p>
            </div>
          )
        }

      </div>
    </main>

  )
}
