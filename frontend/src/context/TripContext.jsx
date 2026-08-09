import { createContext, useCallback, useContext, useEffect, useState } from 'react'
import { useAuth } from './AuthContext'
import * as tripApi from '../services/tripService'

const TripContext = createContext(null)

const travelTypeMap = {
  Relaxing: 'solo', Adventure: 'adventure', Cultural: 'friends', Romantic: 'couple', Family: 'family', Foodie: 'friends',
}

const toClientTrip = (trip) => ({
  ...trip,
  id: trip._id,
  destination: trip.destinationName || 'Unknown destination',
  type: trip.travelType,
  favorite: trip.isPublic,
  image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1000&q=80',
  startDate: trip.startDate ? new Date(trip.startDate).toISOString().slice(0, 10) : '',
  endDate: trip.endDate ? new Date(trip.endDate).toISOString().slice(0, 10) : '',
})

export const TripProvider = ({ children }) => {
  const { isAuthenticated } = useAuth()
  const [trips, setTrips] = useState([])
  const [activeTrip, setActiveTrip] = useState(null)
  const [isLoadingTrips, setIsLoadingTrips] = useState(false)
  const [pendingTripData, setPendingTripData] = useState(null)

  const getToken = () => localStorage.getItem('travelToken')

  const loadTrips = useCallback(async () => {
    const token = getToken()
    if (!token) {
      setTrips([])
      return []
    }

    setIsLoadingTrips(true)
    try {
      const response = await tripApi.getTrips(token)
      const loadedTrips = response.data.map(toClientTrip)
      setTrips(loadedTrips)
      return loadedTrips
    } finally {
      setIsLoadingTrips(false)
    }
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => {
      if (isAuthenticated) loadTrips().catch(() => setTrips([]))
      else setTrips([])
    }, 0)

    return () => clearTimeout(timer)
  }, [isAuthenticated, loadTrips])

  const generateTrip = async (plannerData) => {
    const token = getToken()
    if (!token) throw new Error('Please log in before creating a trip')

    const response = await tripApi.generateTrip(plannerData, token)

    const newTrip = toClientTrip(response.data)
    setTrips((current) => [newTrip, ...current])
    setActiveTrip(newTrip)
    setPendingTripData(null)
    return newTrip
  }

  const deleteTrip = async (tripId) => {
    await tripApi.deleteTrip(tripId, getToken())
    setTrips((current) => current.filter((trip) => trip.id !== tripId))
    setActiveTrip((current) => (current?.id === tripId ? null : current))
  }

  const toggleFavorite = async (tripId) => {
    const currentTrip = trips.find((trip) => trip.id === tripId)
    if (!currentTrip) return
    const response = await tripApi.updateTrip(tripId, { isPublic: !currentTrip.favorite }, getToken())
    const updatedTrip = toClientTrip(response.data)
    setTrips((current) => current.map((trip) => (trip.id === tripId ? updatedTrip : trip)))
  }

  const saveTrip = (trip) => setActiveTrip(trip)
  const savedTrips = trips

  const value = {
    trips, activeTrip, savedTrips, isLoadingTrips, pendingTripData, setPendingTripData, setActiveTrip, saveTrip, deleteTrip, toggleFavorite, generateTrip, loadTrips,
  }

  return <TripContext.Provider value={value}>{children}</TripContext.Provider>
}

export const useTrip = () => {
  const context = useContext(TripContext)
  if (!context) throw new Error('useTrip must be used within a TripProvider')
  return context
}
