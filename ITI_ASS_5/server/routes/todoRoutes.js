const Router = require("express").Router();
const { readFileSync: read, writeFileSync: write } = require("fs");
const { join } = require("path");

Router.post("/add", (req, res) => {
  const todos = JSON.parse(read(join(__dirname, "../db/db.json")));
  todos.push(req.body);
  write(join(__dirname, "../db/db.json"), JSON.stringify(todos, null, 4));
  res.status(200).json({ msg: "succss" });
});

Router.get("/edit/:id", (req, res) => {
  const id = req.params.id;
  const todos = JSON.parse(read(join(__dirname, "../db/db.json")));
  const index = todos.findIndex((item) => item.id == id);
  todos[index].isChecked = !todos[index].isChecked;
  write(join(__dirname, "../db/db.json"), JSON.stringify(todos, null, 4));
  res.status(200).json({ msg: "Abdel Kader el gamed" });
});

Router.get("/delete/:id", (req, res) => {
  const id = req.params.id;
  const todos = JSON.parse(read(join(__dirname, "../db/db.json")));
  const index = todos.findIndex((item) => item.id == id);
  todos.splice(index, 1);
  write(join(__dirname, "../db/db.json"), JSON.stringify(todos, null, 4));
  res.status(200).json({ msg: "Abdel Kader el gamed" });
});

Router.get("/", (req, res) => {
  const todos = JSON.parse(read(join(__dirname, "../db/db.json")));
  res.status(200).json(todos);
});

module.exports = Router;
