const voucherService = require("./voucherService");

const createVoucher = async () => {
  const voucher = await voucherService.createVoucher({});
  return voucher;
};

const updateVoucherById = async (id, data) => {
  const voucher = await voucherService.updateVoucherById(id, data);
  return voucher;
};

const findOneById = async (id) => {
  const voucher = await voucherService.findOneById(id);
  return voucher;
};
const voucherController = {
  createVoucher,
  updateVoucherById,
  findOneById,
};

module.exports = voucherController;
