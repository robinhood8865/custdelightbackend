const memberShipService = require("./memberShipService");

const createMembership = async () => {
  const membership = await memberShipService.createMembership({});
  return membership;
};

const updateMembershipById = async (id, data) => {
  const membership = await memberShipService.updateMembershipById(id, data);
  return membership;
};

const findOneById = async (id) => {
  const membership = await memberShipService.findOneById(id);
  return membership;
};

const membershipController = {
  createMembership,
  findOneById,
  updateMembershipById,
};

module.exports = membershipController;
