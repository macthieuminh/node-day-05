require("dotenv").config();

const express = require("express");
require("./src/config/database");

const appRoute = require("./src/routes/index");
const errorHandler = require("./src/middlewares/errorHandler");
const notFound = require("./src/middlewares/notFound");
const response = require("./src/middlewares/response");

const app = express();
const port = process.env.DB_PORT || 3000;

app.use(express.json());
app.use(response);

app.use("/api", appRoute);
app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
