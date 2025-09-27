import React, { useEffect, useState } from 'react';
import { DotLoader } from 'react-spinners';
import WeatherBackgroundLarge from '../assets/Images/bg-today-large.svg';
import WeatherBackgroundSmall from '../assets/Images/bg-today-small.svg';
import IconSunny from '../assets/Images/icon-sunny.webp';

const WeatherInfoContent = () => {
  const [weather, setWeather] = useState(null);
  const [geo, setGeo] = useState(null);
  const [error, setError] = useState(null);

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
      <DotLoader color="#fff" size={20} /> {/* DotLoader */}
      <p className="font-dmsans text-lg font-medium text-neutral-0">
        Loading...
      </p>
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
            <img src={IconSunny} alt="Weather Icon" className="w-30 h-30" />
            <p className="font-dmsans text-7xl font-semibold italic my-3 lg:text-8xl">
              {Math.round(weather.current.temperature_2m)}&#176;
            </p>
          </div>
        </div>
      </div>

      {/* You can later add daily/hourly forecasts below */}
    </div>
  );
};

export default WeatherInfoContent;
