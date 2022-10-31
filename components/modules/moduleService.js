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
  console.log(
    "🚀 ~ file: moduleService.js ~ line 11 ~ findOneById ~ modules",
    modules
  );
  return modules;
};

const updateModuleById = async (id, data) => {
  console.log(
    "🚀 ~ file: moduleService.js ~ line 21 ~ updateModuleById ~ id",
    id
  );
  console.log(
    "🚀 ~ file: moduleService.js ~ line 21 ~ updateModuleById ~ data",
    data
  );
  const modules = await Module.updateOne({ _id: id }, data);
  return modules;
};

const moduleService = {
  createModule,
  findOneById,
  updateModuleById,
};

module.exports = moduleService;
