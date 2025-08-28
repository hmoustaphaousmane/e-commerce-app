const express = require("express");
const { register, login, profile } = require("../controller/authController");
const isLoggedIn = require("../middleware/isLoggedIn");
const roleBasedAccess = require("../middleware/roleBasedAccess");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);

router.get(
  "/profile",
  isLoggedIn,
  roleBasedAccess(["admin", "customer"]),
  profile
);

module.exports = router;
