const express = require("express");
const stripe = require("./stripe");

const stripeAPI = express.Router();

stripeAPI.post("/checkout", stripe.checkout);
stripeAPI.post("/createProduct", stripe.addNewProduct);

module.exports = stripeAPI;
