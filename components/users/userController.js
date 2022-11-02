// const userService = require("./userService");
// const widgetController = require("../widgets/widgetController");
// const { ERROR } = require("../../enum");

const createUser = async (data) => {
  // if (!data) {
  //   console.log(ERROR.NO_DATA);
  //   return ERROR.NO_DATA;
  // }
  // const isNew = await userService.isNewUser(data);
  // if (!isNew) {
  //   console.log(ERROR.USER_EXIST);
  //   return ERROR.USER_EXIST;
  // }
  // const widget = await widgetController.createWidget({});
  // const user = await userService.createUser({
  //   ...data,
  //   widgetId1: [widget._id],
  // });
  // console.log(
  //   "🚀 ~ file: userController.js ~ line 22 ~ createUser ~ user",
  //   user
  // );
  // return user;
};

// const findOneByFilter = async (filter) => {
//   const data = await userService.findOneByFilter(filter);
//   return data;
// };

// const findOneByWidgetId = async (widgetId) => {
//   console.log(
//     "🚀 ~ file: userController.js ~ line 40 ~ findOneByWidgetId ~ widgetId",
//     widgetId
//   );

//   const user = userService.findOneByWidgetId(widgetId);
//   return user;
// };

const userController = {
  createUser,
  // findOneByFilter,
  // findOneByWidgetId,
};

module.exports = userController;
