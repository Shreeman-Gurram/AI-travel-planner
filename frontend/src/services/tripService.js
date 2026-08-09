import { parseApiResponse } from './apiError'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api'

const request = async (endpoint, token, options = {}) => {
  const response = await fetch(`${API_BASE_URL}/trips${endpoint}`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
      ...(options.headers || {}),
    },
    ...options,
  })

  return parseApiResponse(response, 'Trip request failed')
}

export const getTrips = (token) => request('', token)
export const generateTrip = (preferences, token) => request('/generate', token, { method: 'POST', body: JSON.stringify(preferences) })
export const getTripById = (id, token) => request(`/${id}`, token)
export const createTrip = (trip, token) => request('', token, { method: 'POST', body: JSON.stringify(trip) })
export const updateTrip = (id, trip, token) => request(`/${id}`, token, { method: 'PUT', body: JSON.stringify(trip) })
export const deleteTrip = (id, token) => request(`/${id}`, token, { method: 'DELETE' })
