const mongoose = require("mongoose");

const FollowRequestSchema = mongoose.Schema(
  {
    requestedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    accept: {
      type: Boolean,
      default: false,
    },
    to: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const FollowRequestModel = mongoose.model("followRequest", FollowRequestSchema);

module.exports = FollowRequestModel;
