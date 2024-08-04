const express = require("express");
const User = require("../../models/UserModel");
const Block = require("../../models/BlockList");
const { roleMiddleware } = require("../../middlewares/authentication");

const router = express.Router();

router.get("/search/:id", roleMiddleware("USER"), async (req, res) => {
  const { search } = req.query;
  const { owner } = req.params.id || {};

  if (!search) return res.status(400).send("Search field is empty");

  try {
    const blockList = await Block.findOne({ owner }).lean();
    const blockedUserIds = blockList?.users || [];

    const users = await User.find({
      _id: { $nin: blockedUserIds },
      $or: [{ username: search }, { firstName: search }],
    }).sort({ username: 1 });

    if (users.length === 0)
      return res.status(400).send("Specified user doesn't exist");

    return res.status(200).send(users);
  } catch (e) {
    return res
      .status(400)
      .send(e?.message || "Something went wrong, couldn't find specified user");
  }
});

router.get("/:id", roleMiddleware("USER"), async (req, res) => {
  const id = req.params.id;

  try {
    const user = await User.findById(id);

    if (!user) return res.status(400).send("User doesn't exist");

    return res.status(200).send(user);
  } catch (e) {
    return res
      .status(400)
      .send(e?.message || "Something went wrong, couldn't find specified user");
  }
});

module.exports = router;
