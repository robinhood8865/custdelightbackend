const membershipController = require("../memberships/membershipController");
const moduleController = require("../modules/moduleController");
const settingController = require("../settings/settingController");
const Setting = require("../settings/settingDal");
const themeController = require("../themes/themeController");
const airtableController = require("../airtable/airtableController");
const voucherController = require("../vouchers/voucherController");
const Widget = require("./widgetDal");

const createWidget = async (data) => {
  const widget = new Widget(data);
  const _widget = await widget.save();
  return _widget;
};

const findOneById = async (filter) => {
  const widget = await Widget.findById(filter);
  return widget;
};

const findOneBySettingId = async (settingId) => {
  const widget = await Widget.findOne({ settingId });
  return widget;
};

const readWidgetAllData = async (widgetId) => {
  const widget = await Widget.findById(widgetId);

  const { moduleId, themeId, settingId, airtableId } = widget;
  const module = await moduleController.findOneById(moduleId);
  console.log(
    "🚀 ~ file: widgetService.js ~ line 30 ~ readWidgetAllData ~ module",
    module
  );
  const theme = await themeController.findOneById(themeId);
  const setting = await settingController.findOneById(settingId);
  const airtable = await airtableController.findOneById(airtableId);

  if (setting === "error") return "error";

  const data = {
    module,
    theme,
    setting,
    airtable,
  };

  return data;
};

const widgetService = {
  createWidget,
  findOneById,
  readWidgetAllData,
  findOneBySettingId,
};

module.exports = widgetService;
