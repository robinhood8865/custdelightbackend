const express = require("express");
const stripe = require("./stripe");

const stripeAPI = express.Router();

stripeAPI.post("/connectbase", stripe.connectBase);
stripeAPI.post("/signup", stripe.signup);
stripeAPI.post("/login", stripe.login);

module.exports = stripeAPI;
