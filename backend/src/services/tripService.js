const Trip = require('../models/Trip');
const { tripFields } = require('../validators/tripValidators');

const createError = (message, statusCode) => Object.assign(new Error(message), { statusCode });

const pickTripFields = (data) => Object.fromEntries(
  tripFields.filter((field) => Object.prototype.hasOwnProperty.call(data, field)).map((field) => [field, data[field]])
);

const createTrip = async (userId, data) => Trip.create({ ...pickTripFields(data), userId });

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

module.exports = { createTrip, getUserTrips, getUserTrip, updateUserTrip, deleteUserTrip };
