const express = require("express");
const { signup, login } = require("../controllers/authController");
const { getAllUsers } = require("../controllers/userController");

const router = express.Router();

// ROUTES
router.route("/").get(getAllUsers);
router.route("/signup").post(signup);
router.route("/login").post(login);

module.exports = router;
