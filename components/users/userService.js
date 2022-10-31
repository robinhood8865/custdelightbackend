const User = require("./userDal");

const createUser = async (data) => {
  console.log("🚀 ~ file: userService.js ~ line 4 ~ createUser ~ data", data);

  const user = new User(data);
  const _user = await user.save();
  return _user;
};

const isNewUser = async (data) => {
  const user = await User.findOne({ email: data.email });
  return user ? false : true;
};

const findOneByFilter = async (filter) => {
  const user = await User.findOne(filter);
  return user;
};

const findOneByWidgetId = async (widgetId) => {
  console.log(
    "🚀 ~ file: userService.js ~ line 26 ~ findOneByWidgetId ~ d",
    widgetId
  );
  const user = await User.findOne({ widgetId1: widgetId });
  console.log(
    "🚀 ~ file: userService.js ~ line 27 ~ findOneByWidgetId ~ user",
    user
  );
  return user;
};

const userService = {
  createUser,
  isNewUser,
  findOneByFilter,
  findOneByWidgetId,
};

module.exports = userService;
