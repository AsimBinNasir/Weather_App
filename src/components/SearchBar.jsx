import React from 'react'
import SearchIcon from '../assets/Images/icon-search.svg'

const SearchBar = () => {
  return (
    <div className="w-full mx-auto mb-8 md:max-w-[656px] md:mb-12">
      <div className="relative flex  gap-y-3 items-center flex-col sm:flex-row sm:gap-4">
        <div className="relative w-full sm:flex-1">
          <input
            type="text"
            placeholder="Search for a place..."
            className="w-full px-4 py-4 pl-15 pr-10 font-dmsans font-medium text-base text-neutral-200 placeholder-neutral-200 bg-neutral-700 rounded-xl"
          />

          {/* Search Icon */}
          <div className="absolute inset-y-0 left-0 flex items-center pl-6">
            <img src={SearchIcon} alt="Search" className="w-5 h-5 text-neutral-200" />
          </div>
        </div>

        {/* Search Button */}
        <button
          className="px-6 py-4 w-full font-dmsans bg-blue-500 text-neutral-0 font-medium text-base rounded-xl sm:w-auto"
        >
          Search
        </button>
      </div>
    </div>
  );
};

export default SearchBar
