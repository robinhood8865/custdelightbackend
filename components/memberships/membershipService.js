const Membership = require("./membershipDal");

const createMembership = async (data) => {
  const membership = new Membership(data);
  const _memberShip = await membership.save();
  return _memberShip;
};

const updateMembershipById = async (id, data) => {
  const membership = await Membership.updateOne({ _id: id }, data);
  return membership;
};

const findOneById = async (id) => {
  const membership = await Membership.findById(id);
  return membership;
};

const membershipService = {
  createMembership,
  findOneById,
  updateMembershipById,
};

module.exports = membershipService;
