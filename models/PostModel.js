const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  images: [
    {
      type: String,
      required: true,
    },
  ],
  description: {
    type: String,
  },
  postedAt: {
    type: Date,
    default: Date.now,
  },
  tags: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  likes: {
    type: Number,
    default: 0,
  },
  shares: {
    type: Number,
    default: 0,
  },
});

const Post = mongoose.model("post", PostSchema);

module.exports = Post;
