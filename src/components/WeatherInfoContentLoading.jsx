import React from 'react'
import { DotLoader } from 'react-spinners';
const WeatherInfoContentLoading = () => {
  return (
    <div>
        <div className="relative w-full mb-8 aspect-[16/13] sm:aspect-[20/7] rounded-2xl overflow-hidden"> 
  
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
              className="p-5 bg-neutral-800 border border-neutral-600 rounded-xl flex flex-col gap-6 items-start"
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
                className="px-2.5 py-4 bg-neutral-800 border border-neutral-600 rounded-xl flex flex-col gap-4 items-center"
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
  )
}

export default WeatherInfoContentLoading