const Post = require("../models/post");

exports.createPost = async (req, res) => {
  //   console.log("post created!!");
  try {
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
