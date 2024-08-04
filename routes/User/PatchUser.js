const express = require("express");
const User = require("../../models/UserModel");
const bcrypt = require("bcrypt");
const { roleMiddleware } = require("../../middlewares/authentication");

const router = express.Router();

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[cC][oO][mM]$/;
const phoneNumberRegex = /^\+[0-9]+$/;

router.patch("/edit/:id", roleMiddleware("USER"), async (req, res) => {
  const id = req.params.id;
  if (!id)
    return res.status(400).send("You didn't provide what user you are editing");

  const { password, username, email, phoneNumber, firstName, role, private } =
    req.body || {};
  if (!password && !username && !email && !phoneNumber && !firstName)
    return res.status(400).send("All fields are empty");

  try {
    const updateData = {};
    const allUsers = await User.find();

    if (password) {
      if (password.trim().length < 6)
        return res
          .status(400)
          .send("Password must be at least 6 characters long");

      const saltRounds = 10;
      const salt = await bcrypt.genSalt(saltRounds);
      const hash = await bcrypt.hash(password, salt);
      updateData.password = hash;
    }

    if (role) updateData.role = role;
    if (private) updateData.private = private;

    if (username) {
      if (username.trim().length < 6)
        return res
          .status(400)
          .send("Username must be at least 6 characters long");
      allUsers.map((u) => {
        if (u.username === username)
          return res.status(400).send("Username is already used");
      });
      updateData.username = username;
    }

    if (email) {
      if (!emailRegex.test(email))
        return res.status(400).send("Email is invalid (someemail@gmail.com)");
      allUsers.map((u) => {
        if (u.email === email)
          return res.status(400).send("Email is already used");
      });
      updateData.email = email;
    }

    if (firstName) updateData.firstName = firstName;

    if (phoneNumber) {
      if (!phoneNumberRegex.test(phoneNumber))
        return res.status(400).send("Phone number is invalid (+387000111)");
      allUsers.map((u) => {
        if (u.phoneNumber === phoneNumber)
          return res.status(400).send("Phone number is already used");
      });
      updateData.phoneNumber = phoneNumber;
    }

    const updateUser = await User.findByIdAndUpdate(id, updateData, {
      new: true,
    });
    if (!updateUser)
      return res
        .status(400)
        .send("Couldn't update user because user doesn't exist");

    return res
      .status(200)
      .send(`User ${updateUser.username} updated successfully`);
  } catch (e) {
    return res
      .status(400)
      .send(
        e?.message || "Something went wrong, so couldn't edit specified user"
      );
  }
});

module.exports = router;
