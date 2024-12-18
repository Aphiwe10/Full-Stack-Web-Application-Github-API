// errorMiddleware.js
const errorMiddleware = (err, req, res, next) => {
  console.error("Error: ", err.message);
  if (err.response) {
    console.error("Response Data: ", err.response.data);
  }
  res.status(err.response?.status || 500).json({
    error: err.message || "Internal Server Error",
    details: err.response?.data || null,
  });
};

module.exports = errorMiddleware;
