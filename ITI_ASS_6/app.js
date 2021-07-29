const express = require("express");
const bodyParser = require("body-parser");
const { connect, connection } = require("mongoose");
const booksRouter = require("./routes/books.router");
const app = express();
const mongoDBSettings = { useNewUrlParser: true, useUnifiedTopology: true };
connect("mongodb://127.0.0.1/booksDB", mongoDBSettings);
const db = connection;
app.use(express.urlencoded({ extended: false }));

app.use(express.static("public"));
app.set("view engine", "pug");

app.use(booksRouter);

db.once("open", () => {
  console.log(`Connection established at ${db.host}:${db.port}`);
  app.listen(3000, () => console.log("Server Started"));
}).on("error", () => {
  console.log("DB Connection Failed");
});
