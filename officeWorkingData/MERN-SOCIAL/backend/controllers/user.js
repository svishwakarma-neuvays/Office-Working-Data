const User = require("../models/user");

exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        success: false,
        message: "User is already exist with this email !",
      });
    }

    user = await User.create({
      name,
      email,
      password,
      avatar: {
        public_id: "sample public_id",
        url: "sample url",
      },
    });

    // res.status(201).json({
    //   success: true,
    //   message: "User registered successfully !!",
    //   user,
    // });

    const token = await user.generateToken();

    user.password = undefined;
    const options = {
      expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
      httpOnly: true,
    };
    res.status(201).cookie("token", token, options).json({
      succes: true,
      message: "User registered successfully !!",
      user,
      token,
    });
  } catch (error) {
    res.status(500).json({
      succes: false,
      message: error.message,
    });
  }
};

//login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res.status(400).json({
        succes: false,
        message: "User does not exist !",
      });
    }

    const isMatched = await user.matchPassword(password);

    if (!isMatched) {
      return res.status(400).json({
        succes: false,
        message: "Incorrect password !",
      });
    }

    const token = await user.generateToken();

    user.password = undefined;
    const options = {
      expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
      httpOnly: true,
    };
    res.status(200).cookie("token", token, options).json({
      succes: true,
      user,
      token,
    });
  } catch (error) {
    res.status(500).json({
      succes: false,
      message: error.message,
    });
  }
};
