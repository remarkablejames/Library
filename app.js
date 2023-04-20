const express = require("express");
const morgan = require("morgan");
const app = express();
const userRouter = require("./routes/userRoutes");
const bookRouter = require("./routes/bookRoutes");
// GENERAL MIDDLEWARES
app.use(express.json());
// logger middleware
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// ROUTES
app.use("/api/v1/user", userRouter);
app.use("/api/v1/book", bookRouter);

// ERROR HANDLING MIDDLEWARE
app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});

module.exports = app;
