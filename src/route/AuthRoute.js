const express = require("express");
const router = express.Router();
const auth = require("../middleware/AuthMiddleware");
const {
  register,
  login,
  forgotPassword,
  resetPassword,
  changePassword
} = require("../controllers/AuthControllers");

router.post("/register", register);
router.post("/login", login);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);
router.post("/change-password", auth, changePassword);

module.exports = router;
