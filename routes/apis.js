const express = require("express");
const airtableAPI = require("../components/airtable/airtableApi");
const airtableController = require("../components/airtable/airtableController");

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
apis.use("/updateapikey", airtableController.updateAirtableById);
apis.use("/airtableApi", airtableAPI);

module.exports = apis;
