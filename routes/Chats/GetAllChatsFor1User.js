const express = require("express");
const User = require("../../models/UserModel");
const Chat = require("../../models/Chat");
const { roleMiddleware } = require("../../middlewares/authentication");

const router = express.Router();

router.get("/allChats/:id", roleMiddleware("USER"), async (req, res) => {
  const userId = req.params.id;
  if (!userId)
    return res
      .status(400)
      .send("Couldn't identify you,make sure you are logged in");

  try {
    const user = await User.findById(userId);
    if (!user)
      return res.status(400).send("Your account doesn't exist anymore");

    let chats = await Chat.find({
      users: { $elemMatch: { $eq: userId } },
    })
      .populate({ path: "users", model: "User" })
      .populate("latestMessage")
      .populate({ path: "groupAdmin", model: "User" })
      .sort({ updatedAt: -1 });

    chats = await User.populate(chats, {
      path: "latestMessage.sender",
      select: "username image email",
    });

    if (chats.length === 0)
      return res.status(400).send("You have no chats avaible");

    return res.status(200).send(chats);
  } catch (e) {
    return res
      .status(400)
      .send(e?.message || "Something went wrong,couldn't fetch your chats");
  }
});

module.exports = router;
