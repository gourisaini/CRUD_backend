export const generatedErrors = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;

  if (
    err.name === "MongoServerError" &&
    err.message.includes("E11000 duplicate key")
  ) {
    err.message = "User Already Found";
  }

  res.status(statusCode).json({
    message: err.message,
    errName: err.name,
  });
};
