const express = require('express');
const protect = require('../middleware/authMiddleware');
const validateRequest = require('../middleware/validateRequest');
const tripController = require('../controllers/tripController');
const { createTripValidation, updateTripValidation, tripIdValidation, generateTripValidation } = require('../validators/tripValidators');

const router = express.Router();

router.use(protect);
router.post('/generate', generateTripValidation, validateRequest, tripController.generateTrip);
router.route('/')
  .post(createTripValidation, validateRequest, tripController.createTrip)
  .get(tripController.getTrips);

router.route('/:id')
  .get(tripIdValidation, validateRequest, tripController.getTrip)
  .put(tripIdValidation, updateTripValidation, validateRequest, tripController.updateTrip)
  .delete(tripIdValidation, validateRequest, tripController.deleteTrip);

module.exports = router;
