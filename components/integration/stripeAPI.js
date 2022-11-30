const express = require("express");
const stripe = require("./stripe");

const stripeAPI = express.Router();

stripeAPI.post("/checkout", stripe.checkout);

module.exports = stripeAPI;
