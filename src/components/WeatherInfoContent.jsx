import React from 'react';
import WeatherBackgroundLarge from '../assets/Images/bg-today-large.svg';
import WeatherBackgroundSmall from '../assets/Images/bg-today-small.svg';



const WeatherInfoContent = ({ weather, geo, getWeatherImage, date,temp, wind, precipitation }) => {

  // Get today's date
  const today = date.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });


  const cityName = geo.city || geo.locality || geo.principalSubdivision || 'Unknown';

  return (
    <div className="flex flex-col h-full overflow-y-auto
    [&::-webkit-scrollbar]:w-0
    hover:[&::-webkit-scrollbar]:w-1
    [&::-webkit-scrollbar-track]:rounded-full
  [&::-webkit-scrollbar-track]:bg-gray-100
    [&::-webkit-scrollbar-thumb]:rounded-full
  [&::-webkit-scrollbar-thumb]:bg-gray-300
  dark:[&::-webkit-scrollbar-track]:bg-neutral-700
  dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500"
    >
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
            value: Math.round(weather.current.apparent_temperature) + `${temp === 'celsius' ? "°C" : "°F"}`,
          },
          {
            label: "Humidity",
            value: Math.round(weather.current.relative_humidity_2m) + "%",
          },
          {
            label: "Wind",
            value: Math.round(weather.current.wind_speed_10m) + `${wind === 'kmh' ? " km/h" : " mph"}`,
          },
          {
            label: "Precipitation",
            value: Math.round(weather.current.precipitation) + `${precipitation === 'mm' ? " mm" : " inch"}`,
          },
        ].map((item, i) => (
          <div
            key={i}
            className="p-5 bg-neutral-800 border border-neutral-600  rounded-xl flex flex-col gap-6 items-start"
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
            <div key={index} className="px-2.5 py-4 bg-neutral-800 border border-neutral-600 rounded-xl flex flex-col gap-4 items-center">
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
