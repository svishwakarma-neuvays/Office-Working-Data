const User = require("../models/user");
const Post = require("../models/post");

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

//log-out
exports.logOut = async (req, res) => {
  try {
    res
      .status(200)
      .cookie("token", null, { expires: new Date(Date.now()), httpOnly: false })
      .json({
        succes: true,
        message: "Logged Out !!",
      });
  } catch (error) {
    res.status(500).json({
      succes: false,
      message: error.message,
    });
  }
};

//follow-user
exports.followUnfollowUser = async (req, res) => {
  try {
    const userToFollow = await User.findById(req.params.id);
    const loggedInUser = await User.findById(req.user._id);

    if (!userToFollow) {
      return res.status(404).json({
        succes: false,
        message: "User to follow not found !",
      });
    }

    if (loggedInUser.following.includes(userToFollow._id)) {
      const followingIndex = loggedInUser.following.indexOf((userId) =>
        userId.equals(userToFollow._id)
      );
      const followersIndex = loggedInUser.followers.indexOf((userId) =>
        userId.equals(userToFollow._id)
      );

      loggedInUser.following.splice(followingIndex, 1);
      userToFollow.followers.splice(followersIndex, 1);
      await loggedInUser.save();
      await userToFollow.save();

      return res.status(200).json({
        succes: true,
        message: "Unfollowed successfully !!",
      });
    } else {
      loggedInUser.following.push(userToFollow._id);
      userToFollow.followers.push(loggedInUser._id);
      await loggedInUser.save();
      await userToFollow.save();

      res.status(200).json({
        succes: true,
        message: "followed succssfully !!",
      });
    }
  } catch (error) {
    res.status(500).json({
      succes: false,
      message: error.message,
    });
  }
};

exports.updatePassword = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("+password");

    const { oldPassword, newPassword } = req.body;

    if (!oldPassword || !newPassword) {
      return res.status(400).json({
        success: false,
        message: "please provide oldPassword and newPassword !",
      });
    }

    const isMatched = await user.matchPassword(oldPassword);
    if (!isMatched) {
      return res.status(400).json({
        succes: false,
        message: "Incorrect Old Password !",
      });
    }

    user.password = newPassword;
    await user.save();

    res.status(200).json({
      success: true,
      message: "Updated new password !!",
    });
  } catch (error) {
    res.status(500).json({
      succes: false,
      message: error.message,
    });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    const { name, email } = req.body;

    if (name) {
      user.name = name;
    }
    if (email) {
      user.email = email;
    }

    // user Avatar : TODO

    await user.save();

    res.status(200).json({
      succes: true,
      message: "profile Updated successfully !!",
    });
  } catch (error) {
    res.status(500).json({
      succes: false,
      message: error.message,
    });
  }
};

exports.deleteMyProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const posts = user.posts;
    const followers = user.followers;
    const followings = user.following;
    const tempMyUserId = req.user._id;

    await user.deleteOne({ _id: req.user._id });

    // logOut user after deleting profile
    res.cookie("token", null, {
      expires: new Date(0),
      httpOnly: false,
    });

    //delete all post of the user
    for (let i = 0; i < posts.length; i++) {
      await Post.deleteOne({ _id: posts[i] });
    }

    // removing user from follower's following field
    for (let i = 0; i < followers.length; i++) {
      const follower = await User.findById(followers[i]);
      const index = follower.following.indexOf((userId) =>
        userId.equals(tempMyUserId)
      );
      follower.following.splice(index, 1);
      await follower.save();
    }

    //  removing user form the following's follower field
    for (let i = 0; i < followings.length; i++) {
      const follows = await User.findById(followings[i]);
      const index = follows.followers.indexOf((userId) =>
        userId.equals(tempMyUserId)
      );
      follows.followers.splice(index, 1);
      await follows.save();
    }

    res.status(200).json({
      succes: true,
      message: "Profile deleted !!",
    });
  } catch (error) {
    res.status(500).json({
      succes: false,
      message: error.message,
    });
  }
};

//  get my profile
exports.myProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate("posts");
    res.status(200).json({
      succes: true,
      user,
    });
  } catch (error) {
    res.status(500).json({
      succes: false,
      message: error.message,
    });
  }
};

// get any users profile by their _id
exports.getUsersProfile = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).populate("posts");
    if (!user) {
      return res.status(404).json({
        succes: falsee,
        message: "user not found !",
      });
    }
    res.status(200).json({
      succes: true,
      user,
    });
  } catch (error) {
    res.status(500).json({
      succes: false,
      message: error.message,
    });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json({
      succes: true,
      users,
    });
  } catch (error) {
    res.status(500).json({
      succes: false,
      message: error.message,
    });
  }
};
