import React, { useState, useEffect } from 'react';
import WeatherInfoContent from '../components/WeatherInfoContent';
import HourlyForecast from '../components/HourlyForecast';
import WeatherInfoContentLoading from '../components/WeatherInfoContentLoading';
import HourlyForecastLoading from '../components/HourlyForecastLoading';

import ClearImg from '../assets/Images/icon-sunny.webp';
import PartlyCloudyImg from '../assets/Images/icon-partly-cloudy.webp';
import FogImg from '../assets/Images/icon-fog.webp';
import DrizzleImg from '../assets/Images/icon-drizzle.webp';
import RainImg from '../assets/Images/icon-rain.webp';
import SnowImg from '../assets/Images/icon-snow.webp';
import ThunderstormImg from '../assets/Images/icon-storm.webp';

const Content = ({ selectedUnit, location }) => {
  const [weather, setWeather] = useState(null);
  const [geo, setGeo] = useState(null);
  const [error, setError] = useState(null);

  const { temp, wind, precipitation } = selectedUnit || {
    temp: 'celsius',
    wind: 'kmh',
    precipitation: 'mm',
  };

  const imageMap = {
    clear: ClearImg,
    partlyCloudy: PartlyCloudyImg,
    fog: FogImg,
    drizzle: DrizzleImg,
    rainy: RainImg,
    snow: SnowImg,
    thunderstorm: ThunderstormImg,
  };

  const getWeatherImage = (code) => {
    if ([0].includes(code)) return imageMap.clear;
    if ([1, 2, 3].includes(code)) return imageMap.partlyCloudy;
    if ([45, 48].includes(code)) return imageMap.fog;
    if ([51, 53, 55, 56, 57].includes(code)) return imageMap.drizzle;
    if ([61, 63, 65, 66, 67, 80, 81, 82].includes(code)) return imageMap.rainy;
    if ([71, 73, 75, 77, 85, 86].includes(code)) return imageMap.snow;
    if ([95, 96, 99].includes(code)) return imageMap.thunderstorm;
    return imageMap.clear;
  };

  const getUserLocation = () =>
    new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error('Geolocation not supported'));
      }
      navigator.geolocation.getCurrentPosition(
        (position) =>
          resolve({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          }),
        (err) => reject(err)
      );
    });

  const fetchWeather = async (latitude, longitude) => {
    try {
      if (!latitude || !longitude) throw new Error('Invalid coordinates');

      const [weatherRes, geoRes] = await Promise.all([
        fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,apparent_temperature,relative_humidity_2m,precipitation,wind_speed_10m,weather_code&daily=temperature_2m_max,temperature_2m_min,weather_code&hourly=temperature_2m,weather_code&timezone=auto&wind_speed_unit=${wind}&temperature_unit=${temp}&precipitation_unit=${precipitation}`
        ),
        fetch(
          `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
        ),
      ]);

      const [weatherData, geoData] = await Promise.all([weatherRes.json(), geoRes.json()]);

      setWeather(weatherData);
      setGeo(geoData);
    } catch (err) {
      setError(err.message);
      setWeather(null);
      setGeo(null);
    }
  };

  useEffect(() => {
    (async () => {
      try {
        let latitude, longitude;

        if (location?.latitude && location?.longitude) {
          ({ latitude, longitude } = location);
        } else {
          const loc = await getUserLocation();
          ({ latitude, longitude } = loc);
        }

        if (latitude && longitude) {
          await fetchWeather(latitude, longitude);
        } else {
          setError('Location coordinates are missing.');
        }
      } catch (err) {
        setError(err.message);
      }
    })();
  }, [selectedUnit, location]);

  if (error)
    return <p className="text-red-500 text-center mt-4">{error}</p>;

  if (!weather || !geo || !weather.current)
    return (
      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        <div className="md:col-span-2">
          <WeatherInfoContentLoading />
        </div>
        <div>
          <HourlyForecastLoading />
        </div>
      </div>
    );

  const apiTime = weather.current.time;
  const date = new Date(apiTime);
  const timezone = weather.timezone || 'UTC';
  const hourlyObject = weather.hourly || { time: [], temperature_2m: [], weather_code: [] };

  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-3 md:grid-rows-[minmax(0,80vh)]">
      <div className="md:col-span-2">
        <WeatherInfoContent
          weather={weather}
          geo={geo}
          getWeatherImage={getWeatherImage}
          date={date}
          temp={temp}
          wind={wind}
          precipitation={precipitation}
        />
      </div>
      <div className="h-172 md:col-span-1 flex flex-col md:h-full">
        <HourlyForecast
          date={date}
          hourlyObject={hourlyObject}
          timezone={timezone}
          getWeatherImage={getWeatherImage}
        />
      </div>
    </div>
  );
};

export default Content;
