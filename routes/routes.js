const express = require("express");
const cors = require("cors");

var indexRouter = require("./index");
var usersRouter = require("./users");

// const apis = require("./apis");

const routes = (app) => {
  app.use(cors());
  app.use("/", indexRouter);
  app.use("/users", usersRouter);
  // app.use("/api", apis);
};

module.exports = routes;
