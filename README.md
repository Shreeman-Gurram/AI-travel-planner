# AI Travel Planner

React + Express travel planner with MongoDB, JWT authentication, user-owned Trip CRUD, and Gemini-powered itinerary generation.

## How the application works

User → React Planner → authenticated Express API → Gemini → validated structured JSON → MongoDB `trips` → React result page → User.

## Current architecture

- `frontend/`: React/Vite UI, form validation, API services, loading/result pages.
- `backend/src/routes`: auth and protected trip endpoints.
- `backend/src/controllers`: HTTP response handling.
- `backend/src/services`: auth, trip persistence, and Gemini API logic.
- `backend/src/models`: Mongoose User and Trip schemas.

## Implemented API

- `POST /api/auth/register`, `POST /api/auth/login`, `GET /api/auth/profile`
- `POST /api/trips`, `GET /api/trips`, `GET|PUT|DELETE /api/trips/:id`
- `POST /api/trips/generate` — protected Gemini generation and persistence.

## Gemini flow

The Planner sends destination, dates, budget, currency, travelers, travel type, interests, transportation, accommodation, food preference, and notes. Gemini returns structured itinerary activities, estimated budget allocation, tips, packing suggestions, best time, notes, and recommendations. The server validates and saves this on the authenticated user's Trip document.

Gemini never generates real hotel/restaurant listings, booking links, live weather, maps, contacts, ratings, or real-time prices.

## Setup

Copy `backend/.env.example` to `backend/.env`, set MongoDB, JWT, and `GEMINI_API_KEY`, then run `npm run dev` inside both `backend` and `frontend`.

Use Postman with a Bearer token to call `/api/trips/generate`. Verify the saved document in Atlas under `ai-travel-planner.trips`. In React: log in, submit Planner, wait on the loading page, and view the stored trip result. Refreshing then reloads saved trips.

## Validation and security

Frontend validation improves feedback; Express validation protects API inputs; Mongoose protects stored data. JWT controls every trip route; ownership always comes from `req.user`. API keys remain server-only in `.env` and must never be committed.

## Current limits and next phases

Gemini output is estimated/general, not live travel data. Future work: Google Places, OpenWeather, Google Maps, final deployment.
