const express = require("express");

// const authAPI = require("../components/auth/authApi");
// const widgetAPI = require("../components/widgets/widgetApi");
// const widgetController = require("../components/widgets/widgetController");

// const auth = require("../middleware/auth");
// const uploadIcon = require("../services/uploadIcon");

const apis = express.Router();

// apis.use("/auth", authAPI);
// apis.use("/widget", auth, widgetAPI);
// apis.post("/subdomain", widgetController.findOneByDomain);
// apis.use("/upload", uploadIcon);
apis.get("/", function (req, res, next) {
  res.send("apis");
});

module.exports = apis;