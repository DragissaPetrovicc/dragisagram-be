const express = require("express");
const Post = require("../../models/PostModel");
const { roleMiddleware } = require("../../middlewares/authentication");

const router = express.Router();

router.delete("/delete/:id", roleMiddleware("USER"), async (req, res) => {
  const postId = req.params.id;
  if (!postId)
    return res
      .status(400)
      .send("You didn't provide what post you are trying to delete");

  try {
    const post = await Post.findByIdAndDelete(postId);
    if (!post) return res.status(400).send("Specified post doesn't exist");
    return res.status(200).send("Specified post deleted successfully");
  } catch (e) {
    return res.status(400).send(e?.message || "Couldn't delete this post");
  }
});

module.exports = router;
