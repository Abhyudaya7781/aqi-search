// frontend/src/App.jsx
import SearchBar from "./components/SearchBar";
import ResultCard from "./components/ResultCard";
import HistoryList from "./components/HistoryList";

import { useState, useEffect } from "react";
import "./styles.css";

const BACKEND_URL = "http://localhost:4000";

function App() {
  const [city, setCity] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");
  const [result, setResult] = useState(null);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem("aqi-search-history");
    if (stored) {
      try {
        setHistory(JSON.parse(stored));
      } catch {
        // ignore
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("aqi-search-history", JSON.stringify(history.slice(0, 5)));
  }, [history]);

  const handleSearch = async (query) => {
    const value = (query ?? city).trim();
    if (!value) {
      setError("Please enter a city name.");
      return;
    }

    setError("");
    setStatus("Fetching air quality data...");
    setLoading(true);

    try {
      const params = new URLSearchParams({ city: value });
      const res = await fetch(`${BACKEND_URL}/api/aqi?${params.toString()}`);
      const data = await res.json();

      if (!res.ok) {
        const msg = data?.error || "Something went wrong.";
        setError(msg);
        setResult(null);
      } else {
        setResult(data);
        setHistory((prev) => {
          const without = prev.filter(
            (c) => c.toLowerCase() !== value.toLowerCase()
          );
          return [value, ...without].slice(0, 5);
        });
      }
    } catch (e) {
      console.error(e);
      setError("Network error. Check if backend is running.");
      setResult(null);
    } finally {
      setLoading(false);
      setStatus("");
    }
  };

  return (
    <div className="app-root">
      <div className="app-container">
        <header className="app-header">
          <div className="app-title">Air Quality Lookup</div>
          <div className="app-subtitle">
            Search by city to view real-time AQI and pollutant breakdown.
          </div>
        </header>

        {/* Search bar component */}
        <SearchBar
          city={city}
          onCityChange={setCity}
          onSearch={handleSearch}
          loading={loading}
        />

        <div className="status-text">{status}</div>
        {error && <div className="error-text">{error}</div>}

        {/* Result card component */}
        <ResultCard result={result} />

        {/* History list component */}
        <HistoryList
          history={history}
          onSelect={(selectedCity) => {
            setCity(selectedCity);
            handleSearch(selectedCity);
          }}
        />
      </div>
    </div>
  );
}

export default App;
