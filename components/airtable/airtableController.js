const airtableService = require("./airtableService");

const createAirtable = async () => {
  const airtable = await airtableService.createAirtable({});
  return airtable;
};

const updateAirtableById = async (id, data) => {
  const airtable = await airtableService.updateAirtableById(id, data);
  return airtable;
};

const updateAirtable = async (req, res) => {
  console.log(
    "🚀 ~ file: airtableController.js ~ line 14 ~ updateAirtable ~ req",
    req
  );
  const { id, data } = req.body;
  const airtable = await updateAirtableById(id, data);
  return airtable;
};

const findOneById = async (id) => {
  const airtable = await airtableService.findOneById(id);
  return airtable;
};

const airtableController = {
  createAirtable,
  findOneById,
  updateAirtableById,
};

module.exports = airtableController;
