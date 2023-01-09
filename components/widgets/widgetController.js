const stripe = require("../integration/stripe");

const widgetService = require("./widgetService");
const moduleController = require("../modules/moduleController");
const membershipController = require("../memberships/membershipController");
const voucherController = require("../vouchers/voucherController");
const settingController = require("../settings/settingController");
const themeController = require("../themes/themeController");
const userService = require("../users/userService");
const path = require("path");
const express = require("express");
const router = express.Router();
const multer = require("multer");
const integrationController = require("../integration/integrationController");

const createWidget = async () => {
  const module = await moduleController.createModule({});
  const setting = await settingController.createSetting({});
  const theme = await themeController.createTheme({});
  const integration = await integrationController.createIntegration({});
  const widget = await widgetService.createWidget({
    moduleId: module._id,
    themeId: theme._id,
    settingId: setting._id,
    integrationId: integration._id,
  });

  return widget;
};

const updateWidget = async (req, res) => {
  const widgetId = req.body.widgetId;
  const widget = req.body.widget;

  const { module, theme, setting, integration } = widget;
  const { membership, voucher, ...temp } = module;
  console.log(
    "🚀 ~ file: widgetController.js:59 ~ updateWidget ~ voucher",
    voucher
  );
  const { vouchers, ...tempVoucher } = voucher;
  const widgetdata = await findOneById(widgetId);
  const { moduleId, themeId, settingId, integrationId } = widgetdata;
  const moduledata = await moduleController.findOneById(moduleId);
  const { membershipId, voucherId } = moduledata;
  const updatedMembership = await membershipController.updateMembershipById(
    membershipId,
    membership
  );

  // for (let i = 0; i < vouchers.length; i++) {
  //   if (vouchers[i].flag == 0) {
  //     //none action
  //   }
  //   if (vouchers[i].voucherFlag == 1) {
  //     console.log(
  //       "🚀 ~ file: widgetController.js:56 ~ updateWidget ~ vouchers[i]",
  //       vouchers[i]
  //     );

  //     //create voucher
  //     const prodId = await stripe.addNewProduct(vouchers[i]);
  //     console.log(
  //       "🚀 ~ file: widgetController.js:63 ~ updateWidget ~ prodId",
  //       prodId
  //     );
  //     vouchers[i].voucherProdId = prodId;
  //   }
  //   if (vouchers[i].flag == 2) {
  //     //modify voucher
  //   }
  //   if (vouchers[i].flag == 3) {
  //     //delete voucher
  //   }
  // }

  const updatedVoucher = await voucherController.updateVoucherById(
    voucherId,
    voucher
  );

  const tempModuleData = {
    ...temp,
    membershipId,
    voucherId,
  };

  const updatedModule = await moduleController.updateModuleById(
    moduleId,
    tempModuleData
  );

  const updatedTheme = await themeController.updateThemeById(themeId, theme);
  const updatedSetting = await settingController.updateSettingById(
    settingId,
    setting
  );

  const updatedIntegration = await integrationController.updateIntegrationById(
    integrationId,
    integration
  );

  const newVoucher = await voucherController.findOneById(voucherId);

  const updatedwidget = {
    module: { ...module, voucher: newVoucher },
    theme,
    setting,
    integration,
  };
  res.json(updatedwidget);
};

const findOneById = async (filter) => {
  const widget = await widgetService.findOneById(filter);
  return widget;
};

const findOneByDomain = async (req, res) => {
  if (!req.body.subDomain) res.send("error:no subDomain data");

  const setting = await settingController.findOneByDomain(req.body.subDomain);

  if (setting === "error") {
    res.send("error: no match data in db");
    return;
  }
  const settingId = setting._id;
  const widget = await widgetService.findOneBySettingId(settingId);
  console.log(
    "🚀 ~ file: widgetController.js ~ line 104 ~ findOneByDomain ~ widget",
    widget
  );
  if (widget === null || widget === undefined) {
    res.send("error");
    return;
  }

  const widgetId = widget._id;
  const widgetData = await widgetService.readWidgetAllData(widgetId);
  console.log(
    "🚀 ~ file: widgetController.js ~ line 89 ~ findOneByDomain ~ widgetData",
    widgetData
  );
  const user = await userService.findOneByWidgetId(widgetId);
  console.log(
    "🚀 ~ file: widgetController.js ~ line 107 ~ findOneByDomain ~ user",
    user
  );
  const data = { user: user, widget: widgetData };

  res.send(data);
};

const findOneBySettingId = async (settingId) => {
  const widget = await widgetService.findOneBySettingId({ settingId });
  return widget;
};

const readWidget = async (widgetId) => {
  const widget = await widgetService.readWidgetAllData(widgetId);
  console.log(
    "🚀 ~ file: widgetController.js ~ line 95 ~ readWidget ~ widget",
    widget
  );
  return widget;
};

const uploadIcon = async (req, res) => {
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "./build/static/uploads/icon/");
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      cb(
        null,
        `${file.fieldname}-${uniqueSuffix}${path.extname(file.originalname)}`
      );
    },
  });

  function checkFileType(file, cb) {
    const fileTypes = /jpg|jpeg|png/;
    const extname = fileTypes.test(
      path.extname(file.originalname).toLocaleLowerCase()
    );
    const mimetype = fileTypes.test(file.mimetype);

    if (extname && mimetype) {
      cb(null, true);
    } else {
      cb("Images only");
    }
  }

  const upload = multer({
    storage,
    fileFilter: function (req, file, cb) {
      checkFileType(file, cb);
    },
  }).single(filename);
};

const widgetController = {
  createWidget,
  updateWidget,
  findOneById,
  readWidget,
  findOneByDomain,
  findOneBySettingId,
  uploadIcon,
};

module.exports = widgetController;
