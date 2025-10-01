import React, { useState } from 'react'
import SearchBar from '../components/SearchBar'
import Content from '../layout/Content'

const WeatherDashboard = ({ selectedUnit, unitSystem }) => {
  const [location, setLocation] = useState(null)

  const handleLocationSelect = (place) => {
    setLocation({latitue: place.latitude, longitude: place.longitude});
  }
  
  return (
    <div>
      <SearchBar onSelectLocation ={handleLocationSelect} />
      <Content selectedUnit={selectedUnit} unitSystem={unitSystem} location ={location} />
    </div>

  )
}

export default WeatherDashboard