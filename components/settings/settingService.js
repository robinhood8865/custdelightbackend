const Setting = require("./settingDal");

const createSetting = async (data) => {
  const setting = new Setting(data);
  const _setting = await setting.save();
  return _setting;
};

const findOneById = async (id) => {
  const setting = await Setting.findById(id);
  return setting;
};

const updateSettingById = async (id, data) => {
  const setting = await Setting.updateOne({ _id: id }, data);
  return setting;
};

const findOneByDomain = async (subDomain) => {
  // console.log({ subDomain });
  // const setting = await Setting.findOne({ subDomain });
  const settings = await Setting.find({});
  for (i = 0; i < settings.length; i++) {
    if (subDomain.startsWith(settings[i].subDomain)) {
      return settings[i];
    }
  }
  return "error";
};

const settingService = {
  createSetting,
  findOneById,
  updateSettingById,
  findOneByDomain,
};

module.exports = settingService;
