const voucherServcie = require("./voucherService");

const createVoucher = async () => {
  const voucher = await voucherServcie.createVoucher({});
  return voucher;
};

const updateVoucherById = async (id, data) => {
  const voucher = await voucherServcie.updateVoucherById(id, data);
  return voucher;
};

const findOneById = async (id) => {
  const voucher = await voucherServcie.findOneById(id);
  return voucher;
};
const voucherController = {
  createVoucher,
  updateVoucherById,
  findOneById,
};

module.exports = voucherController;
