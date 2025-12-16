const mongoose = require("mongoose");

const TenseSchema = new mongoose.Schema(
  {
    tense: {
      type: String,
      enum: ["past", "present", "future"],
      required: true
    },
    arabic: { type: String, required: true },
    english: { type: String, required: true },
    tamil: { type: String, required: true }
  },
  { _id: false }
);

const WordSchema = new mongoose.Schema(
  {
    sNo: { type: Number, required: true },

    rootWord: {
      type: String,
      required: true
    },

    meanings: [TenseSchema], 

    note: {
      type: String,
      default: "Noun"
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Word", WordSchema);
