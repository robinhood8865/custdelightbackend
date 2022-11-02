const express = require("express");
const cors = require("cors");
const apis = require("./apis");

const routes = (app) => {
  app.use(cors());
  app.use("/api", apis);
};

module.exports = routes;
