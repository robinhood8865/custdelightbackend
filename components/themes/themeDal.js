const mongoose = require("mongoose");
const themeSchema = new mongoose.Schema({
  headerColor: { type: String, default: "#812FBF" },
  buttonColor: { type: String, default: "#812FBF" },
  widgetColor: { type: String, default: "#812FBF" },
  widgetIcon: { type: String, default: "custdelight.jpg" },
});

const Theme = mongoose.model("Theme", themeSchema);
module.exports = Theme;
