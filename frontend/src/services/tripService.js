import { mockTrips, itineraryTemplates, budgetBreakdown } from '../data/mockData'

export const getTrips = () =>
  Promise.resolve(mockTrips)

export const getTripById = (id) =>
  Promise.resolve(mockTrips.find((trip) => trip.id === id) || mockTrips[0])

export const getItinerary = () =>
  Promise.resolve(itineraryTemplates)

export const getBudgetBreakdown = () =>
  Promise.resolve(budgetBreakdown)
