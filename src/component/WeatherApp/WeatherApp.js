import React from 'react'
import './WeatherApp.css'

import search_icon from '../../assets/search.png';
import cloud_icon from '../../assets/cloud.png';
import humidity_icon from '../../assets/humidity.png';
import wind_icon from '../../assets/wind.png';
import clear_icon from '../../assets/clear.png';
import drizzle_icon from '../../assets/drizzle.png';
import rain_icon from '../../assets/rain.png';
import snow_icon from '../../assets/snow.png';

/* gif */
import cloud_and_sunny_and_rain from '../../assets/cloud_and_sunny_and_rain.gif'
import cloud_sunny from '../../assets/cloud_sunny.gif'
import cloud from '../../assets/cloud.gif'
import rain_20 from '../../assets/rain_20.gif';
import snow from '../../assets/snow.gif'
import sunny from '../../assets/sunny.gif'

const WeatherApp = () => {

  let api_key = '75e89c355bb010cabe50e4ed2464158e';

  const [wicon, setWicon] = React.useState(cloud_icon)
  const [backgroundGif, setBackgroundGif] = React.useState(cloud_sunny)

  const search = async () => {
    const element = document.getElementsByClassName('cityInput');
    if(element[0].value === '') return 0 ;

    let url = `https://api.openweathermap.org/data/2.5/weather?q=${element[0].value}&units=Metric&appid=${api_key}`;

    let response = await fetch(url);
    let data = await response.json();
    
    const humidity = document.getElementsByClassName('humidity-percent');
    const wind = document.getElementsByClassName('wind-rate');
    const temprature = document.getElementsByClassName('weather-temp');
    const location = document.getElementsByClassName('weather-location');
    const tempmax = document.getElementsByClassName('temp_max');
    const tempmin = document.getElementsByClassName('temp_min');

    humidity[0].innerHTML = data.main.humidity + '%';
    wind[0].innerHTML = data.wind.speed + 'km/h';
    temprature[0].innerHTML = Math.floor(data.main.temp) + '°C';
    tempmax[0].innerHTML = Math.round(data.main.temp_max) + '°C';
    tempmin[0].innerHTML = Math.round(data.main.temp_min) + '°C';
    location[0].innerHTML = data.name;

    if (data.weather[0].icon === '01d' || data.weather[0].icon === '01n')
    {
      setWicon(clear_icon)
      setBackgroundGif(sunny)
    } else if (data.weather[0].icon === '02d' || data.weather[0].icon === '02n')
    {
      setWicon(cloud_icon);
      setBackgroundGif(cloud)
    }  else if (data.weather[0].icon === '03d' || data.weather[0].icon === '03n')
    {
      setWicon(drizzle_icon);
      setBackgroundGif(cloud_and_sunny_and_rain)
    } else if (data.weather[0].icon === '04d' || data.weather[0].icon === '04n')
    {
      setWicon(drizzle_icon);
      setBackgroundGif(cloud_and_sunny_and_rain)
    } else if (data.weather[0].icon === '09d' || data.weather[0].icon === '09n')
    {
      setWicon(rain_icon)
      setBackgroundGif(rain_20)
    } else if (data.weather[0].icon === '10d' || data.weather[0].icon === '10n')
    {
      setWicon(rain_icon)
      setBackgroundGif(rain_20)
    } else if (data.weather[0].icon === '13d' || data.weather[0].icon === '13n')
    {
      setWicon(snow_icon)
      setBackgroundGif(snow)
    } else 
    {
      setWicon(clear_icon)
      setBackgroundGif(sunny)
    }
  }

  return (
    <div className='container' style={{ backgroundImage: `url(${backgroundGif})` }}>
      
      <div className='top-bar'>
        <input type='text' className='cityInput' placeholder='Search'/>
        <div className='search-icon' onClick={()=>{search()}}>
          <img src={search_icon}/>
        </div>
      </div>
      <div className='weather-image'>
        <img src={wicon}/>
      </div>
      <div className='weather-temp'>24°C</div>
      <div className='weather-location'>London</div>
      <div className='data-container'>
        <div className='element'>
          <img src={humidity_icon} className='icon' />
          <div className='data'>
            <div className='humidity-percent'>64%</div>
            <div className='text'>Humidity</div>
          </div>
        </div>

        <div className='element'>
          <div className='data'>
            <div className='t'>max: <div className='temp_max'> 20°C</div></div>
            <div className='t'>min: <div className='temp_min'> 10°C</div></div>
          </div>
        </div>

        <div className='element'>
          <img src={wind_icon} className='icon'/>
          <div className='data'>
            <div className='wind-rate'>18 km/h</div>
            <div className='text'>Wind Speed</div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default WeatherApp;