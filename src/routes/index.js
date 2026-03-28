const express = require("express");
const appRoute = express.Router();

const authRoute = require("./auth.route.js");
const usersRoute = require("./users.route.js");
const ConverRoute = require("./conversations.route.js");

appRoute.use("/auth", authRoute);
appRoute.use("/conversations", ConverRoute);
appRoute.use("/users", usersRoute);

module.exports = appRoute;
