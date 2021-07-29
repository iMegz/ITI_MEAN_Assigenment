const Book = require("../models/books.model");
const { isUrl, deleteIfExists } = require("../utils/utils");
const { rmSync, access } = require("fs");

exports.getAllBooks = async (req, res, next) => {
  const books = await Book.find({});
  if (books.length) {
    books.map((book) => {
      if (!isUrl(book.image)) book.image = "/img/" + book.image;
      book.date = book._id.getTimestamp().toString().substring(0, 24);
    });
  }
  res.render("index.pug", { books });
};

exports.delBook = async (req, res, next) => {
  const id = req.params.id;
  Book.findByIdAndDelete(id, (err, book) => {
    deleteIfExists(book.image);
  });
  res.redirect("/");
};

exports.addBook = async (req, res, next) => {
  const data = req.body;
  if (req.file) data.image = req.file.filename;
  const book = new Book(data);
  await book.save();
  res.redirect("/");
};
