const express = require('express');
const { register, login, getProfile, logout } = require('../controllers/authController');
const protect = require('../middleware/authMiddleware');
const validateRequest = require('../middleware/validateRequest');
const { registerValidation, loginValidation } = require('../validators/authValidators');

const router = express.Router();

router.post('/register', registerValidation, validateRequest, register);
router.post('/login', loginValidation, validateRequest, login);
router.get('/profile', protect, getProfile);
router.post('/logout', protect, logout);

module.exports = router;
