const express = require("express");
const airtableAPI = require("../components/integration/airtableApi");
const integrationController = require("../components/integration/integrationController");

const authAPI = require("../components/auth/authAPI");
const stripeAPI = require("../components/integration/stripeAPI");

const widgetAPI = require("../components/widgets/widgetAPI");
const widgetController = require("../components/widgets/widgetController");

const auth = require("../middleware/auth");
const uploadIcon = require("../services/uploadIcon");

const apis = express.Router();

apis.use("/auth", authAPI);
apis.use("/widget", auth, widgetAPI);
apis.post("/subdomain", widgetController.findOneByDomain);
apis.use("/upload", uploadIcon);
apis.use("/updateapikey", integrationController.updateIntegrationById);
apis.use("/airtableApi", airtableAPI);
apis.use("/stripeApi", stripeAPI);

module.exports = apis;
