const mongoose = require("mongoose");

const FollowersSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  followers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});

const FollowiersModel = mongoose.model("followers", FollowersSchema);

module.exports = FollowiersModel;
