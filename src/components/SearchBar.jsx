import React from 'react'
import SearchIcon from '../assets/Images/icon-search.svg'

const SearchBar = () => {
  return (
    <div className='w-fit mx-auto '>
      <div className='relative flex '>
      <img src={SearchIcon} alt="Search Icon"  className='absolute left-6 top-1/2 -translate-y-1/2'/>
      <input 
      type="text"
      placeholder='Search for a place'
      className='h-14 pl-15'/>
      </div>
    </div>
  )
}

export default SearchBar