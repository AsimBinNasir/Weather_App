import React, { useEffect, useState } from 'react';
import { DotLoader } from 'react-spinners';
import WeatherBackgroundLarge from '../assets/Images/bg-today-large.svg';
import WeatherBackgroundSmall from '../assets/Images/bg-today-small.svg';
import ClearImg from '../assets/Images/icon-sunny.webp';
import PartlyCloudyImg from '../assets/Images/icon-partly-cloudy.webp';
import FogImg from '../assets/Images/icon-fog.webp';
import DrizzleImg from '../assets/Images/icon-drizzle.webp';
import RainImg from '../assets/Images/icon-rain.webp';
import SnowImg from '../assets/Images/icon-snow.webp';
import ThunderstormImg from '../assets/Images/icon-storm.webp';


const WeatherInfoContent = () => {
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

  // Get today's date
  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  if (error) return <p className="text-red-500">{error}</p>;
  if (!weather || !geo) return (
    <div>
      <div className="relative w-full mb-8 aspect-[16/13] sm:aspect-[20/7] rounded-2xl overflow-hidden">
        {/* Large image */}
        <img
          src="/weather-background-large.jpg"
          alt="Weather Background"
          className="w-full h-full object-cover hidden sm:block"
        />
        {/* Small image */}
        <img
          src="/weather-background-small.jpg"
          alt="Weather Background"
          className="w-full h-full object-cover block sm:hidden"
        />

        {/* Loading overlay */}
        <div className="absolute inset-0 bg-neutral-700 flex flex-col items-center justify-center gap-4">
          <DotLoader color="#fff" size={20} />
          <p className="font-dmsans text-lg font-medium text-neutral-0">
            Loading...
          </p>
        </div>

      </div>

      <div className='grid gap-6 grid-cols-2 sm:grid-cols-4 mb-8 md:mb-12'>
        {[
          {
            label: "Feels Like",
          },
          {
            label: "Humidity",
          },
          {
            label: "Wind",
          },
          {
            label: "Precipitation",
          },
        ].map((item, i) => (
          <div
            key={i}
            className="p-5 bg-neutral-800 rounded-xl flex flex-col gap-6 items-start"
          >
            <p className="font-dmsans font-medium text-lg text-neutral-200 md:text-sm lg:text-lg">{item.label}</p>
            <p className="font-dmsans font-light text-3xl text-neutral-0 md:text-xl lg:text-3xl">_</p>
          </div>
        ))}

      </div>

      <div className='flex flex-col'>
        <h3 className='font-dmsans font-semibold text-xl text-neutral-0 mb-5'>Daily Forecast</h3>
        <div className="grid grid-cols-3 sm:grid-cols-7 gap-4">
          {Array.from({ length: 7 }).map((_, index) => (
            <div
              key={index}
              className="px-2.5 py-4 bg-neutral-800 rounded-xl flex flex-col gap-4 items-center"
            >
              <p className="font-dmsans font-medium text-lg text-neutral-0 md:text-sm lg:text-lg text-center">
                _
              </p>
              <div className="w-12 h-12 bg-neutral-700 rounded-full"></div>
              <div className='flex justify-between font-dmsans font-medium text-sm text-neutral-200 w-full'>
                <p>_</p>
                <p>_</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>


  );
const cityName = geo.city || geo.locality || geo.principalSubdivision || 'Unknown';

return (
  <div className="flex flex-col">
    <div className="relative w-auto mb-8">
      <img
        src={WeatherBackgroundLarge}
        alt="Weather Background"
        className="w-full h-auto rounded-2xl hidden sm:block"
      />
      <img
        src={WeatherBackgroundSmall}
        alt="Weather Background"
        className="w-full h-auto rounded-lg block sm:hidden"
      />

      <div className="absolute inset-0 flex px-6 py-20 justify-between items-center flex-col sm:flex-row">
        <div className="flex flex-col gap-1 text-neutral-0 text-center sm:text-left">
          <p className="font-dmsans text-2xl font-bold lg:text-3xl">
            {cityName}, {geo.countryName}
          </p>
          <p className="font-dmsans font-medium text-lg">{today}</p>
        </div>

        <div className="flex flex-row gap-5 items-center text-neutral-0 text-center sm:text-left">
          <img src={getWeatherImage(weather.current.weather_code)} alt="Weather Icon" className="w-30 h-30" />
          <p className="font-dmsans text-7xl font-semibold italic my-3 lg:text-8xl">
            {Math.round(weather.current.temperature_2m)}&#176;
          </p>
        </div>
      </div>
    </div>

    <div className='grid gap-6 grid-cols-2 sm:grid-cols-4 mb-8 md:mb-12'>
      {[
        {
          label: "Feels Like",
          value: Math.round(weather.current.apparent_temperature) + "°",
        },
        {
          label: "Humidity",
          value: Math.round(weather.current.relative_humidity_2m) + "%",
        },
        {
          label: "Wind",
          value: Math.round(weather.current.wind_speed_10m) + " m/s",
        },
        {
          label: "Precipitation",
          value: Math.round(weather.current.precipitation) + " mm",
        },
      ].map((item, i) => (
        <div
          key={i}
          className="p-5 bg-neutral-800 rounded-xl flex flex-col gap-6 items-start"
        >
          <p className="font-dmsans font-medium text-lg text-neutral-200 md:text-sm lg:text-lg">{item.label}</p>
          <p className="font-dmsans font-light text-3xl text-neutral-0 md:text-xl lg:text-3xl">{item.value}</p>
        </div>
      ))}

    </div>
    <div className='flex flex-col'>
      <h3 className='font-dmsans font-semibold text-xl text-neutral-0 mb-5'>Daily Forecast</h3>
      <div className="grid grid-cols-3 sm:grid-cols-7 gap-4">
        {weather.daily.time.slice(0, 7).map((date, index) => (
          <div key={index} className="px-2.5 py-4 bg-neutral-800 rounded-xl flex flex-col gap-4 items-center">
            <p className="font-dmsans font-medium text-lg text-neutral-0 md:text-sm lg:text-lg text-center">
              {new Date(date).toLocaleDateString("en-US", { weekday: "short" })}
            </p>
            <img
              src={getWeatherImage(weather.daily.weather_code[index])}
              alt="Weather Icon"
              className="w-15 h-15"
            />
            <div className='flex justify-between font-dmsans font-medium text-sm text-neutral-200 w-full'>
              <p>{Math.round(weather.daily.temperature_2m_max[index])}°</p>
              <p>{Math.round(weather.daily.temperature_2m_min[index])}°</p>
            </div>
          </div>

        ))}
      </div>
    </div>

  </div>
);
};

export default WeatherInfoContent;
