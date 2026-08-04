import { hotels } from '../data/mockData'

export const getHotels = () => Promise.resolve(hotels)

export const getHotelById = (id) =>
  Promise.resolve(hotels.find((hotel) => hotel.id === id) || hotels[0])
