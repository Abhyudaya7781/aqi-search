// src/components/SearchBar.jsx

import React from "react";

function SearchBar({ city, onCityChange, onSearch, loading }) {
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      onSearch();
    }
  };

  return (
    <div className="search-row">
      <input
        className="search-input"
        placeholder="e.g. Delhi, Mumbai, San Francisco"
        value={city}
        onChange={(e) => onCityChange(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      
<button
  className="search-button"
  onClick={() => onSearch()}   // <-- important change
  disabled={loading}
>
  {loading ? "Searching..." : "Search"}
</button>

    </div>
  );
}

export default SearchBar;
