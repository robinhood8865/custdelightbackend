const membershipService = require("./membershipService");

const createMembership = async () => {
  const membership = await membershipService.createMembership({});
  return membership;
};

const updateMembershipById = async (id, data) => {
  const membership = await membershipService.updateMembershipById(id, data);
  return membership;
};

const findOneById = async (id) => {
  const membership = await membershipService.findOneById(id);
  return membership;
};

const membershipController = {
  createMembership,
  findOneById,
  updateMembershipById,
};

module.exports = membershipController;
