const express = require("express");
const Post = require("../../models/PostModel");
const User = require("../../models/UserModel");
const Followers = require("../../models/Followers");
const { roleMiddleware } = require("../../middlewares/authentication");

const router = express.Router();

router.get("/allPosts/:id", roleMiddleware("USER"), async (req, res) => {
  try {
    const follower = req.params.id;
    const offset = req.query;

    const publicAccounts = await User.find({ private: false });

    const follow = await Followers.find({ followers: follower }).populate({
      path: "followers",
      model: "User",
    });

    const followedAccounts = follow
      .map((f) => f.followers)
      .flat()
      .filter((f) => f._id.toString() !== follower);

    const postsICanSee = [...followedAccounts, ...publicAccounts];
    const arrayOwnerIds = postsICanSee.map((p) => p._id);

    const allPosts = await Post.find({
      owner: { $in: arrayOwnerIds },
    })
      .sort({ postedAt: -1 })
      .skip(offset)
      .populate("owner")
      .populate({ path: "tags", model: "User" })
      .limit(15);

    if (allPosts.length === 0) {
      return res.status(400).send("There are no posts available at the moment");
    }

    return res.status(200).send(allPosts);
  } catch (e) {
    return res
      .status(400)
      .send(e?.message || "Couldn't fetch any posts, try again later");
  }
});

router.get("/allPostsBy/:id", roleMiddleware("USER"), async (req, res) => {
  const owner = req.params.id;
  if (!owner)
    return res
      .status(400)
      .send("You didn't provide for what user you are fetching posts");

  try {
    const user = await User.findById(owner);
    if (!user) return res.status(400).send("Specified user doesn't exist");

    const allPosts = await Post.find({ owner: owner })
      .sort({ postedAt: -1 })
      .populate("owner");

    if (allPosts.length === 0)
      return res
        .status(400)
        .send("There is no posts avaible for specified user at the moment");

    return res.status(200).send(allPosts);
  } catch (e) {
    return res
      .status(400)
      .send(
        e?.message ||
          "Couldn't fetch any post for specified user,try again later"
      );
  }
});

router.get("/:id", roleMiddleware("USER"), async (req, res) => {
  const id = req.params.id;
  if (!id)
    return res
      .status(400)
      .send("You didn't provide for what user you are fetching posts");

  try {
    const post = await Post.findById(id)
      .sort({ postedAt: -1 })
      .populate("owner")
      .populate({ path: "tags", model: "User" });

    if (!post)
      return res
        .status(400)
        .send("There is no post avaible for specified user at the moment");

    return res.status(200).send(post);
  } catch (e) {
    return res
      .status(400)
      .send(
        e?.message ||
          "Couldn't fetch any post for specified user,try again later"
      );
  }
});

module.exports = router;
