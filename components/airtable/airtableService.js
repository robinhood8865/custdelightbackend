const Airtable = require("./airtableDal");

const createAirtable = async (data) => {
  const airtable = new Airtable(data);
  const _airtable = await airtable.save();
  return _airtable;
};

const updateAirtableById = async (id, data) => {
  const airtable = await Airtable.updateOne({ _id: id }, data);
  return airtable;
};

const findOneById = async (id) => {
  const airtable = await Airtable.findById(id);
  return airtable;
};

const airtableService = {
  createAirtable,
  findOneById,
  updateAirtableById,
};

module.exports = airtableService;
