const express = require("express");
const RepUser = require("../../models/RepUser");
const RepPost = require("../../models/RepPost");
const Post = require("../../models/PostModel");
const User = require("../../models/UserModel");
const { roleMiddleware } = require("../../middlewares/authentication");

const router = express.Router();

router.post("/user", roleMiddleware("USER"), async ({ body }, res) => {
  const { reportedBy, reportedUser, reason, additionalMessage } = body || {};
  if (!reportedBy)
    return res
      .status(400)
      .send("Make sure you are logged in,we couldn't identify you");
  if (!reportedUser)
    return res
      .status(400)
      .send("We couldn't identify what user you are trying to report");
  if (!reason) return res.status(400).send("Reason is required");

  try {
    const reportBy = await User.findById(reportedBy);
    if (!reportBy)
      return res
        .status(400)
        .send("Your account doesn't exist anymore,log in again");

    const reportUser = await User.findById(reportedUser);
    if (!reportUser)
      return res
        .status(400)
        .send("User you are trying to report doesn't exist");

    await RepUser.create({
      reportedBy,
      reportedUser,
      reason,
      additionalMessage,
    });

    return res.status(200).send("User reported successfully,thank you");
  } catch (e) {
    return res
      .status(400)
      .send(
        e?.message || "Something went wrong,couldn't report specified user"
      );
  }
});

router.post("/post", roleMiddleware("USER"), async ({ body }, res) => {
  const { reportedBy, reportedPost, reason, additionalMessage } = body || {};
  if (!reportedBy)
    return res
      .status(400)
      .send("Make sure you are logged in,we couldn't identify you");
  if (!reportedPost)
    return res
      .status(400)
      .send("We couldn't identify what post you are trying to report");
  if (!reason) return res.status(400).send("Reason is required");

  try {
    const reportBy = await User.findById(reportedBy);
    if (!reportBy)
      return res
        .status(400)
        .send("Your account doesn't exist anymore,log in again");

    const reportPost = await Post.findById(reportedPost);
    if (!reportPost)
      return res
        .status(400)
        .send("Post you are trying to report doesn't exist");

    await RepPost.create({
      reportedBy,
      reportedPost,
      reason,
      additionalMessage,
    });

    return res.status(200).send("Post reported successfully,thank you");
  } catch (e) {
    return res
      .status(400)
      .send(
        e?.message || "Something went wrong,couldn't report specified user"
      );
  }
});

module.exports = router;
