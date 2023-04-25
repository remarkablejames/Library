const User = require("../models/UserModel");

const catchAsync = require("../utilities/catchAsync");

const jwt = require("jsonwebtoken");

const AppError = require("../utilities/AppError");

exports.signup = catchAsync(async (req, res, next) => {
  const { name, email, password, passwordConfirm } = req.body;
  console.log(req.body);
  const newUser = await User.create({
    name,
    email,
    password,
    passwordConfirm,
  });

  const jwtPayload = {
    id: newUser._id,
  };

  const token = jwt.sign(jwtPayload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

  res.status(201).json({
    status: "success",
    token,
    data: {
      user: newUser,
    },
  });
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new AppError("Please provide email and password", 400));
  }
  // 2) Check if user exists && password is correct

  const user = await User.findOne({ email }).select("+password");

  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError("Incorrect email or password", 401));
  }

  console.log(user);

  // 3) If everything ok, send token to client
  const jwtOptions = {
    expiresIn: process.env.JWT_EXPIRES_IN,
  };
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, jwtOptions);

  res.status(200).json({
    status: "success",
    token,
  });
});
