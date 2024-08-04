const express = require("express");
const Chat = require("../../models/Chat");
const Msg = require("../../models/Messages");
const User = require("../../models/UserModel");
const { roleMiddleware } = require("../../middlewares/authentication");

const router = express.Router();

router.post("/send", roleMiddleware("USER"), async ({ body }, res) => {
  const { sender, content, chat } = body || {};
  if (!sender)
    return res
      .status(400)
      .send("Couldn't identify you,make sure you are logged in");
  if (!content)
    return res
      .status(400)
      .send("Type message field is empty,fill type message field");
  if (!chat)
    return res
      .status(400)
      .send("You didn't provide for what chat this massage is");

  try {
    const message = await Msg.create({
      sender,
      content,
      chat,
    });

    let fullMessage = await Msg.findById(message._id)
      .populate("sender")
      .populate("chat");

    fullMessage = await User.populate(fullMessage, {
      path: "chat.users",
      model: "User",
    });

    await Chat.findByIdAndUpdate(chat, {
      latestMessage: message,
    });

    return res.status(200).send(fullMessage);
  } catch (e) {
    return res
      .status(400)
      .send(e?.message || "Something went wrong,couldn't send message");
  }
});

router.get(
  "/allMessagesForChat/:id",
  roleMiddleware("USER"),
  async (req, res) => {
    const chatId = req.params.id;
    if (!chatId)
      return res
        .status(400)
        .send("You didn't provide for what chat you are fetching messages");

    try {
      const messages = await Msg.find({ chat: chatId })
        .populate("sender")
        .populate({
          path: "chat",
          populate: [
            { path: "groupAdmin", model: "User" },
            { path: "users", model: "User" },
          ],
        });
      if (!messages || messages.length === 0)
        return res.status(400).send("No massages yet");

      return res.status(200).send(messages);
    } catch (e) {
      return res
        .status(400)
        .send("Something went wrong,couldn't fetch messages");
    }
  }
);

router.delete("/delete/:id", roleMiddleware("USER"), async (req, res) => {
  const msgId = req.params.id;
  if (!msgId)
    return res
      .status(400)
      .send("You didn't provide what message you want to delete");

  try {
    await Msg.findByIdAndDelete(msgId);

    return res.status(200).send("Message deleted successfully");
  } catch (e) {
    return res
      .status(400)
      .send(e?.message || "Something went wrong,couldn't delete message");
  }
});

router.patch("/edit/:id", roleMiddleware("USER"), async (req, res) => {
  const msgId = req.params.id;
  const { content } = req.body || {};

  try {
    await Msg.findByIdAndUpdate(msgId, { content });

    return res.status(200).send("Message edited successfully");
  } catch (e) {
    return res
      .status(400)
      .send(e?.message || "Something went wrong,couldn't edit message");
  }
});

module.exports = router;
