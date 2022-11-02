const membershipServcie = require("./memberShipService");

const createMembership = async () => {
  const membership = await membershipServcie.createMembership({});
  return membership;
};

const updateMembershipById = async (id, data) => {
  const membership = await membershipServcie.updateMembershipById(id, data);
  return membership;
};

const findOneById = async (id) => {
  const membership = await membershipServcie.findOneById(id);
  return membership;
};

const membershipController = {
  createMembership,
  findOneById,
  updateMembershipById,
};

module.exports = membershipController;
