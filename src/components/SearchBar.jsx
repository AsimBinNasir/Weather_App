import React, { useState, useRef, useEffect } from 'react';
import SearchIcon from '../assets/Images/icon-search.svg';

const SearchBar = ({ onSelectLocation, setSearchAttempted }) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const wrapperRef = useRef(null);

  // Debounced fetch suggestions
  useEffect(() => {
    if (!query) {
      setSuggestions([]);
      setShowPopup(false);
      return;
    }

    const timer = setTimeout(async () => {
      try {
        const res = await fetch(
          `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(query)}&count=5&language=en&format=json`
        );
        const data = await res.json();
        setSuggestions(data.results || []);
        setShowPopup(true);
      } catch (err) {
        console.error(err);
        setSuggestions([]);
        setShowPopup(false);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [query]);

  // Close popup on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setShowPopup(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, []);

  const handleSelect = (place) => {
    if (!place) return;

    setQuery(''); // clear input
    setShowPopup(false); // close suggestions
    if (onSelectLocation) onSelectLocation(place);
  };

  const handleSearch = () => {
    if (suggestions.length > 0) {
      handleSelect(suggestions[0]);
    } else {
      // No results found
      setSuggestions([]);
      setQuery('');
      if (onSelectLocation) onSelectLocation(null);
      setShowPopup(false);
    }

    setSearchAttempted(true);
  };

  return (
    <div className="w-full mx-auto mb-8 md:max-w-[656px] md:mb-12 relative" ref={wrapperRef}>
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-center">
        {/* Input field */}
        <div className="relative w-full sm:flex-1">
          <input
            type="text"
            placeholder="Search for a place..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            className="w-full px-4 py-4 pl-15 pr-10 font-dmsans font-medium text-base text-neutral-200 placeholder-neutral-200 bg-neutral-700 rounded-xl"
          />
          <div className="absolute inset-y-0 left-0 flex items-center pl-6">
            <img src={SearchIcon} alt="Search" className="w-5 h-5 text-neutral-200" />
          </div>

          {/* Suggestions */}
          {showPopup && suggestions.length > 0 && (
            <ul className="absolute z-50 top-full left-0 w-full bg-neutral-800 rounded-xl mt-1 shadow-lg max-h-72 overflow-y-auto">
              {suggestions.map((place) => (
                <li
                  key={place.id || place.name}
                  onClick={() => handleSelect(place)}
                  className="px-4 py-2 cursor-pointer hover:bg-neutral-600 text-neutral-200"
                >
                  {place.name}, {place.country}
                </li>
              ))}
            </ul>
          )}

          {/* No results in popup */}
          {showPopup && suggestions.length === 0 && query && (
            <div className="absolute z-50 top-full left-0 w-full bg-neutral-800 rounded-xl mt-1 px-4 py-2 text-neutral-400 shadow-lg">
              No search results found!
            </div>
          )}
        </div>

        {/* Search Button */}
        <button
          onClick={handleSearch}
          className="px-6 py-4 w-full sm:w-auto font-dmsans bg-blue-500 text-neutral-0 font-medium text-base rounded-xl cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-800 hover:bg-blue-700 transition"
        >
          Search
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
