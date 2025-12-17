const express = require("express");
const router = express.Router();
const auth = require("../middleware/AuthMiddleware");
const { generateWordsPDF } = require("../controllers/PDFController");

router.post("/generate", auth, generateWordsPDF);
router.get("/generate", auth, generateWordsPDF);

module.exports = router;
