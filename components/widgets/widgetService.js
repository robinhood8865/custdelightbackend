const moduleController = require("../modules/moduleController");
const settingController = require("../settings/settingController");
const Setting = require("../settings/settingDal");
const themeController = require("../themes/themeController");
const integrationController = require("../integration/integrationController");
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

  const { moduleId, themeId, settingId, integrationId } = widget;
  const module = await moduleController.findOneById(moduleId);
  const theme = await themeController.findOneById(themeId);
  const setting = await settingController.findOneById(settingId);
  const integration = await integrationController.findOneById(integrationId);

  if (setting === "error") return "error";

  const data = {
    module,
    theme,
    setting,
    integration,
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
