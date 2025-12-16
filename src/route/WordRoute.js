const express = require("express");
const router = express.Router();
const auth = require("../middleware/AuthMiddleware");
const {
  createWord,
  getWords,
  getWordById,
  updateWord,
  deleteWord
} = require("../controllers/WordController");

router.post("/", auth, createWord);
router.get("/", auth, getWords);
router.get("/:id", auth, getWordById);
router.put("/:id", auth, updateWord);
router.delete("/:id", auth, deleteWord);


module.exports = router;
