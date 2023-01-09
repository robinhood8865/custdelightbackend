const stripe = require("stripe");
const STRIPE_SECRET_KEY = process.env.PLAN_STRIPE_SECRET_KEY;

const Stripe = stripe(STRIPE_SECRET_KEY, { apiVersion: "2022-11-15" });

const getClientSecret = async (req, res) => {
  const { amount, currency, metaData } = req.body;

  console.log("getClientSecret");
  console.log(amount, currency, metaData);
  if (amount === 0) return;
  const intent = await Stripe.paymentIntents.create({
    amount: amount,
    currency: currency,
    metadata: metaData,
    payment_method_types: ["card"],
  });
  res.json({ clientSecret: intent.client_secret });
};
const addNewCustomer = async (req) => {
  const { email, paymentMethodId } = req.body;
  const customer = await Stripe.customers.create({
    email,
    description: "New Customer",
  });
  await Stripe.paymentMethods.attach(paymentMethodId, {
    customer: customer.id,
  });
  await Stripe.payments.create();
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

const addNewProduct = async (voucher) => {
  const {
    voucherTitle,
    voucherType,
    voucherUsualPrice,
    voucherDiscountedPrice,
    voucherTerms,
  } = voucher;

  const product = await Stripe.products.create({
    name: voucherTitle,
    default_price_data: {
      unit_amount:
        voucherDiscountedPrice > 0
          ? voucherDiscountedPrice * 100
          : voucherUsualPrice * 100,
      currency: "usd",
    },
    expand: ["default_price"],
  });

  return product.id;
};

const updateProduct = async (voucher) => {
  const {
    voucherTitle,
    voucherType,
    voucherUsualPrice,
    voucherDiscountedPrice,
    voucherTerms,
    voucherProdId,
  } = voucher;

  const product = await stripe.products.retrieve(voucherProdId);
  if (!product) {
    await stripe.products.update(voucherProdId, {
      name: voucherTitle,
    });
  }
};

const deleteProduct = async (id) => {
  console.log("delete");
  const deleted = await Stripe.products.del(`{{prod_N35FsnHbjCW9Em}}`);
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
  deleteProduct,
  getCustomerById,
  getCustomerByEmail,
  addNewProduct,
  checkout,
  addVoucher,
  getClientSecret,
};
