const mongoose = require("mongoose");

const BlockListSchema = mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  users: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});

const BlockListModel = mongoose.model("blockList", BlockListSchema);

module.exports = BlockListModel;
