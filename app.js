const express = require("express");

const morgan = require("morgan");

const cors = require("cors");

const AppError = require("./utilities/AppError");

const app = express();
const userRouter = require("./routes/userRoutes");
const bookRouter = require("./routes/bookRoutes");
// GENERAL MIDDLEWARES
app.use(express.json());
// logger middleware
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
app.use(cors());

// ROUTES
app.use("/api/v1/users", userRouter);
app.use("/api/v1/books", bookRouter);

// 404 MIDDLEWARE
app.all("*", (req, res, next) => {
  // res.status(404).json({
  //   status: "fail",
  //   message: `Can't find ${req.originalUrl} on this server!`,
  // });

  const err = new Error(`Can't find ${req.originalUrl} on this server!`);
  err.status = "fail";
  err.statusCode = 404;
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

// GLOBAL ERROR HANDLING MIDDLEWARE
app.use((err, req, res, next) => {
  const errorCode = err.statusCode || 500;
  const errorMessage = err.message || "Internal Server Error";

  if (process.env.NODE_ENV === "development") {
    res.status(errorCode).json({
      status: err.status,
      message: errorMessage,
      stack: err.stack,
    });
  } else if (process.env.NODE_ENV === "production") {
    res.status(errorCode).json({
      status: err.status,
      message: errorMessage,
    });
  }
  next();
});

module.exports = app;
