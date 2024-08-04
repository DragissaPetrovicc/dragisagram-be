const mongoose = require("mongoose");

const RepPostSchema = mongoose.Schema({
  reportedBy: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  reportedPost: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "post",
    required: true,
  },
  reason: {
    type: String,
    required: true,
  },
  additionalMessage: {
    type: String,
    default: "N/A",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const ReportArticle = mongoose.model("reportedpost", RepPostSchema);

module.exports = ReportArticle;
