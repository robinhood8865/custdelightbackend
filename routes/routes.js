const express = require("express");
const cors = require("cors");

var indexRouter = require("./index");
var usersRouter = require("./users");

var apis = require("./a");
var api;

const routes = (app) => {
  app.use(cors());
  app.use("/", indexRouter);
  app.use("/users", usersRouter);
  app.use("/a", apis);
};

module.exports = routes;
