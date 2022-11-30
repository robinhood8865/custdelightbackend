const Integration = require("./integrationDal");

const createIntegration = async (data) => {
  const integration = new Integration(data);
  const _integration = await integration.save();
  return _integration;
};

const updateIntegrationById = async (id, data) => {
  const integration = await Integration.updateOne({ _id: id }, data);
  return integration;
};

const findOneById = async (id) => {
  const integration = await Integration.findById(id);
  return integration;
};

const integrationService = {
  createIntegration,
  findOneById,
  updateIntegrationById,
};

module.exports = integrationService;
