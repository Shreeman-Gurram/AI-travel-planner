const Trip = require('../models/Trip');
const { tripFields } = require('../validators/tripValidators');
const { generateTravelPlan } = require('./geminiService');
const { getWeatherForTrip } = require('./weatherService');

const createError = (message, statusCode) => Object.assign(new Error(message), { statusCode });

const pickTripFields = (data) => Object.fromEntries(
  tripFields.filter((field) => Object.prototype.hasOwnProperty.call(data, field)).map((field) => [field, data[field]])
);

const createTrip = async (userId, data) => Trip.create({ ...pickTripFields(data), userId });

const travelTypeMap = { Relaxing: 'solo', Adventure: 'adventure', Cultural: 'friends', Romantic: 'couple', Family: 'family', Foodie: 'friends' };
const generateUserTrip = async (userId, data) => {
  const plan = await generateTravelPlan(data);
  
  // Fetch weather data for the trip destination and dates
  let weather = {};
  try {
    console.log('[WEATHER] Fetching weather for:', data.destination, 'Dates:', data.startDate, 'to', data.endDate);
    weather = await getWeatherForTrip(data.destination, data.startDate, data.endDate);
    console.log('[WEATHER] Success! Got weather for:', weather.location);
  } catch (weatherError) {
    // Log weather error but don't fail trip generation
    console.error('[WEATHER_ERROR]', weatherError.message);
    console.error('[WEATHER_ERROR] Stack:', weatherError.stack);
    // Continue with empty weather object - trip generation succeeds even if weather fails
  }

  console.log('[TRIP] Creating trip with weather:', weather);
  
  return Trip.create({
    userId, destinationName: data.destination, title: plan.tripSummary.title, summary: plan.tripSummary.description,
    startDate: data.startDate, endDate: data.endDate, budget: data.budget, currency: data.currency, travelers: data.travelers,
    travelType: travelTypeMap[data.travelType] || 'solo', accommodation: data.accommodation || 'hotel', foodPreference: data.foodPreference || 'local cuisine',
    transportationPreference: data.transportation || '', interests: (data.interests || '').split(',').map((item) => item.trim()).filter(Boolean), aiPrompt: data.notes || '', generatedFrom: 'ai',
    itinerary: plan.itinerary, budgetPlan: plan.budgetPlan, travelTips: plan.travelTips, packingSuggestions: plan.packingSuggestions, bestTime: plan.bestTime,
    importantNotes: plan.importantNotes, personalizedRecommendations: plan.personalizedRecommendations,
    weather: weather || {},
  });
};

const getUserTrips = async (userId) => Trip.find({ userId }).sort({ createdAt: -1 });

const getUserTrip = async (userId, tripId) => {
  const trip = await Trip.findOne({ _id: tripId, userId });
  if (!trip) throw createError('Trip not found', 404);
  return trip;
};

const updateUserTrip = async (userId, tripId, data) => {
  const updates = pickTripFields(data);
  if (!Object.keys(updates).length) throw createError('Provide at least one trip field to update', 400);

  const trip = await Trip.findOne({ _id: tripId, userId });
  if (!trip) throw createError('Trip not found', 404);

  Object.assign(trip, updates);
  if (trip.endDate < trip.startDate) throw createError('End date must be on or after start date', 400);
  await trip.save();
  return trip;
};

const deleteUserTrip = async (userId, tripId) => {
  const trip = await Trip.findOneAndDelete({ _id: tripId, userId });
  if (!trip) throw createError('Trip not found', 404);
};

module.exports = { createTrip, generateUserTrip, getUserTrips, getUserTrip, updateUserTrip, deleteUserTrip };
