const jwt = require("jsonwebtoken");
const config = require("config");
const userService = require("../users/userService");
const userController = require("../users/userController");
const bcrypt = require("bcryptjs");
const { ERROR } = require("../../enum");

const { check, validationResult } = require("express-validator");
const widgetController = require("../widgets/widgetController");

const signin = async (req, res) => {
  const { email, password } = req.body;
  try {
    let user = await userService.findOneByFilter({ email });
    if (!user) {
      console.log("Unregistered ");
      return res.status(400).json({ errors: [{ msg: "Unregistered email!" }] });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log("password not correct ");

      return res
        .status(400)
        .json({ errors: [{ msg: "Password not correct!" }] });
    }
    const widgetdata = await widgetController.readWidget(user.widgetId1);
    const payload = {
      user: {
        id: user.id,
      },
    };
    jwt.sign(
      payload,
      config.get("jwtSecret"),
      { expiresIn: "5 days" },
      (err, accessToken) => {
        if (err) throw err;
        res.json({ accessToken, user, widgetdata });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

const signup = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { firstname, lastname, email, password } = req.body;
  try {
    let user = await userController.findOneByFilter({ email });
    if (user) {
      return res.status(400).json({ errors: [{ msg: "User already exists" }] });
    }
    user = {
      email,
      firstname,
      lastname,
      password,
    };

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    user = await userController.createUser(user);

    const payload = {
      user: {
        id: user._id,
      },
    };
    jwt.sign(
      payload,
      config.get("jwtSecret"),
      { expiresIn: "5 days" },
      (err, accessToken) => {
        if (err) throw err;
        res.json({ accessToken, user });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

const authController = {
  signup,
  signin,
};

module.exports = authController;
