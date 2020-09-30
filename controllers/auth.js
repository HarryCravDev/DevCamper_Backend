const User = require("../models/User");
const ErrorResponse = require("../utils/errorResponse");

// @desc    Register User
// @route   GET /api/v1/auth/register
// @access  Public
exports.register = async (req, res, next) => {
  try {
    const { name, email, password, role } = req.body;

    // Create User
    const user = await User.create({
      name,
      email,
      password,
      role,
    });

    // Create Token
    const token = user.getSignedJwtToken();

    res.status(200).json({
      success: true,
      token: token,
    });
  } catch (err) {
    next(err);
  }
};
