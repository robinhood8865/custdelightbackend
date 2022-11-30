const express = require("express");
const airtable = require("./airtable");

const airtableAPI = express.Router();

airtableAPI.post("/connectbase", airtable.connectBase);
airtableAPI.post("/signup", airtable.signup);
airtableAPI.post("/login", airtable.login);

module.exports = airtableAPI;
