const integrationService = require("./integrationService");

const createIntegration = async () => {
  const integration = await integrationService.createIntegration({});
  return integration;
};

const updateIntegrationById = async (id, data) => {
  const integration = await integrationService.updateIntegrationById(id, data);
  return integration;
};

const updateIntegration = async (req, res) => {
  const { id, data } = req.body;
  const integration = await updateIntegrationById(id, data);
  return integration;
};

const findOneById = async (id) => {
  const integration = await integrationService.findOneById(id);
  return integration;
};

const integrationController = {
  createIntegration,
  findOneById,
  updateIntegrationById,
};

module.exports = integrationController;
