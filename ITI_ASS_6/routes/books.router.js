const Router = require("express").Router();
const controller = require("../controllers/books.controller");
const upload = require("../middlewares/upload")();

Router.get("/", controller.getAllBooks);

Router.get("/delete/:id", controller.delBook);

Router.post("/add", upload, controller.addBook);

module.exports = Router;
