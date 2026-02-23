require("dotenv").config();

const express = require("express");
const app = express();

require("./src/config/database");

const port = process.env.PORT || 3000;
const response = require("./src/middlewares/response");

const router = require("./src/routes/index");

app.use(express.json());
app.use(response);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
