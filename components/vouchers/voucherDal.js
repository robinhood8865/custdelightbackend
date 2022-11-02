const mongoose = require("mongoose");

const voucherSchema = new mongoose.Schema({
  vouchers: {
    type: Object,
    default: [],

    // voucherTitle: { type: String, default: "" },
    // voucherType: { type: Number, default: 1 },
    // voucherExpiryTerm: { type: Number, default: 1 },
    // voucherUsualPrice: { type: Number, default: 1 },
    // voucherDiscountedPrice: { type: Number, default: 1 },
    // voucherTerms: { type: String, default: "" },
  },
  voucherFirstName: { type: Boolean, default: false },
  voucherLastName: { type: Boolean, default: false },
  voucherEmail: { type: Boolean, default: false },
  voucherMobileNumber: { type: Boolean, default: false },
  redemptionType: { type: Boolean, default: false },
  redemption: { type: Number, default: 200 },
});

const Voucher = mongoose.model("Voucher", voucherSchema);
module.exports = Voucher;
