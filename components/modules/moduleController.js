const moduleService = require("./moduleService");
const membershipController = require("../memberships/membershipController");
const voucherController = require("../vouchers/voucherController");

const createModule = async (data) => {
  if (!data) {
    console.log(ERROR.NO_DATA);
    return ERROR.NO_DATA;
  }
  const memebership = await membershipController.createMembership();
  const voucher = await voucherController.createVoucher();
  const modules = await moduleService.createModule({
    ...data,
    membershipId: memebership._id,
    voucherId: voucher._id,
  });
  return modules;
};

const findOneById = async (id) => {
  const modules = await moduleService.findOneById(id);
  return modules;
};

const updateModuleById = async (id, data) => {
  const modules = await moduleService.updateModuleById(id, data);
  return modules;
};

const moduleController = {
  createModule,
  findOneById,
  updateModuleById,
};

module.exports = moduleController;
