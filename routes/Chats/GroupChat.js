const express = require("express");
const Chat = require("../../models/Chat");
const { roleMiddleware } = require("../../middlewares/authentication");

const router = express.Router();

router.post(
  "/createGroupChat/:id",
  roleMiddleware("USER"),
  async (req, res) => {
    const groupAdmin = req.params.id;
    if (!groupAdmin)
      return res
        .status(400)
        .send("Make sure you are logged in,couln't identify you");

    const { chatName, users } = req.body || {};
    if (!chatName) return res.status(400).send("Group chat name is required");
    if (users.length < 2)
      return res.status(400).send("At least 2 another users + you required");

    try {
      const groupChat = await Chat.create({
        chatName,
        users,
        isGroupChat: true,
        groupAdmin,
      });

      if (!groupChat)
        return res
          .status(400)
          .send("Couldn't make new group chat,try again later");

      const fullGroupChat = await Chat.findById(groupChat.id)
        .populate({
          path: "users",
          model: "User",
        })
        .populate("groupAdmin");

      return res.status(200).send(fullGroupChat);
    } catch (e) {
      return res
        .status(400)
        .send(
          e?.message || "Something went wrong,couldn't make your group chat"
        );
    }
  }
);

router.patch("/renameGroup/:id", roleMiddleware("USER"), async (req, res) => {
  const chatId = req.params.id;
  const { chatName } = req.body || {};

  if (!chatName) return res.status(400).send("Chatname is not provided");
  if (!chatId)
    return res
      .status(400)
      .send("You didn't provide what chat you are trying to rename");

  try {
    const oldChat = await Chat.findById(chatId);
    if (!oldChat) return res.status(400).send("Provided chat doesn't exist");

    await Chat.findByIdAndUpdate(chatId, { chatName }, { new: true });

    return res
      .status(200)
      .send(`Chat ${oldChat.chatName} renamed successfully to ${chatName}`);
  } catch (e) {
    return res
      .status(400)
      .send(e?.message || "Something went wrong,couldn't rename group chat");
  }
});

router.delete("/deleteChat/:id", roleMiddleware("USER"), async (req, res) => {
  const chatId = req.params.id;
  if (!chatId)
    return res
      .status(400)
      .send("You didn't provide what chat you are trying to delete");

  try {
    await Chat.findByIdAndDelete(chatId);

    return res.status(200).send("Chat deleted successfully");
  } catch (e) {
    return res
      .status(400)
      .send(
        e?.message || "Something went wrong,couldn't delete specified chat"
      );
  }
});

router.put("/addUserToGroup/:id", roleMiddleware("USER"), async (req, res) => {
  const chatId = req.params.id;
  const { user } = req.body || {};

  if (!chatId)
    return res.status(400).send("You didn't provide what chat you are editing");
  if (!user)
    return res
      .status(400)
      .send("Couldn't identify user you are trying to add to chat");

  try {
    await Chat.findByIdAndUpdate(chatId, { $push: { users: user } });

    return res.status(200).send("User successfully added to group");
  } catch (e) {
    return res
      .status(400)
      .send("Something went wrong,couldn't add user to group");
  }
});

router.patch(
  "/removeUserFromGroup/:id",
  roleMiddleware("USER"),
  async (req, res) => {
    const chatId = req.params.id;
    const { user } = req.body || {};

    if (!chatId)
      return res
        .status(400)
        .send("You didn't provide what chat you are editing");
    if (!user)
      return res
        .status(400)
        .send("Couldn't identify user you are trying to remove from chat");

    try {
      await Chat.findByIdAndUpdate(chatId, { $pull: { users: user } });

      return res.status(200).send("User successfully removed from group");
    } catch (e) {
      return res
        .status(400)
        .send("Something went wrong,couldn't remove user from group");
    }
  }
);

module.exports = router;
