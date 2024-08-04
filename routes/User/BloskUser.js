const express = require("express");
const Block = require("../../models/BlockList");
const { roleMiddleware } = require("../../middlewares/authentication");

const router = express.Router();

router.post("/blockUser/:id", roleMiddleware("USER"), async (req, res) => {
  const owner = req.params.id;
  const { user } = req.body || {};

  try {
    const blockedUsers = await Block.findOne({ owner });

    if (!blockedUsers) {
      await Block.create({ owner, users: user });
    } else {
      await Block.findOneAndUpdate(
        { owner },
        { $push: { users: user } },
        { new: true }
      );
    }

    return res.status(200).send("User blocked successfully");
  } catch (e) {
    return res
      .status(400)
      .send(e?.message || "Something went wrong,couldn't block user");
  }
});

router.get("/blockList/:id", roleMiddleware("USER"), async (req, res) => {
  const id = req.params.id;

  try {
    const blocklist = await Block.findOne({ owner: id })
      .populate({
        path: "users",
        model: "User",
      })
      .lean();

    if (!blocklist)
      return res.status(400).send("You have not blocked any user still");

    return res.status(200).send(blocklist);
  } catch (e) {
    return res
      .status(400)
      .send(e?.message || "Somehting went wrong, couldn't fetch blocklist");
  }
});

router.patch("/unblockUser/:id", roleMiddleware("USER"), async (req, res) => {
  const owner = req.params.id;
  const { user } = req.body || {};

  try {
    await Block.findOneAndUpdate(
      { owner },
      { $pull: { users: user } },
      { new: true }
    );

    return res.status(200).send("User unblocked successfully");
  } catch (e) {
    return res
      .status(400)
      .send(e?.message || "Something went wrong,couldn't unblock user");
  }
});

module.exports = router;
