const express = require("express");
const widgetController = require("./widgetController");
const uploadIcon = require("../../services/uploadIcon");
const widgetAPI = express.Router();

widgetAPI.post("/", widgetController.updateWidget);
widgetAPI.get("/", widgetController.readWidget);
widgetAPI.post("/uploadicon", widgetController.uploadIcon);
widgetAPI.post("/updateapikey");

module.exports = widgetAPI;
