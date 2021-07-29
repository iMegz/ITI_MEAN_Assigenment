const { Schema, model } = require("mongoose");
const booksSchema = new Schema({
  title: String,
  author: String,
  image: String,
});

module.exports = model("Book", booksSchema);
