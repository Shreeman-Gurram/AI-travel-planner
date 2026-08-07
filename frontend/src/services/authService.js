const API_BASE_URL = 'http://localhost:5000/api/auth'

const request = async (endpoint, options = {}) => {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
    ...options,
  })

  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.message || 'Request failed')
  }

  return data
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
