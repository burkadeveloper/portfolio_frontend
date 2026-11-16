module.exports = (err, req, res, next) => {
  console.error("💥 Error:", err.name || "Error", "—", err.message);

  let status = res.statusCode && res.statusCode !== 200 ? res.statusCode : 500;

  // Map common Mongoose errors to proper HTTP codes
  if (err.name === "ValidationError") status = 400;
  if (err.name === "CastError") status = 400;
  if (err.code === 11000) status = 409; // duplicate key

  const body = { message: err.message || "Server error" };
  if (err.name === "ValidationError" && err.errors) {
    body.errors = Object.fromEntries(
      Object.entries(err.errors).map(([k, v]) => [k, v.message]),
    );
  }

  res.status(status).json(body);
};
