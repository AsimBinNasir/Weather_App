import React from "react";
import DropDownArrow from "../assets/Images/icon-dropdown.svg";

const HourForecastLoading = () => {
  return (
    <div className="flex flex-col h-full p-6 bg-neutral-800 rounded-2xl relative">
      {/* Heading and dropdown */}
      <div className="flex items-center justify-between">
        <h3 className="font-dmsans font-semibold text-xl text-neutral-0">
          Hourly Forecast
        </h3>
        <div className="flex gap-3 items-center px-4 py-2 bg-neutral-600 rounded-lg cursor-pointer">
          <div className="h-4 w-10 bg-neutral-500 rounded animate-pulse"></div>
          <img
            src={DropDownArrow}
            alt="Dropdown Arrow"
            className="w-3 h-3 rotate-180"
          />
        </div>
      </div>

      {/* Scrollable list */}
      <div className="mt-4 flex-1 overflow-hidden flex flex-col gap-4">
        {Array.from({ length: 8 }).map((_, index) => (
          <div
            key={index}
            className="flex justify-between items-center bg-neutral-700 border border-neutral-600 rounded-xl px-3 py-2.5 w-auto"
          >
            {/* Left side (time & icon placeholder) */}
            <div className="flex items-center gap-2">
              <div className="h-4 w-12 bg-neutral-600 rounded animate-pulse"></div>
              <div className="h-8 w-8 bg-neutral-600 rounded-full animate-pulse"></div>
            </div>

            {/* Right side (temperature placeholder) */}
            <div className="h-4 w-10 bg-neutral-600 rounded animate-pulse"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HourForecastLoading;
