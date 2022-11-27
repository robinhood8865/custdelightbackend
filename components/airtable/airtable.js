const Airtable = require("airtable");
const { check, validationResult } = require("express-validator");

var base = new Airtable({ apiKey: "keydAtrtMYXMl1eV2" }).base(
  "appFgsnjRRLox23zr"
);

const userTableName = "User";
const userTable = base(userTableName);
const viewName = "Grid View";
var cachedResponse = null;

const getRecords = async () => {
  const records = await userTable
    .select({ maxRecords: 10, view: viewName })
    .firstPage();
  console.log(records);
};

const getRecordById = async (id) => {
  // const record = await
  userTable.find(id, (err, record) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log("retrieved", record);
  });
};

const minifyRecord = (record) => {
  return {
    id: record.id,
    fields: record.fields,
  };
};

const createRecord = async (fields) => {
  // const createdRecord = await userTable.create(fields);
  const { email } = fields;
  try {
    const records = await getData(email);
    if (records.length === 0) {
      const newRecords = await userTable.create([{ fields: fields }]);
      return newRecords[0];
    } else {
      return { msg: "Already exists" };
    }
  } catch (error) {
    console.log(error);
    return { msg: "Something went wrong while creating." };
  }
};

const updateRecord = async (id, fields) => {
  const updatedRecord = await userTable.update(id, fields);
  console.log(minifyRecord(updatedRecord));
};

const deleteRecord = async (id) => {
  try {
    const deletedRecord = await userTable.destroy(id);
    console.log(minifyRecord(deletedRecord));
  } catch (err) {
    console.error(err);
  }
};

const getData = async (email) => {
  const records = await userTable
    .select({
      filterByFormula: `{email} = "${email}"`,
    })
    .all();
  return records;
};

const matchData = async (fields) => {
  // const createdRecord = await userTable.create(fields);
  const { email, password } = fields;
  try {
    const records = await getData(email);
    if (records.length === 0) {
      return { msg: "UnRegistered Email" };
    } else {
      if (records[0].fields.password === password) return records[0].fields;
      else return { msg: "Incorrect Password" };
    }
  } catch (error) {
    console.log(error);
    return { msg: "Something went wrong while creating." };
  }
};

const login = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { email, password } = req.body;

  const fields = { email, password };
  const user = await matchData(fields);

  if (user?.msg) {
    console.log(user.msg);
    res.status(500).json({ msg: user.msg });
  } else {
    res.status(200).json({ user: user, msg: "Suceess" });
  }

  // const user = await getData("robin@gmail.com");
  // console.log("🚀 ~ file: airtable.js ~ line 75 ~ signup ~ user", user);
  // if (user) return res.status(404).json({ error: "User already exist" });

  ///////////
};

const signup = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { firstname, lastname, email, password } = req.body;
  console.log(firstname, lastname, email, password);

  const fields = { firstname, lastname, email, password };
  const user = await createRecord(fields);

  if (user?.msg) {
    console.log(user.msg);
    res.status(500).json({ msg: user.msg });
  } else {
    res.status(200).json({ user: user, msg: "Success" });
  }

  // const user = await getData("robin@gmail.com");
  // console.log("🚀 ~ file: airtable.js ~ line 75 ~ signup ~ user", user);
  // if (user) return res.status(404).json({ error: "User already exist" });

  ///////////
};

const connectBase = async (req, res) => {
  console.log("connectBase");
  const myBase = new Airtable({
    apiKey: "keydAtrtMYXMl1eV2",
  }).base("appFgsnjRRLox23zr");

  myBase(userTableName)
    .select({
      maxRecords: 10,
      view: viewName,
    })
    .firstPage(function (error, records) {
      if (error) {
        console.log(error);
        res.status(error.statusCode).json({ error: error.message });
      } else {
        // cachedResponse = {
        //   records: records.map((record) => {
        //     return {
        //       id: record.get("id"),
        //       email: record.get("email"),
        //       firstName: record.get("firstName"),
        //       lastName: record.get("lastName"),
        //       phoneNumber: record.get("phoneNumber"),
        //     };
        //   }),
        // };
        // console.log(cachedResponse);
        // response.send(cachedResponse);
        res.send("Connect Success");
      }
    });

  // const { airtableAPIKey, airtableBaseID } = req.body;
  // console.log(
  //   "🚀 ~ file: airtable.js ~ line 6 ~ createBase ~  req.body",
  //   req.body
  // );
  // Airtable.configure({
  //   endpointUrl: "https://api.airtable.com",
  //   apikey: airtableAPIKey,
  // });

  // const base = Airtable.base(airtableBaseID);
  // console.log("🚀 ~ file: airtable.js ~ line 11 ~ createBase ~ base", base);
  // let table1 = base.getTable("tbllwb0FiRxPq2zch");
  // console.log(table1);
  // // const voucherTable = base("Voucher");
  // const tableId = await base.createTableAsync("Voucher", [
  //   { name: "Title", type: "singleLineText" },
  // ]);
  // console.log(
  //   "🚀 ~ file: airtable.js ~ line 17 ~ createBase ~ tableId",
  //   tableId
  // );
  // console.log("🚀 ~ file: airtable.js ~ line 8 ~ createBase ~ req", req.body);
};

const airtable = {
  connectBase,
  signup,
  login,
};

module.exports = airtable;
