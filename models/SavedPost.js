const mongoose = require("mongoose");

const SavedPostSchema = mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  posts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "post",
    },
  ],
  lastEdited: {
    type: Date,
    default: Date.now,
  },
});

const SavedPostModel = mongoose.model("savedposts", SavedPostSchema);

module.exports = SavedPostModel;
