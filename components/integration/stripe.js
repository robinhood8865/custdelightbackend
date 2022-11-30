const stripe = require("stripe");
const STRIPE_SECRET_KEY = process.env.PLAN_STRIPE_SECRET_KEY;

const Stripe = stripe(STRIPE_SECRET_KEY, { apiVersion: "2022-11-15" });

const addNewCustomer = async (email) => {
  const customer = await Stripe.create({
    email,
    description: "New Customer",
  });
  return customer;
};

const getCustomerById = async (id) => {
  const customer = await Stripe.customers.retrieve(id);
  return customer;
};

const getCustomerByEmail = async (email) => {
  const customer = await Stripe.customers.list({
    email: email,
  });
  return customer;
};

const addNewProduct = async (name) => {
  const product = await Stripe.product.create({
    name: name,
  });
  return product;
};

const deleteProduct = async (id) => {
  const deleted = await Stripe.product.del(id);
  return deleted;
};

const checkout = async (req, res) => {
  const { email } = req.body;
};

const addVoucher = async (req, res) => {
  const { title, price } = req.body;
};

module.exports = {
  addNewCustomer,
  getCustomerById,
  getCustomerByEmail,
  addNewProduct,
  checkout,
  addVoucher,
};
