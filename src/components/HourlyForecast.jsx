import React, { useEffect, useRef, useState } from 'react'
import DropDownArrow from '../assets/Images/icon-dropdown.svg'
const HourlyForecast = ({ getWeatherImage, date, hourlyObject, timezone }) => {
  const [currentDay, setCurrentDay] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [daylist, setDaylist] = useState([]);
  const closePopup = useRef(null);

  useEffect(() => {
    const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const today = date.getDay();
    const days = [];
    for (let i = 0; i < 7; i++) {
      const dayIndex = (today + i) % 7;
      days.push(weekdays[dayIndex]);
    }

    setDaylist(days);
    setCurrentDay(weekdays[today]);
  }, [date]);

  const togglePopup = () => setShowPopup(!showPopup);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (closePopup.current && !closePopup.current.contains(event.target)) {
        setShowPopup(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside); // mobile touch

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, []);


  const handleDaySelect = (day) => {
    setCurrentDay(day);
    setShowPopup(false);
  }

  const hourlyData = hourlyObject.time.map((t, i) => {
    const dateObj = new Date(t);
    const day = new Intl.DateTimeFormat("en-US", { weekday: "long", timeZone: timezone }).format(dateObj);
    const hour = new Intl.DateTimeFormat("en-US", { hour: "numeric", hour12: true, timeZone: timezone }).format(dateObj);
    const temp = hourlyObject.temperature_2m[i];
    const weatherCode = hourlyObject.weather_code[i];
    return { time: t, day, hour, temp, weatherCode };
  })
    .filter(({ day }) => day === currentDay);
  console.log(hourlyData)
  return (
    <div className="flex flex-col h-full p-6 bg-neutral-800 rounded-2xl relative" ref={closePopup}>
      {/* Heading and dropdown */}
      <div className="flex items-center justify-between">
        <h3 className="font-dmsans font-semibold text-xl text-neutral-0">
          Hourly Forecast
        </h3>
        <div
          className="flex gap-3 items-center px-4 py-2 bg-neutral-600 rounded-lg cursor-pointer"
          onClick={togglePopup}
        >
          <p className="font-dmsans font-medium text-base text-neutral-0">{currentDay}</p>
          <img
            src={DropDownArrow}
            alt="Dropdown Arrow"
            className={`w-3 h-3 transition-transform duration-500 ${showPopup ? 'rotate-0' : 'rotate-180'}`}
          />
        </div>
      </div>

      {/* Popup */}
      {showPopup && (
       <div className="absolute w-60 flex flex-col gap-1 top-20 right-6 p-2 bg-neutral-800 rounded-xl shadow-2xl z-10">
       {daylist.map((day, index) => (
         <div key={index} className="w-auto">
           <p
             onClick={() => handleDaySelect(day)}
             className={`
               font-dmsans font-medium text-base px-2 py-2.5 cursor-pointer rounded-lg
               ${currentDay === day 
                 ? 'bg-neutral-600 text-white hover:bg-neutral-700'  // selected day styles
                 : 'bg-neutral-800 text-neutral-0 hover:bg-neutral-600' // normal day styles
               }
             `}
           >
             {day}
           </p>
         </div>
       ))}
     </div>
     
      )}

      {/* Scrollable list */}
      <div className="mt-4 flex-1 overflow-y-auto flex flex-col gap-4
      [&::-webkit-scrollbar]:w-0
      hover:[&::-webkit-scrollbar]:w-1
      [&::-webkit-scrollbar-track]:rounded-full
    [&::-webkit-scrollbar-track]:bg-gray-100
      [&::-webkit-scrollbar-thumb]:rounded-full
    [&::-webkit-scrollbar-thumb]:bg-gray-300
    dark:[&::-webkit-scrollbar-track]:bg-neutral-700
    dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500">
        {hourlyData?.map(({ temp, hour, weatherCode }, index) => (
          <div
            key={index}
            className="flex justify-between items-center bg-neutral-700 border border-neutral-600 rounded-xl px-3 py-2.5 w-auto"
          >
            <div className='flex flex-between items-center gap-2'>
              <img src={getWeatherImage(weatherCode)} alt="Weather Image" className='w-10 h-10'/>
              <p className="font-dmsans font-medium text-xl text-neutral-0">
              {hour}
            </p>
            </div>
            
            <p className="font-dmsans font-normal text-base text-neutral-0">{Math.round(temp)}°</p>
          </div>
        ))}
      </div>
    </div>

  );
};


export default HourlyForecast