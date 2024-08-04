const express = require("express");
const User = require("../../models/UserModel");
const Post = require("../../models/PostModel");
const { roleMiddleware } = require("../../middlewares/authentication");

const router = express.Router();

router.post("/make", roleMiddleware("USER"), async ({ body }, res) => {
  const { owner, images, description, tags } = body || {};

  if (!owner) return res.status(400).send("We couldn't identify you");
  if (images.length === 0)
    return res.status(400).send("At least one image is required");

  try {
    const user = await User.findById(owner);
    if (!user) return res.status(400).send("We couldn't identify you");

    const post = await Post.create({
      owner,
      images,
      description,
      tags,
    });

    if (!post)
      return res.status(400).send("Couldn't make a new post, try again later");

    return res.status(200).send(`New post was created by ${user.username}`);
  } catch (e) {
    return res
      .status(400)
      .send(e?.message || "Something went wrong, couldn't make new post");
  }
});

module.exports = router;
