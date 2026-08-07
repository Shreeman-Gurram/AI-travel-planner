const { registerUser, loginUser, getUserProfile } = require('../services/authService');

const register = async (req, res, next) => {
  try {
    const result = await registerUser(req.body);
    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const result = await loginUser(req.body);
    res.status(200).json({
      success: true,
      message: 'Login successful',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const getProfile = async (req, res, next) => {
  try {
    const user = await getUserProfile(req.user.id);
    res.status(200).json({
      success: true,
      message: 'Profile fetched successfully',
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

const logout = (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Logout successful',
  });
};

module.exports = {
  register,
  login,
  getProfile,
  logout,
};
