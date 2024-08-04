const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../../models/UserModel");

const router = express.Router();

router.post("/user", async ({ body }, res) => {
  try {
    const { username, password } = body || {};
    if (!username) return res.status(400).send("Username is required");
    if (!password) return res.status(400).send("Password is required");

    const user = await User.findOne({ username: username });
    if (!user) return res.status(400).send("User not found");

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).send("Incorrect password");

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET
    );

    user.password = undefined;

    return res.status(200).send({ token, data: user });
  } catch (e) {
    return res.status(400).send(e?.message || "Couldn't login user");
  }
});

router.get("/all", async (req, res) => {
  try {
    const users = await User.find();
    return res.status(200).send(users);
  } catch (e) {
    return res.status(400).send(e?.message || "Couldn't fetch users");
  }
});

module.exports = router;
