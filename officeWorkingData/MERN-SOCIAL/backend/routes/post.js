const express = require("express");
const { isAuthenticated } = require("../middlewares/auth");
const { createPost } = require("../controllers/post");

const router = express.Router();

router.route("/post/create").post(isAuthenticated,createPost);

module.exports = router;
