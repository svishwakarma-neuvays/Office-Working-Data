const User = require("../models/user");
const bcrypt = require("bcrypt");

exports.registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const findUser = await User.findOne({ email });
    if (findUser) {
      return res.status(400).json({
        success: false,
        message: "user already registered with this email !",
      });
    }

    const hashPass = await bcrypt.hash(password, 10);

    const newUser = await User.create({ name, email, password: hashPass });
    res.status(200).json({
      success: true,
      message: "user registered successfully !!",
      newUser, //comment before push
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
