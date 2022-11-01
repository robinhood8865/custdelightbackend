const express = require("express");
const cors = require("cors");
const apis = require("./apis");

const routes = (app) => {
  app.use(cors());
  app.use("api", apis);
};

// var indexRouter = require("./index");
// var usersRouter = require("./users");

// var apis = require("./apis");
// const myroute = require("../myroute/myroute");
// const routes = (app) => {
//   app.use(cors());
//   app.use("/", indexRouter);
//   app.use("/users", usersRouter);
//   // app.use("/api", apis);
//   app.use("/my", myroute);
// };

module.exports = routes;
