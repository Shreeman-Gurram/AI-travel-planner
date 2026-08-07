import { createContext, useContext, useMemo, useState } from 'react'
import { getProfile, loginUser, signupUser } from '../services/authService'

const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const login = async (credentials) => {
    const response = await loginUser(credentials)
    const token = response.data?.token
    const authUser = response.data?.user

    if (token) {
      localStorage.setItem('travelToken', token)
    }

    setUser({
      ...authUser,
      name: authUser?.name || credentials.name || 'Guest Traveler',
      email: authUser?.email || credentials.email,
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
    })
    setIsAuthenticated(true)
  }

  const signup = async (data) => {
    const response = await signupUser(data)
    const token = response.data?.token
    const authUser = response.data?.user

    if (token) {
      localStorage.setItem('travelToken', token)
    }

    setUser({
      ...authUser,
      name: authUser?.name || data.name,
      email: authUser?.email || data.email,
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80',
    })
    setIsAuthenticated(true)
  }

  const logout = () => {
    localStorage.removeItem('travelToken')
    setUser(null)
    setIsAuthenticated(false)
  }

  const continueAsGuest = () => {
    localStorage.removeItem('travelToken')
    setUser({
      name: 'Guest Traveler',
      email: 'guest@travelai.com',
      avatar: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?auto=format&fit=crop&w=150&q=80',
    })
    setIsAuthenticated(true)
  }

  const value = useMemo(
    () => ({ user, isAuthenticated, login, signup, logout, continueAsGuest }),
    [user, isAuthenticated]
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used within an AuthProvider')
  return context
}
