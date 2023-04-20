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
    return next(new AppError("No book found with that ID", 404));
  }
  res.status(200).json({
    status: "success",
    data: {
      book,
    },
  });
  return next();
});

exports.updateBook = catchAsync(async (req, res, next) => {
  const newBook = await Book.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  if (!newBook) {
    return next(new AppError("No book found with that ID", 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      book: newBook,
    },
  });
  return next();
});

exports.deleteBook = catchAsync(async (req, res, next) => {
  const book = await Book.findByIdAndDelete(req.params.id);
  if (!book) {
    return next(new AppError("No book found with that ID", 404));
  }

  res.status(200).json({
    status: "success",
    message: "Book deleted successfully",
  });
  return next();
});
