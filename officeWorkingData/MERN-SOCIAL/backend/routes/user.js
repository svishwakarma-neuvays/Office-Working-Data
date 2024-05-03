const express = require("express");
const { isAuthenticated } = require("../middlewares/auth");
const {
  register,
  login,
  followUnfollowUser,
  logOut,
  updatePassword,
  updateProfile,
  deleteMyProfile,
  myProfile,
  getUsersProfile,
  getAllUsers,
} = require("../controllers/user");

const router = express.Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logOut").get(isAuthenticated, logOut);
router.route("/update/password").put(isAuthenticated, updatePassword);
router.route("/update/profile").put(isAuthenticated, updateProfile);
router.route("/delete/me").delete(isAuthenticated, deleteMyProfile);
router.route("/me").get(isAuthenticated, myProfile);
router.route("/user/profile/:id").get(isAuthenticated, getUsersProfile);
router.route("/users").get(isAuthenticated, getAllUsers);
router.route("/followUnfollow/:id").get(isAuthenticated, followUnfollowUser);

module.exports = router;
