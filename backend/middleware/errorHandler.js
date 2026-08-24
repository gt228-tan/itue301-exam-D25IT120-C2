function errorHandler(err, req, res, next) {
  console.error(err.message);

  if (err.name === "ValidationError") {
    const messages = Object.values(err.errors)
      .map((error) => error.message);

    return res.status(400).json({
      success: false,
      message: "Validation failed",
      errors: messages
    });
  }

  if (err.code === 11000) {
    return res.status(400).json({
      success: false,
      message: "Email already exists"
    });
  }

  res.status(500).json({
    success: false,
    message: "Internal Server Error"
  });
}

module.exports = errorHandler;