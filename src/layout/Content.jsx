import React, { useState, useEffect } from 'react'

import WeatherInfoContent from '../components/WeatherInfoContent'
import HourlyForecast from '../components/HourlyForecast'
import ClearImg from '../assets/Images/icon-sunny.webp';
import PartlyCloudyImg from '../assets/Images/icon-partly-cloudy.webp';
import FogImg from '../assets/Images/icon-fog.webp';
import DrizzleImg from '../assets/Images/icon-drizzle.webp';
import RainImg from '../assets/Images/icon-rain.webp';
import SnowImg from '../assets/Images/icon-snow.webp';
import ThunderstormImg from '../assets/Images/icon-storm.webp';
import WeatherInfoContentLoading from '../components/WeatherInfoContentLoading';
import HourlyForecastLoading from '../components/HourlyForecastLoading';
const Content = () => {
  const [weather, setWeather] = useState(null);
  const [geo, setGeo] = useState(null);
  const [error, setError] = useState(null);



  const imageMap = {
    clear: ClearImg,
    partlyCloudy: PartlyCloudyImg,
    fog: FogImg,
    drizzle: DrizzleImg,
    rainy: RainImg,
    snow: SnowImg,
    thunderstorm: ThunderstormImg,
  };

  function getWeatherImage(code) {
    if ([0].includes(code)) return imageMap.clear;
    if ([1, 2, 3].includes(code)) return imageMap.partlyCloudy;
    if ([45, 48].includes(code)) return imageMap.fog;
    if ([51, 53, 55, 56, 57].includes(code)) return imageMap.drizzle;
    if ([61, 63, 65, 66, 67, 80, 81, 82].includes(code)) return imageMap.rainy;
    if ([71, 73, 75, 77, 85, 86].includes(code)) return imageMap.snow;
    if ([95, 96, 99].includes(code)) return imageMap.thunderstorm;
    return imageMap.clear; // fallback
  }

  const getUserLocation = () =>
    new Promise((resolve, reject) => {
      if (!('geolocation' in navigator)) {
        reject(new Error('GeoLocation not supported'));
      }
      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (err) => reject(err)
      );
    });

  const fetchWeather = async (latitude, longitude) => {
    try {
      const [weatherRes, geoRes] = await Promise.all([
        fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,apparent_temperature,relative_humidity_2m,precipitation,wind_speed_10m,weather_code&daily=temperature_2m_max,temperature_2m_min,weather_code&hourly=temperature_2m,weather_code&timezone=auto`
        ),
        fetch(
          `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
        ),
      ]);

      const [weatherData, geoData] = await Promise.all([
        weatherRes.json(),
        geoRes.json(),
      ]);

      setWeather(weatherData);
      setGeo(geoData);
      console.log(weatherData);
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    (async () => {
      try {
        const loc = await getUserLocation();
        await fetchWeather(loc.latitude, loc.longitude);
      } catch (err) {
        setError(err.message);
      }
    })();
  }, []);

  if (error) return <p className="text-red-500">{error}</p>;
  if (!weather || !geo) return (
    <div className='grid grid-cols-1 gap-8 md:grid-cols-3'>
      <div className='md:col-span-2'>
        <WeatherInfoContentLoading />
      </div>
      <div >
        <HourlyForecastLoading />
      </div>
    </div>
  );
  const apiTime = weather.current.time;
  const date = new Date(apiTime);
  const timezone = weather.timezone || "UTC";
  const hourlyObject = weather.hourly
  console.log(hourlyObject)
  console.log("Current Time:", apiTime);
  return (
    <div className='grid grid-cols-1 gap-8 md:grid-cols-3'  >
      <div className='md:col-span-2' >
        <WeatherInfoContent weather={weather} geo={geo} getWeatherImage={getWeatherImage} date={date} />
      </div>
      <div className='flex flex-col md:col-span-1' >
        <HourlyForecast date={date} hourlyObject={hourlyObject} timezone={timezone} />
      </div>
    </div>
  )
}

export default Content