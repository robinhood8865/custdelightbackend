const express = require("express");

const authAPI = require("../components/auth/authAPI");

const widgetAPI = require("../components/widgets/widgetAPI");
const widgetController = require("../components/widgets/widgetController");

const auth = require("../middleware/auth");
const uploadIcon = require("../services/uploadIcon");

const apis = express.Router();

apis.use("/auth", authAPI);
apis.use("/widget", auth, widgetAPI);
apis.post("/subdomain", widgetController.findOneByDomain);
apis.use("/upload", uploadIcon);

module.exports = apis;
