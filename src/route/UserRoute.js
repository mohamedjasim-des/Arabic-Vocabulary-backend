const express = require("express");
const router = express.Router();
const userController = require("../controllers/UserController");
const auth = require("../middleware/AuthMiddleware");

router.get("/profile", auth, userController.getUserProfile);

module.exports = router;
