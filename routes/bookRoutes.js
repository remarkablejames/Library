const express = require("express");

const router = express.Router();
const {
  createBook,
  getAllBooks,
  getBook,
  updateBook,
  deleteBook,
} = require("../controllers/bookController");

// ROUTES
router.route("/").post(createBook).get(getAllBooks);

router.route("/:id").get(getBook).patch(updateBook).delete(deleteBook);

module.exports = router;
