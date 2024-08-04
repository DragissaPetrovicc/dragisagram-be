const express = require("express");
const Post = require("../../models/PostModel");
const { roleMiddleware } = require("../../middlewares/authentication");

const router = express.Router();

router.patch("/likePost/:id", roleMiddleware("USER"), async (req, res) => {
  const postId = req.params.id;
  if (!postId)
    return res
      .status(400)
      .send("You didn't provide what post you are trying to like");

  try {
    const post = await Post.findByIdAndUpdate(
      postId,
      { $inc: { likes: 1 } },
      { new: true }
    );
    if (!post) return res.status(400).send("Couldn't like post");

    return res.status(200).send(`Post ${post._id} liked successfully`);
  } catch (e) {
    return res
      .status(400)
      .send(e?.message || "Something went wrong, couldn't like specified post");
  }
});

router.patch("/unlikePost/:id", roleMiddleware("USER"), async (req, res) => {
  const postId = req.params.id;
  if (!postId)
    return res
      .status(400)
      .send("You didn't provide what post you are trying to like");

  try {
    const post = await Post.findByIdAndUpdate(
      postId,
      { $inc: { likes: -1 } },
      { new: true }
    );
    if (!post) return res.status(400).send("Couldn't unlike post");

    return res.status(200).send(`Post ${post._id} unliked successfully`);
  } catch (e) {
    return res
      .status(400)
      .send(
        e?.message || "Something went wrong, couldn't unlike specified post"
      );
  }
});

router.patch("/sharePost/:id", roleMiddleware("USER"), async (req, res) => {
  const postId = req.params.id;
  if (!postId)
    return res
      .status(400)
      .send("You didn't provide what post you are trying to share");

  try {
    const post = await Post.findByIdAndUpdate(
      postId,
      { $inc: { shares: 1 } },
      { new: true }
    );
    if (!post) return res.status(400).send("Couldn't like post");

    return res.status(200).send(`Post ${post._id} shared successfully`);
  } catch (e) {
    return res
      .status(400)
      .send(
        e?.message || "Something went wrong, couldn't share specified post"
      );
  }
});

module.exports = router;
