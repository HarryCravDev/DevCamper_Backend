const ErrorResponse = require("../utils/errorResponse");

const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;

  // Log Error to console for Dev
  console.log(err.stack.red);

  // Check for CastError
  if (err.name === "CastError") {
    const message = `Bootcamp could not be found with id ${err.value}`;
    error = new ErrorResponse(message, 404);
  }

  // Check for Code 11000
  if (err.code === 11000) {
    const message = `Duplicate field value entered.`;
    error = new ErrorResponse(message, 400);
  }

  // Mongoose validation error
  if (err.name === "ValidationError") {
    const message = Object.values(err.errors).map(
      (value) => `${value.message} `
    );
    error = new ErrorResponse(message, 400);
  }

  res.status(error.statusCode || 500).json({
    success: false,
    message: error.message || "Server Error.",
  });
};

module.exports = errorHandler;
