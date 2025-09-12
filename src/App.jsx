import React from 'react'
import Navbar from './components/Navbar'
import Header from './components/Header'
const App = () => {
  return (
    <div className='w-screen h-screen bg-neutral-900 px-4 pt-4 pb-12 sm:px-6 sm:pt-6 sm:pb-20 lg:px-13 lg:pt-7 xl:px-28 xl:pt-12'>
      <Navbar />
      <Header />
    </div>
  )
}

export default App