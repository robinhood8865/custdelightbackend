const mongoose = require("mongoose");

const ObjectId = mongoose.Types.ObjectId;
const moduleSchema = new mongoose.Schema(
  {
    airtableBaseID: { type: String, default: "" },
    airtableAPIKey: { type: String, default: "" },
    airtableState: { type: Number, default: 0 },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true }, // So `res.json()` and other `JSON.stringify()` functions include virtuals
    toObject: { virtuals: true },
  }
);

const Module = mongoose.model("Airtable", moduleSchema);
module.exports = Module;
