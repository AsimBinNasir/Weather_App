import React, {useState} from 'react'
import Navbar from './components/Navbar'
import Header from './components/Header'
import WeatherDashboard from './pages/WeatherDashboard'
const App = () => {
  const [unitSystem, setUnitSystem] = useState("metric");
  const [selectedUnit, setSelectedUnit] = useState({
    temp: 'celsius',
    wind: 'kmh',
    precipitation: 'mm',
  });
  return (
    <div className='w-screen h-full bg-neutral-900 px-4 pt-4 pb-12 sm:px-6 sm:pt-6 sm:pb-20 lg:px-13 lg:pt-7 xl:px-28 xl:pt-12'>
      <Navbar setUnitSystem={setUnitSystem} setSelectedUnit={setSelectedUnit} unitSystem={unitSystem} selectedUnit={selectedUnit} />
      <Header />
      <WeatherDashboard  selectedUnit={selectedUnit} unitSystem={unitSystem}/>
    </div>
  )
}

export default App