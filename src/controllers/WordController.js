const Word = require("../models/Word");

/**
 * CREATE WORD
 */
exports.createWord = async (req, res) => {
  try {
    const word = await Word.create({
      ...req.body,
      createdBy: req.user.id
    });

    res.status(201).json({
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

/**
 * FETCH ALL WORDS (ONLY CREATED BY USER)
 */
exports.getWords = async (req, res) => {
  try {
    const words = await Word.find({
      createdBy: req.user.id
    }).sort({ sNo: 1 });

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

/**
 * FETCH SINGLE WORD
 */
exports.getWordById = async (req, res) => {
  try {
    const word = await Word.findOne({
      _id: req.params.id,
      createdBy: req.user.id
    });

    if (!word) {
      return res.status(404).json({
        success: false,
        message: "Word not found or access denied"
      });
    }

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

/**
 * UPDATE WORD
 */
exports.updateWord = async (req, res) => {
  try {
    const updated = await Word.findOneAndUpdate(
      {
        _id: req.params.id,
        createdBy: req.user.id
      },
      req.body,
      { new: true, runValidators: true }
    );

    if (!updated) {
      return res.status(404).json({
        success: false,
        message: "Word not found or access denied"
      });
    }

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

/**
 * DELETE WORD (ONLY IF USER CREATED IT)
 */
exports.deleteWord = async (req, res) => {
  try {
    const deleted = await Word.findOneAndDelete({
      _id: req.params.id,
      createdBy: req.user.id
    });

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "Word not found or access denied"
      });
    }

    res.json({
      success: true,
      message: "Word deleted successfully"
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message
    });
  }
};
