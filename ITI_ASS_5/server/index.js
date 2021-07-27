const express = require("express");
const headers = require("./middlewares/headers");
const todoRouter = require("./routes/todoRoutes");
const app = express();

app.use(express.json());
app.use(headers);

app.use(todoRouter);

app.listen(3000, () => {
  console.log("Started");
});
