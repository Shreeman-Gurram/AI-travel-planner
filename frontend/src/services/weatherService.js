import { weatherSnapshots } from '../data/mockData'

export const getWeather = (city) =>
  Promise.resolve(weatherSnapshots.find((item) => item.city === city) || weatherSnapshots[0])
