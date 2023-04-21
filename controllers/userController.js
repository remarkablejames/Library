const User = require("../models/UserModel");
const catchAsync = require("../utilities/catchAsync");

exports.getAllUsers = catchAsync(async (req, res) => {
  const users = await User.find();

  res.status(200).json({
    status: "success",
    results: users.length,
    data: {
      users,
    },
  });
});
