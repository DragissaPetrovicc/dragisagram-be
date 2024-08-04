const express = require("express");
const User = require("../../models/UserModel");
const { roleMiddleware } = require("../../middlewares/authentication");

const router = express.Router();

router.get("/allUsers", roleMiddleware("ADMIN"), async (req, res) => {
  try {
    const users = await User.find();

    if (users.length === 0)
      return res.status(400).send("There is no existing users");

    return res.status(200).send(users);
  } catch (e) {
    return res
      .status(400)
      .send(e?.message || "Something went wrong,couldn't fetch users");
  }
});

module.exports = router;
