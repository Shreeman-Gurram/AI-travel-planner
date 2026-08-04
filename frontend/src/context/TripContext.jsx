import { createContext, useContext, useMemo, useState } from 'react'
import { mockTrips } from '../data/mockData'

const TripContext = createContext(null)

export const TripProvider = ({ children }) => {
  const [trips, setTrips] = useState(mockTrips)
  const [activeTrip, setActiveTrip] = useState(mockTrips[0])
  const [savedTrips, setSavedTrips] = useState(mockTrips.slice(0, 3))

  const saveTrip = (trip) => {
    setSavedTrips((current) => (current.some((item) => item.id === trip.id) ? current : [trip, ...current]))
  }

  const deleteTrip = (tripId) => {
    setSavedTrips((current) => current.filter((trip) => trip.id !== tripId))
  }

  const toggleFavorite = (tripId) => {
    setSavedTrips((current) =>
      current.map((trip) => (trip.id === tripId ? { ...trip, favorite: !trip.favorite } : trip))
    )
  }

  const generateTrip = (plannerData) => {
    const newTrip = {
      id: Date.now().toString(),
      title: `${plannerData.destination} Escape`,
      destination: plannerData.destination,
      image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1000&q=80',
      budget: plannerData.budget,
      travelers: plannerData.travelers,
      startDate: plannerData.startDate,
      endDate: plannerData.endDate,
      type: plannerData.travelType,
      favorite: false,
      aiPowered: true,
      summary: 'A hand-crafted itinerary featuring local dining, curated experiences, and a balanced budget.',
    }

    setTrips((current) => [newTrip, ...current])
    setActiveTrip(newTrip)
    return newTrip
  }

  const value = useMemo(
    () => ({ trips, activeTrip, savedTrips, setActiveTrip, saveTrip, deleteTrip, toggleFavorite, generateTrip }),
    [trips, activeTrip, savedTrips]
  )

  return <TripContext.Provider value={value}>{children}</TripContext.Provider>
}

export const useTrip = () => {
  const context = useContext(TripContext)
  if (!context) throw new Error('useTrip must be used within a TripProvider')
  return context
}
