const express = require("express");
const SPost = require("../../models/SavedPost");
const User = require("../../models/UserModel");
const Post = require("../../models/PostModel");
const { roleMiddleware } = require("../../middlewares/authentication");

const router = express.Router();

router.put("/savePost/:id", roleMiddleware("USER"), async (req, res) => {
  const { posts } = req.body || {};
  const owner = req.params.id;

  if (!owner)
    return res
      .status(400)
      .send("Make sure you are logged in, couldn't identify you");
  if (!posts || posts.length === 0)
    return res.status(400).send("At least one post is required");

  try {
    const user = await User.findById(owner);
    if (!user)
      return res
        .status(400)
        .send("Make sure you are logged in, couldn't identify you");

    for (const p of posts) {
      const post = await Post.findById(p);
      if (!post)
        return res.status(400).send(`Provided post ${p} doesn't exist`);
    }

    let savedPosts = await SPost.findOneAndUpdate(
      { owner },
      { lastEdited: Date.now() }
    );
    if (!savedPosts) {
      savedPosts = await SPost.create({ owner, posts });
    } else {
      savedPosts.posts.push(...posts);
      await savedPosts.save();
    }

    return res.status(200).send("Post saved successfully");
  } catch (e) {
    return res
      .status(400)
      .send(
        e?.message || "Something went wrong, couldn't add post in saved posts"
      );
  }
});

router.get("/savedPosts/:id", roleMiddleware("USER"), async (req, res) => {
  const id = req.params.id;

  if (!id)
    return res
      .status(400)
      .send("Make sure you are logged in,couldn't identify you");

  try {
    const posts = await SPost.findOne({ owner: id }).populate({
      path: "posts",
      model: "post",
    });
    if (posts.length === 0)
      return res.status(400).send("You still have not saved posts");

    return res.status(200).send(posts);
  } catch (e) {
    return res
      .status(400)
      .send(
        e?.message || "Something went wrong,couldn't fetch you saved posts"
      );
  }
});

router.patch("/unsavePost/:id", roleMiddleware("USER"), async (req, res) => {
  const { post } = req.body || {};
  const owner = req.params.id;

  if (!owner)
    return res
      .status(400)
      .send("Make sure you are logged in, couldn't identify you");
  if (!post) return res.status(400).send("Post is required");

  try {
    const user = await User.findById(owner);
    if (!user)
      return res
        .status(400)
        .send("Make sure you are logged in, couldn't identify you");

    const savedPosts = await SPost.findOneAndUpdate(
      { owner },
      { lastEdited: Date.now() }
    );
    if (!savedPosts)
      return res.status(400).send("No saved posts found for this user");

    const postIndex = savedPosts.posts.indexOf(post);
    if (postIndex > -1) {
      savedPosts.posts.splice(postIndex, 1);
      await savedPosts.save();
      return res
        .status(200)
        .send(`Post ${post} removed from your saved posts successfully`);
    } else {
      return res.status(400).send("Post not found in your saved posts");
    }
  } catch (e) {
    return res
      .status(400)
      .send(
        e?.message || "Something went wrong, couldn't fetch your saved posts"
      );
  }
});

module.exports = router;
