import React from 'react'
import WeatherInfoContent from '../components/WeatherInfoContent'
import HourlyForecast from '../components/HourlyForecast'
const Content = () => {
  return (
    <div className='grid grid-cols-1 gap-8 md:grid-cols-3'>
      <div className='sm:col-span-2'>
        <WeatherInfoContent />
      </div>
      <div className='md:col-span-1'>
        <HourlyForecast />
      </div>
    </div>
  )
}

export default Content