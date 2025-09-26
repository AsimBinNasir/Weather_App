import React from 'react'
import WeatherBackgroundLarge from '../assets/Images/bg-today-large.svg'
import WeatherBackgroundSmall from '../assets/Images/bg-today-small.svg'
import IconSunny from '../assets/Images/icon-sunny.webp'
const WeatherInfoContent = () => {
  return (
    <div className="flex flex-col">
      <div className="relative w-auto">
        <img
          src={WeatherBackgroundLarge}
          alt="Weather Background"
          className="w-full h-auto rounded-lg hidden sm:block"
        />
        <img
          src={WeatherBackgroundSmall}
          alt="Weather Background"
          className="w-full h-auto rounded-lg block sm:hidden"
        />
        <div className='absolute inset-0 flex px-6 py-20 justify-between items-center flex-col sm:flex-row'>
          <div className="flex flex-col gap-2 text-neutral-0 text-center sm:text-left">
            <p className="font-dmsans text-3xl font-bold">Berlin, Germany</p>
            <p className="font-dmsans font-medium text-lg">Tuesday, Aug 5, 2025</p>
          </div>
          <div className='flex flex-row gap-5 items-center text-neutral-0 text-center sm:text-left'>
              <img src={IconSunny} alt= 'Sunny Icon' className='w-30 h-30'/>
              <p className="font-dmsans text-8xl font-semibold italic my-3">19&#176;</p>
              
            </div>
        </div>
      </div>
    </div>

  )
}

export default WeatherInfoContent