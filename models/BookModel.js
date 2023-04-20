const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "A book must have a title"],
    unique: true,
  },
  author: {
    type: String,
    required: [true, "A book must have an author"],
  },
  publisher: {
    type: String,
    required: [true, "A book must have a publisher"],
  },
  price: {
    type: Number,
    required: [true, "A book must have a price"],
  },
  rating: {
    type: Number,
    default: 4.5,
  },
  summary: {
    type: String,
    trim: true,
    // required: [true, "A book must have a summary"],
  },
  coverImage: {
    type: String,
    // required: [true, "A book must have a cover image"],
  },
});

const Book = mongoose.model("Book", bookSchema);

module.exports = Book;
