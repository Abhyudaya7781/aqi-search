// src/components/HistoryList.jsx

import React from "react";

function HistoryList({ history, onSelect }) {
  if (!history || history.length === 0) return null;

  return (
    <div className="history-row">
      <div style={{ marginBottom: 4, color: "#9ca3af" }}>Recent searches:</div>
      {history.map((city) => (
        <span
          key={city}
          className="history-tag"
          onClick={() => onSelect(city)}
        >
          {city}
        </span>
      ))}
    </div>
  );
}

export default HistoryList;
