# 🌍 Air Quality Lookup – Real-time AQI by City
A full-stack application to search and display real-time Air Quality Index (AQI) by city.
## 🚀 Features
- Search AQI by city name
- Shows AQI category (Good → Hazardous)
- Displays pollutant breakdown (PM2.5, PM10, O₃, NO₂, SO₂ etc.)
- Backend caching for performance
- Recent search history
- Clean UI built in React
## 🏗️ Tech Stack
Backend: Node.js, Express, Axios, Dotenv  
Frontend: React (Vite), JavaScript, CSS  
API: AQICN (https://aqicn.org/api/)
## 🔌 API Endpoint
GET /api/aqi?city={cityName}
## 🗄️ Backend Setup
cd backend  
npm install  
Create .env in backend:
PORT=4000  
AQICN_API_TOKEN=YOUR_TOKEN_HERE  
CACHE_TTL_MS=300000  
CACHE_MAX_ENTRIES=100  
Run backend:
npm run start  
Backend runs at: http://localhost:4000
## 🎨 Frontend Setup
cd frontend  
npm install  
npm run dev  
Frontend runs at: http://localhost:5173
## 🙌 Author
Abhyudaya Tiwari
