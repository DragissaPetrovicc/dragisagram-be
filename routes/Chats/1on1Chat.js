const express = require("express");
const User = require("../../models/UserModel");
const Chat = require("../../models/Chat");
const { roleMiddleware } = require("../../middlewares/authentication");

const router = express.Router();

router.post("/oneonone/:id", roleMiddleware("USER"), async (req, res) => {
  const loggedUser = req.params.id;
  const { userId } = req.body || {};
  if (!loggedUser || !userId)
    return res.status(400).send("Couldn't identify all users");

  try {
    const chatName = await User.findById(userId);

    let chat = await Chat.find({
      isGroupChat: false,
      $and: [
        { users: { $elemMatch: { $eq: loggedUser } } },
        { users: { $elemMatch: { $eq: userId } } },
      ],
    })
      .populate({
        path: "users",
        model: "User",
      })
      .populate("latestMessage");
    chat = await User.populate(chat, {
      path: "latestMessage.sender",
      select: "username image email",
    });
    if (chat.length > 0) {
      return res.status(200).send(chat[0]);
    } else {
      const chatData = {
        chatName: chatName.username,
        isGroupChat: false,
        users: [loggedUser, userId],
      };

      const newChat = await Chat.create(chatData);

      const fullChat = await Chat.findById(newChat._id).populate({
        path: "users",
        model: "User",
      });

      return res.status(200).send(fullChat);
    }
  } catch (e) {
    return res
      .status(400)
      .send(e?.message || "Something went wrong ,try again later");
  }
});

module.exports = router;
