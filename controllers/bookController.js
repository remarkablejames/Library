const Book = require("../models/BookModel");

const AppError = require("../utilities/AppError");
const catchAsync = require("../utilities/catchAsync");

exports.createBook = catchAsync(async (req, res) => {
  const newBook = await Book.create(req.body);
  res.status(201).json({
    status: "success",
    data: {
      book: newBook,
    },
  });
});

exports.getAllBooks = catchAsync(async (req, res) => {
  const books = await Book.find();
  res.status(200).json({
    status: "success",
    results: books.length,
    data: {
      books,
    },
  });
});

exports.getBook = catchAsync(async (req, res, next) => {
  const book = await Book.findById(req.params.id);
  if (!book) {
    next(new AppError("No book found with that ID", 404));
  }
  res.status(200).json({
    status: "success",
    data: {
      book,
    },
  });
});

exports.updateBook = catchAsync(async (req, res) => {
  const newBook = await Book.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.status(200).json({
    status: "success",
    data: {
      book: newBook,
    },
  });
});

exports.deleteBook = catchAsync(async (req, res) => {
  await Book.findByIdAndDelete(req.params.id);
  res.status(200).json({
    status: "success",
    message: "Book deleted successfully",
  });
});
