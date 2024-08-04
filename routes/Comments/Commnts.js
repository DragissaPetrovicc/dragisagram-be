const express = require("express");
const User = require("../../models/UserModel");
const Post = require("../../models/PostModel");
const Comment = require("../../models/CommentPost");
const { roleMiddleware } = require("../../middlewares/authentication");
const mongoose = require("mongoose");

const router = express.Router();

router.post("/comment", roleMiddleware("USER"), async ({ body }, res) => {
  const { commentedBy, commentedPost, comment } = body || {};
  if (!commentedBy)
    return res
      .status(400)
      .send("Couldn't identify ypu,make sure you are logged in");
  if (!commentedPost)
    return res
      .status(400)
      .send("You didn't provide what post you are commenting");
  if (!comment) return tes.status(400).send("Comment field is required");

  try {
    const user = await User.findById(commentedBy);
    if (!user)
      return res
        .status(400)
        .send("Your account doesn't exist anymore,log in again");

    const post = await Post.findById(commentedPost);
    if (!post)
      return res.status(400).send("Couldn't find post you trying to comment");

    await Comment.create({ commentedBy, commentedPost, comment });

    return res.status(200).send("Commenter successfully");
  } catch (e) {
    return res
      .status(400)
      .send(e?.message || "Couldn't post your comment,try again later");
  }
});

router.get("/comments/:id", roleMiddleware("USER"), async (req, res) => {
  const id = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send("Invalid ID format.");
  }
  if (!id)
    return res
      .status(400)
      .send("You didn't provide for that post you are fetching comments");
  try {
    const comments = await Comment.find({ commentedPost: id }).populate(
      "commentedBy"
    );
    if (!comments)
      return res.status(400).send("There is still no comments for this post");

    return res.status(200).send(comments);
  } catch (e) {
    return res
      .status(400)
      .send(e || "Couldn't post your comment,try again later");
  }
});

router.get("/comments", roleMiddleware("USER"), async (req, res) => {
  try {
    const comments = await Comment.find();

    if (comments.length === 0)
      return res.status(400).send("There are still no comments");

    return res.status(200).send(comments);
  } catch (e) {
    console.log(e.message);
    return res
      .status(400)
      .send(e?.message || "Couldn't post your comment,try again later");
  }
});

router.delete("/comment/:id", roleMiddleware("USER"), async (req, res) => {
  const commentId = req.params.id || {};
  if (!commentId)
    return res
      .status(400)
      .send("You didn't provide what comment you are deleting");
  try {
    const comments = await Comment.findByIdAndDelete(commentId);
    if (!comments)
      return res.status(400).send("Provided comment doesn't exist");

    return res.status(200).send("Comment deleted successfully");
  } catch (e) {
    return res
      .status(400)
      .send(e?.message || "Couldn't post your comment,try again later");
  }
});

router.patch("/comment/:id", roleMiddleware("USER"), async (req, res) => {
  const { comment } = req.body || {};
  const commentId = req.params.id;
  if (!comment)
    return res.status(400).send("You have to edit comment for first");
  try {
    const comments = await Comment.findByIdAndUpdate(
      commentId,
      { comment },
      { new: true }
    );
    if (!comments)
      return res.status(400).send("Provided comment doesn't exist");

    return res.status(200).send("Comment updated successfully");
  } catch (e) {
    return res
      .status(400)
      .send(e?.message || "Couldn't post your comment,try again later");
  }
});

module.exports = router;
