import React, { useState, useEffect, useRef } from 'react'
import Logo from '../assets/Images/logo.svg'
import IconUnit from '../assets/Images/icon-units.svg'
import DropDownArrow from '../assets/Images/icon-dropdown.svg'
import Check from '../assets/Images/icon-checkmark.svg'
const Navbar = ({ selectedUnit, unitSystem, setSelectedUnit, setUnitSystem }) => {
  const [showPopup, setShowPopup] = useState(false);
  const closePopup = useRef(null);
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

  useEffect(() => {
    const isAllImperial = 
      selectedUnit.temp === 'fahrenheit' &&
      selectedUnit.wind === 'mph' &&
      selectedUnit.precipitation === 'inch';

    const isAllMetric = 
      selectedUnit.temp === 'celsius' &&
      selectedUnit.wind === 'kmh' &&
      selectedUnit.precipitation === 'mm';

    if (isAllImperial && unitSystem !== 'imperial') {
      setUnitSystem('imperial');
    } else if (isAllMetric && unitSystem !== 'metric') {
      setUnitSystem('metric');
    }
  }, [selectedUnit, unitSystem, setUnitSystem]);


  return (
    <div className='w-full h-auto flex items-center justify-between relative' ref={closePopup}>
      <div >
        <img src={Logo} alt="Weather Now Logo" className={`w-auto h-7 sm:h-10`} />
      </div>
      <div>
        <button
          className='flex  gap-1.5 items-center justify-center rounded-lg bg-neutral-700 px-2.5 py-2 sm:px-4 sm:py-3 sm:gap-2.5 '
          onClick={togglePopup}
        >
          <img src={IconUnit} alt="Icon Units Logo" className={`w-4 h-4 transition-transform duration-500 ${showPopup ? 'rotate-0' : 'rotate-180'}`} />
          <span className='font-dmsans text-neutral-0 text-sm sm:text-base'>Units</span>
          <img
            src={DropDownArrow}
            alt="Dropdown Arrow"
            className={`transition-transform duration-500 ${showPopup ? 'rotate-0' : 'rotate-180'}`}
          />
        </button>
      </div>
      {showPopup && (
        <div className="absolute w-60 flex flex-col gap-1 top-14 right-0 px-2 py-1.5 bg-neutral-800 rounded-xl shadow-2xl z-10">
          <div
            className="w-auto font-dmsans font-medium text-base text-neutral-0 leading-tight cursor-pointer hover:bg-neutral-700 rounded-lg px-2 py-2.5"
            onClick={() => {
              const newSystem = unitSystem === "metric" ? "imperial" : "metric";

              setUnitSystem(newSystem);
              setSelectedUnit({
                temp: newSystem === "metric" ? "celsius" : "fahrenheit",
                wind: newSystem === "metric" ? "kmh" : "mph",
                precipitation: newSystem === "metric" ? "mm" : "inch",
              });
            }}
          >
            <p>
              Switch to {unitSystem === "metric" ? "Imperial" : "Metric"}
            </p>
          </div>
          <div className='w-auto h-auto'>
            <div className='px-2 py-1.5 mb-2'>
              <p className='font-dmsans font-medium text-sm leading-tight text-neutral-300'>Temprature</p>
            </div>
            <div className="w-auto h-auto flex flex-col gap-1 font-dmsans font-medium text-base text-neutral-0 leading-tight cursor-pointer">
              {[
                { label: "Celsius (°C)", value: "celsius" },
                { label: "Fahrenheit (°F)", value: "fahrenheit" },
              ].map((opt) => (
                <div
                  key={opt.value}
                  onClick={() => setSelectedUnit({ ...selectedUnit, temp: opt.value })}
                  className={`flex justify-between items-center px-2 py-2.5 rounded-lg hover:bg-neutral-700 ${selectedUnit.temp === opt.value ? "bg-neutral-700" : ""
                    }`}
                >
                  <p>{opt.label}</p>
                  {selectedUnit.temp === opt.value && (
                    <img src={Check} alt="Check Mark" className="w-4 h-4" />
                  )}
                </div>
              ))}
            </div>

          </div>
          <div className='w-auto h-0.5 bg-neutral-600'></div>

          <div className='w-auto h-auto'>
            <div className='px-2 py-1.5 mb-2'>
              <p className='font-dmsans font-medium text-sm leading-tight text-neutral-300'>Wind Speed</p>
            </div>
            <div className="w-auto h-auto flex flex-col gap-1 font-dmsans font-medium text-base text-neutral-0 leading-tight cursor-pointer">
              {[
                { label: "km/h", value: "kmh" },
                { label: "mph", value: "mph" },
              ].map((opt) => (
                <div
                  key={opt.value}
                  onClick={() => setSelectedUnit({ ...selectedUnit, wind: opt.value })}
                  className={`flex justify-between items-center px-2 py-2.5 rounded-lg hover:bg-neutral-700 ${selectedUnit.wind === opt.value ? "bg-neutral-700" : ""
                    }`}
                >
                  <p>{opt.label}</p>
                  {selectedUnit.wind === opt.value && (
                    <img src={Check} alt="Check Mark" className="w-4 h-4" />
                  )}
                </div>
              ))}
            </div>

          </div>
          <div className='w-auto h-0.5 bg-neutral-600'></div>
          <div className='w-auto h-auto'>
            <div className='px-2 py-1.5 mb-2'>
              <p className='font-dmsans font-medium text-sm leading-tight text-neutral-300'>Precipitation</p>
            </div>
            <div className="w-auto h-auto flex flex-col gap-1 font-dmsans font-medium text-base text-neutral-0 leading-tight cursor-pointer">
              {[
                { label: "mm", value: "mm" },
                { label: "inch", value: "inch" },
              ].map((opt) => (
                <div
                  key={opt.value}
                  onClick={() => setSelectedUnit({ ...selectedUnit, precipitation: opt.value })}
                  className={`flex justify-between items-center px-2 py-2.5 rounded-lg hover:bg-neutral-700 ${selectedUnit.precipitation === opt.value ? "bg-neutral-700" : ""
                    }`}
                >
                  <p>{opt.label}</p>
                  {selectedUnit.precipitation === opt.value && (
                    <img src={Check} alt="Check Mark" className="w-4 h-4" />
                  )}
                </div>
              ))}
            </div>

          </div>

        </div>

      )}

    </div>
  )
}

export default Navbar