const tripService = require('../services/tripService');

const createTrip = async (req, res, next) => {
  try {
    const trip = await tripService.createTrip(req.user.id, req.body);
    res.status(201).json({ success: true, message: 'Trip created successfully', data: trip });
  } catch (error) {
    next(error);
  }
};

const getTrips = async (req, res, next) => {
  try {
    const trips = await tripService.getUserTrips(req.user.id);
    res.status(200).json({ success: true, data: trips });
  } catch (error) {
    next(error);
  }
};

const getTrip = async (req, res, next) => {
  try {
    const trip = await tripService.getUserTrip(req.user.id, req.params.id);
    res.status(200).json({ success: true, data: trip });
  } catch (error) {
    next(error);
  }
};

const updateTrip = async (req, res, next) => {
  try {
    const trip = await tripService.updateUserTrip(req.user.id, req.params.id, req.body);
    res.status(200).json({ success: true, message: 'Trip updated successfully', data: trip });
  } catch (error) {
    next(error);
  }
};

const deleteTrip = async (req, res, next) => {
  try {
    await tripService.deleteUserTrip(req.user.id, req.params.id);
    res.status(200).json({ success: true, message: 'Trip deleted successfully' });
  } catch (error) {
    next(error);
  }
};

module.exports = { createTrip, getTrips, getTrip, updateTrip, deleteTrip };
