const express = require("express");
const stripe = require("./stripe");

const stripeAPI = express.Router();

stripeAPI.post("/checkout", stripe.checkout);
stripeAPI.post("/createProduct", stripe.addNewProduct);
stripeAPI.post("/getClientSecret", stripe.getClientSecret);

module.exports = stripeAPI;
