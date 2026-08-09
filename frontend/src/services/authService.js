import { parseApiResponse } from './apiError'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ? `${import.meta.env.VITE_API_BASE_URL}/auth` : 'http://localhost:5000/api/auth'

const request = async (endpoint, options = {}) => {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
    ...options,
  })

  return parseApiResponse(response)
}

export const loginUser = (credentials) =>
  request('/login', {
    method: 'POST',
    body: JSON.stringify(credentials),
  })

export const signupUser = (data) =>
  request('/register', {
    method: 'POST',
    body: JSON.stringify(data),
  })

export const getProfile = (token) =>
  request('/profile', {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
