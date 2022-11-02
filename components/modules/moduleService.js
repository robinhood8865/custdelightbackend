const Module = require("./moduleDal");

const createModule = async (data) => {
  const modules = new Module(data);
  const _modules = modules.save();
  return _modules;
};

const findOneById = async (id) => {
  const modules = await Module.findById(id)
    .populate("membership")
    .populate("voucher");
  return modules;
};

const updateModuleById = async (id, data) => {
  const modules = await Module.updateOne({ _id: id }, data);
  return modules;
};

const moduleService = {
  createModule,
  findOneById,
  updateModuleById,
};

module.exports = moduleService;
