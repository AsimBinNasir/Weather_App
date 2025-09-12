import React from 'react'
import Logo from '../assets/Images/logo.svg'
import IconUnit from '../assets/Images/icon-units.svg'
import DropDownArrow from '../assets/Images/icon-dropdown.svg'
const Navbar = () => {
  return (
    <div className='w-full h-auto flex items-center justify-between'>
      <div>
        <img src={Logo} alt="Weather Now Logo" className='w-auto h-7 sm:h-10' />
      </div>
      <div>
        <button className='flex  gap-1.5 items-center justify-center rounded-lg bg-neutral-700 px-2.5 py-2 sm:px-4 sm:py-3 sm:gap-2.5 '>
          <img src={IconUnit} alt="Icon Units Logo"  className='w-4 h-4'/>
          <span className='font-dmsans text-neutral-0 text-sm sm:text-base'>Units</span>
          <img src={DropDownArrow} alt="Dropdown Arrow" />
        </button>
      </div>
    </div>
  )
}

export default Navbar