const express = require("express");

const router = express.Router();
const {
  createBook,
  getAllBooks,
  getBook,
} = require("../controllers/bookController");

// ROUTES
router.route("/").post(createBook).get(getAllBooks);

router.route("/:id").get(getBook);

module.exports = router;
