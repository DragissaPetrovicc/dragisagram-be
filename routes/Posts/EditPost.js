const express = require("express");
const Post = require("../../models/PostModel");
const { roleMiddleware } = require("../../middlewares/authentication");

const router = express.Router();

router.patch("/edit/:id", roleMiddleware("USER"), async (req, res) => {
  const postId = req.params.id;
  if (!postId)
    return res.status(400).send("You didn't provide what post you are editing");

  const { description, tags } = req.body || {};
  if (!description && tags.length === 0)
    return res
      .stats(400)
      .send("Couldn't edit post because all fields are empty");

  try {
    const updateData = {};
    if (description) {
      updateData.description = description;
    }

    if (tags.length > 0) {
      updateData.tags = tags;
    }

    const post = await Post.findByIdAndUpdate(postId, updateData, {
      new: true,
    });

    if (!post)
      return res
        .status(400)
        .send("Couldn't update specified post because post doesn't exist");

    return res.status(200).send(`Post ${post._id} updated successfully`);
  } catch (e) {
    return res
      .status(400)
      .send(e?.message || "Something went wrong ,couldn't edit specified post");
  }
});

module.exports = router;
