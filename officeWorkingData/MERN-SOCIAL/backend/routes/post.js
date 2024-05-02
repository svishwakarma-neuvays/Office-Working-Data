const express = require("express");
const { isAuthenticated } = require("../middlewares/auth");
const {
  createPost,
  likeUnlikePost,
  deletePost,
  getPostsOfFollowing,
  updateCaption,
} = require("../controllers/post");

const router = express.Router();

router.route("/post/create").post(isAuthenticated, createPost);
router
  .route("/post/:id")
  .get(isAuthenticated, likeUnlikePost)
  .put(isAuthenticated, updateCaption)
  .delete(isAuthenticated, deletePost);

router.route("/post").get(isAuthenticated, getPostsOfFollowing);

module.exports = router;
