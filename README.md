# AI Travel Planner

React + Express travel planner with MongoDB, JWT authentication, user-owned Trip CRUD, Gemini-powered itinerary generation, and Open-Meteo weather forecasts.

## How the application works

User → React Planner → authenticated Express API → (Gemini + Open-Meteo) → validated structured JSON → MongoDB `trips` → React result page → User.

**Detailed flow:**
- User submits trip preferences (destination, dates, interests, budget, etc.)
- Backend generates AI itinerary via Gemini API
- Backend fetches weather forecast via Open-Meteo APIs (Geocoding + Forecast)
- Trip document saved with both Gemini itinerary and real weather data
- Frontend displays complete trip plan with accurate forecast

## Current architecture

- `frontend/`: React/Vite UI, form validation, API services, loading/result pages.
- `backend/src/routes`: auth and protected trip endpoints.
- `backend/src/controllers`: HTTP response handling.
- `backend/src/services`: auth, trip persistence, Gemini API, and weather service.
- `backend/src/models`: Mongoose User and Trip schemas with weather data.
- `backend/src/utils`: Weather code mapping utility.

## Implemented API

- `POST /api/auth/register`, `POST /api/auth/login`, `GET /api/auth/profile`
- `POST /api/trips`, `GET /api/trips`, `GET|PUT|DELETE /api/trips/:id`
- `POST /api/trips/generate` — protected Gemini generation + weather forecast, persists to MongoDB.

## Gemini flow

The Planner sends destination, dates, budget, currency, travelers, travel type, interests, transportation, accommodation, food preference, and notes. Gemini returns structured itinerary activities, estimated budget allocation, tips, packing suggestions, best time, notes, and recommendations. The server validates and saves this on the authenticated user's Trip document.

Gemini never generates real hotel/restaurant listings, booking links, live weather, maps, contacts, ratings, or real-time prices.

## Weather integration (PHASE 7)

Open-Meteo provides **free** weather data without authentication:

1. **Geocoding API** converts destination name → latitude, longitude, timezone
2. **Forecast API** retrieves daily forecast for the trip date range:
   - Temperature (min/max in °C)
   - Precipitation probability
   - Weather condition (WMO codes mapped to readable descriptions)
   - Wind speed (km/h)
3. **Weather is stored** in the Trip document as a structured forecast array
4. **Frontend displays** real weather with icons, daily forecast, and conditions

**Weather data structure** (stored in Trip.weather):
```json
{
  "location": "Paris",
  "country": "France",
  "timezone": "Europe/Paris",
  "latitude": 48.8566,
  "longitude": 2.3522,
  "forecast": [
    {
      "date": "2026-08-20",
      "minTemperature": 16,
      "maxTemperature": 25,
      "precipitationProbability": 20,
      "condition": "Partly cloudy",
      "weatherCode": 2,
      "windSpeed": 12,
      "icon": "⛅"
    }
  ]
}
```

**Why Open-Meteo:**
- Free tier: no API key required
- Reliable: publicly available WMO weather codes
- Lightweight: only essential fields requested
- Accurate: real meteorological data, 16-day forecast available
- Privacy-friendly: no tracking or authentication overhead

**Error handling:**
- Destination not found → User-friendly message
- Forecast > 16 days → Clear message about forecast limits
- API timeouts → Trip still generates without weather (graceful degradation)
- Weather failures don't block trip creation

## Setup

Copy `backend/.env.example` to `backend/.env`, set MongoDB and `GEMINI_API_KEY`, then run `npm run dev` inside both `backend` and `frontend`.

Use Postman with a Bearer token to call `/api/trips/generate`. Verify the saved document in Atlas under `ai-travel-planner.trips` — you'll see the full `weather` object with forecast array. In React: log in, submit Planner, wait on the loading page (which now shows "Checking weather forecast..."), and view the stored trip result with real weather data.

## Validation and security

Frontend validation improves feedback; Express validation protects API inputs; Mongoose protects stored data. JWT controls every trip route; ownership always comes from `req.user`. API keys remain server-only in `.env` and must never be committed. Weather API calls happen exclusively on the backend.

## Files created/modified (PHASE 7)

**Created:**
- `backend/src/services/weatherService.js` — Open-Meteo geocoding and forecast integration
- `backend/src/utils/weatherCodeMap.js` — WMO weather code to readable descriptions

**Modified:**
- `backend/src/models/Trip.js` — Expanded weather schema with location, timezone, forecast array
- `backend/src/services/tripService.js` — Integrated weather fetching into generateUserTrip
- `frontend/src/pages/LoadingPage.jsx` — Added weather fetching step to progress display
- `frontend/src/components/ui/WeatherCard.jsx` — Updated to display real forecast data
- `frontend/src/pages/TripDetailPage.jsx` — Changed from mock to real trip weather data

## Testing (manual)

1. Start backend: `npm run dev` in `backend/`
2. Start frontend: `npm run dev` in `frontend/`
3. Register/login in React
4. Submit trip planner with valid destination and dates (max 16 days in advance)
5. Watch loading page show "Checking weather forecast..." step
6. View trip result — weather card now displays real forecast
7. Verify in MongoDB Atlas — Trip document includes full weather object
8. Test edge cases:
   - Invalid destination → clear error message
   - Dates > 16 days out → forecast unavailable message
   - Trip still generates if weather API fails (graceful)

## Current limits and next phases

Gemini output is estimated/general, not live travel data. Weather is accurate for the next 16 days. Future work: Google Places for hotels, location details, final deployment.

