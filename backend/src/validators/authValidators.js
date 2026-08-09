const { body } = require('express-validator');

const registerValidation = [
  body('name').trim().notEmpty().withMessage('Name is required').bail().isLength({ min: 2, max: 100 }).withMessage('Name must be between 2 and 100 characters'),
  body('email').trim().notEmpty().withMessage('Email is required').bail().isEmail().withMessage('Please enter a valid email').normalizeEmail(),
  body('password').notEmpty().withMessage('Password is required').bail().isLength({ min: 6, max: 72 }).withMessage('Password must be between 6 and 72 characters'),
];

const loginValidation = [
  body('email').trim().notEmpty().withMessage('Email is required').bail().isEmail().withMessage('Please enter a valid email').normalizeEmail(),
  body('password').notEmpty().withMessage('Password is required'),
];

module.exports = {
  registerValidation,
  loginValidation,
};
