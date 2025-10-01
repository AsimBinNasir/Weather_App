import React from 'react'
import SearchBar from '../components/SearchBar'
import Content from '../layout/Content'

const WeatherDashboard = ({ selectedUnit, unitSystem }) => {
  
  return (
    <div>
      <SearchBar />
      <Content selectedUnit={selectedUnit} unitSystem={unitSystem} />
    </div>

  )
}

export default WeatherDashboard