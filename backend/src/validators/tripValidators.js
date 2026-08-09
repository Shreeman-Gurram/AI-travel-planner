const { body, param } = require('express-validator');

const tripFields = [
  'destinationId',
  'destinationName',
  'title',
  'summary',
  'status',
  'travelType',
  'startDate',
  'endDate',
  'budget',
  'currency',
  'travelers',
  'accommodation',
  'foodPreference',
  'itinerary',
  'hotelSuggestions',
  'weatherSnapshot',
  'aiPrompt',
  'generatedFrom',
  'isPublic',
];

const validStatuses = ['draft', 'planned', 'active', 'completed', 'cancelled', 'archived'];
const validTravelTypes = ['solo', 'couple', 'family', 'friends', 'business', 'adventure', 'luxury'];
const validGeneratedFrom = ['manual', 'ai', 'template'];

const optionalString = (field, max) => body(field).optional().isString().trim().isLength({ max });

const tripValidationRules = (isCreate) => [
  body('destinationId').optional({ values: 'falsy' }).isMongoId().withMessage('Destination ID must be a valid MongoDB ObjectId'),
  isCreate
    ? body('destinationName').trim().notEmpty().withMessage('Destination is required').bail().isLength({ max: 200 }).withMessage('Destination cannot exceed 200 characters')
    : body('destinationName').optional().trim().notEmpty().withMessage('Destination cannot be empty').bail().isLength({ max: 200 }).withMessage('Destination cannot exceed 200 characters'),
  isCreate
    ? body('title').trim().isLength({ min: 3, max: 150 }).withMessage('Trip title must be between 3 and 150 characters')
    : body('title').optional().trim().isLength({ min: 3, max: 150 }).withMessage('Trip title must be between 3 and 150 characters'),
  optionalString('summary', 2000),
  body('status').optional().isIn(validStatuses).withMessage('Invalid trip status'),
  body('travelType').optional().isIn(validTravelTypes).withMessage('Invalid travel type'),
  isCreate
    ? body('startDate').isISO8601().toDate().withMessage('Start date must be a valid ISO date')
    : body('startDate').optional().isISO8601().toDate().withMessage('Start date must be a valid ISO date'),
  isCreate
    ? body('endDate').isISO8601().toDate().withMessage('End date must be a valid ISO date')
    : body('endDate').optional().isISO8601().toDate().withMessage('End date must be a valid ISO date'),
  body().custom((_, { req }) => {
    if (req.body.startDate && req.body.endDate && new Date(req.body.endDate) < new Date(req.body.startDate)) {
      throw new Error('End date must be on or after start date');
    }
    return true;
  }),
  body('budget').optional().isFloat({ min: 0 }).toFloat().withMessage('Budget cannot be negative'),
  body('currency').optional().isString().trim().isLength({ min: 3, max: 3 }).toUpperCase().withMessage('Currency must be a 3-letter code'),
  body('travelers').optional().isInt({ min: 1 }).toInt().withMessage('Travelers must be at least 1'),
  optionalString('accommodation', 100),
  optionalString('foodPreference', 100),
  body('itinerary').optional().isArray().withMessage('Itinerary must be an array'),
  body('hotelSuggestions').optional().isArray().withMessage('Hotel suggestions must be an array'),
  body('weatherSnapshot').optional().isObject().withMessage('Weather snapshot must be an object'),
  optionalString('aiPrompt', 5000),
  body('generatedFrom').optional().isIn(validGeneratedFrom).withMessage('Invalid generated-from value'),
  body('isPublic').optional().isBoolean().toBoolean().withMessage('isPublic must be true or false'),
];

const createTripValidation = tripValidationRules(true);
const updateTripValidation = tripValidationRules(false);
const tripIdValidation = [param('id').isMongoId().withMessage('Trip ID must be a valid MongoDB ObjectId')];
const generateTripValidation = [
  body('destination').trim().notEmpty().withMessage('Destination is required').bail().isLength({ max: 200 }),
  body('startDate').isISO8601().toDate().withMessage('Start date must be a valid ISO date'),
  body('endDate').isISO8601().toDate().withMessage('End date must be a valid ISO date'),
  body('budget').isFloat({ min: 0 }).toFloat().withMessage('Budget cannot be negative'),
  body('currency').isString().trim().isLength({ min: 3, max: 3 }).toUpperCase(),
  body('travelers').isInt({ min: 1 }).toInt().withMessage('Travelers must be at least 1'),
  body('travelType').isString().trim().notEmpty().withMessage('Travel type is required'),
  body('interests').optional().isString().trim().isLength({ max: 500 }),
  body('transportation').optional().isString().trim().isLength({ max: 100 }),
  body('accommodation').optional().isString().trim().isLength({ max: 100 }),
  body('foodPreference').optional().isString().trim().isLength({ max: 100 }),
  body('notes').optional().isString().trim().isLength({ max: 2000 }),
  body().custom((_, { req }) => { if (new Date(req.body.endDate) < new Date(req.body.startDate)) throw new Error('End date must be on or after start date'); return true; }),
];

module.exports = { createTripValidation, updateTripValidation, tripIdValidation, generateTripValidation, tripFields };
