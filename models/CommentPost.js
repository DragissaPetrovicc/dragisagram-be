const mongoose = require("mongoose");

const CommentsSchema = mongoose.Schema({
  commentedBy: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  commentedPost: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "post",
  },

  comment: {
    type: String,
    required: true,
  },

  comentedAt: {
    type: Date,
    default: Date.now,
  },
});

const ComentsModel = mongoose.model("coments", CommentsSchema);

module.exports = ComentsModel;
