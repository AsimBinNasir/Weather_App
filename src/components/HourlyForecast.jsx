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
    const hour = new Intl.DateTimeFormat("en-US", { hour: "numeric", hour12: false, timeZone: timezone }).format(dateObj);
    const temp = hourlyObject.temperature_2m[i];
    return { time: t, day, hour, temp };
  })
    .filter(({ day }) => day === currentDay);
    console.log(hourlyData)
  return (
    <div className="w-full h-auto p-6 bg-neutral-800 border border-neutral-600  rounded-2xl relative "  ref={closePopup}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-dmsans font-semibold text-xl text-neutral-0">
          Hourly Forecast
        </h3>
        <div
          className="flex gap-3 items-center px-4 py-2 bg-neutral-600 rounded-lg cursor-pointer"
        >
          <p className="font-dmsans font-medium text-base text-neutral-0">{currentDay}</p>
          <img
            src={DropDownArrow}
            alt="Dropdown Arrow"
            className={`w-3 h-3 transition-transform ${showPopup ? 'rotate-180' : ''}`}
            onClick={togglePopup}
            
          />
        </div>
      </div>

      {showPopup && (
        <div className="absolute top-16 right-4 bg-neutral-700 rounded-xl shadow-lg z-10">
          {daylist.map((day, index) => (
            <p
              key={index}
              className="px-4 py-2 cursor-pointer hover:bg-neutral-600"
              onClick={() => handleDaySelect(day)}
            >
              {day}
            </p>
          ))}
        </div>
      )}

      <div className="mt-4 flex flex-col gap-4 overflow-y-scroll">
        {hourlyData?.map(({ time, temp }, index) => (
          <div
            key={index}
            className="flex justify-between items-center bg-neutral-700 rounded-xl p-4 w-auto"
          >
            <p className="font-dmsans text-sm text-neutral-200">
              {new Date(time).getHours().toString().padStart(2, '0')}:00
            </p>
            <p className="font-dmsans text-lg text-neutral-0">{Math.round(temp)}°</p>
          </div>
        ))}
      </div>
    </div>
  );
};


export default HourlyForecast