const Word = require("../models/Word");

// CREATE WORD
exports.createWord = async (req, res) => {
  try {
    const word = await Word.create({
      ...req.body,
      createdBy: req.user.id
    });

    res.json({
      success: true,
      data: word
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message
    });
  }
};

// FETCH ALL WORDS
exports.getWords = async (req, res) => {
  try {
    const words = await Word.find().sort({ sNo: 1 });

    res.json({
      success: true,
      data: words
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message
    });
  }
};

// FETCH SINGLE WORD
exports.getWordById = async (req, res) => {
  try {
    const word = await Word.findById(req.params.id);

    if (!word)
      return res.status(404).json({
        success: false,
        message: "Word not found"
      });

    res.json({
      success: true,
      data: word
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message
    });
  }
};

// UPDATE WORD
exports.updateWord = async (req, res) => {
  try {
    const updated = await Word.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json({
      success: true,
      data: updated
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message
    });
  }
};
