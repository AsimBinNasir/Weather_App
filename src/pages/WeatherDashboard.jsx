import React, { useState } from 'react';
import SearchBar from '../components/SearchBar';
import Content from '../layout/Content';

const WeatherDashboard = ({ selectedUnit, unitSystem }) => {
  const [location, setLocation] = useState(null);
  const [searchAttempted, setSearchAttempted] = useState(false);

  const handleLocationSelect = (place) => {
    if (place && place.latitude && place.longitude) {
      setLocation({ latitude: place.latitude, longitude: place.longitude });
    } else {
      setLocation(null); // reset location if no valid place
    }

    setSearchAttempted(true); // mark that a search was attempted
  };

  return (
    <div className="min-h-screen flex flex-col">
      <SearchBar onSelectLocation={handleLocationSelect} setSearchAttempted={setSearchAttempted} />

      <div className="flex-1 mt-8">
        {searchAttempted ? (
          location ? (
            <Content selectedUnit={selectedUnit} unitSystem={unitSystem} location={location} />
          ) : (
            <div className="flex items-center justify-center h-full font-bricolagegrotesque font-bold text-neutral-0 text-3xl">
              No search results found!
            </div>
          )
        ) : (
          <Content selectedUnit={selectedUnit} unitSystem={unitSystem} location={location} />
        )}
      </div>
    </div>
  );
};

export default WeatherDashboard;
