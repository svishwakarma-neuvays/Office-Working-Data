const express = require("express");
const { registerUser } = require("../controllers/user");

const router = express.Router();

router.route("/register/user").post(registerUser);

module.exports = router;
