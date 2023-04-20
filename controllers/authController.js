const User = require("../models/UserModel");

const catchAsync = require("../utilities/catchAsync");

// const AppError = require("../utilities/AppError");

exports.signup = catchAsync(async (req, res, next) => {
  const newUser = await User.create(req.body);
  res.status(201).json({
    status: "success",
    data: {
      user: newUser,
    },
  });
});
