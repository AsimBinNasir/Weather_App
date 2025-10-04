import React, { useState } from 'react';
import SearchBar from '../components/SearchBar';
import Content from '../layout/Content';

const WeatherDashboard = ({ selectedUnit, unitSystem }) => {
  const [location, setLocation] = useState(null);
  const [searchAttempted, setSearchAttempted] = useState(false);
  const [error, setError] = useState(null); // state for API/Geo error

  const handleLocationSelect = (place) => {
    if (place && place.latitude && place.longitude) {
      setLocation({ latitude: place.latitude, longitude: place.longitude });
    } else {
      setLocation(null);
    }
    setSearchAttempted(true);
    setError(null); // clear any old error when searching again
  };

  const handleReload = () => {
    setError(null);
    setLocation(null);
    setSearchAttempted(false);
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Show SearchBar always unless it's an API error */}
      {(!error || error.includes('Geolocation')) && (
        <SearchBar
          onSelectLocation={handleLocationSelect}
          setSearchAttempted={setSearchAttempted}
        />
      )}

      <div className="flex-1 mt-8">
        {error ? (
          error.includes('Geolocation') ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <p className="text-red-500 font-bold text-2xl mb-4">{error}</p>
              <p className="text-gray-600">Try selecting a location manually.</p>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <p className="text-red-500 font-bold text-2xl mb-4">{error}</p>
              <button
                onClick={handleReload}
                className="px-6 py-3 bg-blue-500 text-white rounded-xl"
              >
                Reload
              </button>
            </div>
          )
        ) : searchAttempted ? (
          location ? (
            <Content
              selectedUnit={selectedUnit}
              unitSystem={unitSystem}
              location={location}
              setApiError={setError}
            />
          ) : (
            <div className="flex items-center justify-center h-full font-bricolagegrotesque font-bold text-neutral-0 text-3xl">
              No search results found!
            </div>
          )
        ) : (
          <Content
            selectedUnit={selectedUnit}
            unitSystem={unitSystem}
            location={location}
            setApiError={setError}
          />
        )}
      </div>
    </div>
  );
};

export default WeatherDashboard;
