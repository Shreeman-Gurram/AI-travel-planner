import { createContext, useContext, useMemo, useState } from 'react'

const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const login = (credentials) => {
    setUser({
      name: credentials.name || 'Guest Traveler',
      email: credentials.email,
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
    })
    setIsAuthenticated(true)
  }

  const signup = (data) => {
    setUser({
      name: data.name,
      email: data.email,
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80',
    })
    setIsAuthenticated(true)
  }

  const logout = () => {
    setUser(null)
    setIsAuthenticated(false)
  }

  const continueAsGuest = () => {
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
