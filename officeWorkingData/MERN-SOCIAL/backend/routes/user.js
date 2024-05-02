const express = require("express");
const { isAuthenticated } = require("../middlewares/auth");
const {
  register,
  login,
  followUnfollowUser,
  logOut,
  updatePassword,
  updateProfile,
} = require("../controllers/user");

const router = express.Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logOut").get(isAuthenticated, logOut);
router.route("/update/password").put(isAuthenticated, updatePassword);
router.route("/update/profile").put(isAuthenticated, updateProfile);
router.route("/followUnfollow/:id").get(isAuthenticated, followUnfollowUser);

module.exports = router;
