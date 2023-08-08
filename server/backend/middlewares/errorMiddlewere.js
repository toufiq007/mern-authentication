const notFound = (req, res, next) => {
  res.status(404);
  const error = new Error("Page not Found!!");
  next(error);
};

const globalErrorHandler = (err, req, res, next) => {
  let statusCode = 404;
  let errorMessage = err.message ? err.message : "Something went wrong!!";

  res.status(statusCode).json({
    success: false,
    message: errorMessage,
    stack: process.env.NODE_ENV === "development" ? err.stack : null,
  });
};

export { notFound, globalErrorHandler };
