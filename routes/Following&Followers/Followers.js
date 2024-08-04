const express = require("express");
const Followers = require("../../models/Followers");
const User = require("../../models/UserModel");
const RequestFollow = require("../../models/RequestFollow");
const { roleMiddleware } = require("../../middlewares/authentication");

const router = express.Router();

router.post("/follow", roleMiddleware("USER"), async ({ body }, res) => {
  const { user, follower } = body || {};

  if (!user || !follower) {
    return res.status(400).send("User and follower are required");
  }

  try {
    const specifiedUser = await User.findById(user);

    if (specifiedUser.private === true) {
      await RequestFollow.create({ requestedBy: follower, to: user });

      return res.status(200).send("Request sent");
    } else {
      const followedUser = await Followers.findOne({ user });

      if (followedUser) {
        await Followers.findOneAndUpdate(
          { user },
          { $push: { followers: follower } },
          { new: true }
        );
      } else {
        await Followers.create({ user, followers: follower });
      }

      return res.status(200).send("Following");
    }
  } catch (e) {
    return res.status(400).send(e?.message || "Couldn't follow user");
  }
});

router.patch("/unfollow/:id", roleMiddleware("USER"), async (req, res) => {
  const follower = req.params.id;
  const { user } = req.body || {};

  try {
    await Followers.findOneAndUpdate(
      { user },
      { $pull: { followers: follower } },
      { new: true }
    );
    return res.status(200).send("User unfollowed");
  } catch (e) {
    return res.status(400).send(e?.message || "Couldn't unfollow user");
  }
});

router.delete(
  "/deleteFollowers/:id",
  roleMiddleware("USER"),
  async (req, res) => {
    const user = req.params.id;

    try {
      await Followers.findOneAndDelete({ user });
      return res.status(200).send("All followers remowed");
    } catch (e) {
      return res
        .status(400)
        .send(e?.message || "Couldn't delete followers user");
    }
  }
);

router.patch("/unfollowAll/:id", roleMiddleware("USER"), async (req, res) => {
  const follower = req.params.id;

  try {
    const allFollowersModels = await Followers.find({ followers: follower });

    const updatePromises = allFollowersModels.map((f) =>
      Followers.findByIdAndUpdate(
        f._id,
        { $pull: { followers: follower } },
        { new: true }
      )
    );
    await Promise.all(updatePromises);
    return res.status(200).send("Unfollowed everyone");
  } catch (e) {
    return res.status(400).send(e?.message || "Couldn't unfollow everyone");
  }
});

router.get("/followers/:id", roleMiddleware("USER"), async (req, res) => {
  const user = req.params.id;

  try {
    const followers = await Followers.findOne({ user }).populate({
      path: "followers",
      model: "User",
    });

    if (!followers)
      return res.status(400).send("User have zero followers still");

    return res.status(200).send(followers);
  } catch (e) {
    return res.status(400).send(e?.message || "Couldn't fetch your followers");
  }
});

router.get("/following/:id", roleMiddleware("USER"), async (req, res) => {
  const follower = req.params.id;

  try {
    const followers = await Followers.find({ followers: follower }).populate(
      "user"
    );

    if (followers.length === 0)
      return res.status(400).send("User follow zero account");

    return res.status(200).send(followers);
  } catch (e) {
    return res.status(400).send(e?.message || "Couldn't fetch your followers");
  }
});

router.get("/followRequest/:id", roleMiddleware("USER"), async (req, res) => {
  const id = req.params.id;

  try {
    const requests = await RequestFollow.find({ to: id })
      .sort({
        createdAt: -1,
      })
      .populate("to")
      .populate("requestedBy");
    if (!requests) return res.status(400).send("No requests avaible");

    return res.status(200).send(requests);
  } catch (e) {
    return res
      .status(400)
      .send(e?.message || "Couldn't fetch your follow requests");
  }
});

router.patch("/acceptFollows/:id", roleMiddleware("USER"), async (req, res) => {
  const requestId = req.params.id;
  const { isAccepted, user, follower } = req.body || {};

  try {
    if (isAccepted === true) {
      await RequestFollow.findByIdAndUpdate(
        requestId,
        { accept: true },
        { new: true }
      );

      const followedUser = await Followers.findOne({ user });

      if (followedUser) {
        await Followers.findOneAndUpdate(
          { user },
          { $push: { followers: follower } },
          { new: true }
        );
      } else {
        await Followers.create({ user, followers: follower });
      }

      return res.status(200).send("You accepret follow request");
    } else {
      await RequestFollow.findByIdAndDelete(requestId);

      return res.status(200).send("You declined follow request");
    }
  } catch (e) {
    return res.status(400).send(e?.message || "Somehting went wrong");
  }
});

module.exports = router;
