const express = require("express");
const User = require("../../models/UserModel");
const { roleMiddleware } = require("../../middlewares/authentication");

const router = express.Router();

router.delete("/delete/:id", roleMiddleware("USER"), async (req, res) => {
  const id = req.params.id;
  if (!id)
    return res
      .status(400)
      .send("You didn't provide what user you are trying to delete");

  try {
    await User.findByIdAndDelete(id);

    return res.status(200).send(`User ${id} deleted successfully`);
  } catch (e) {
    return res
      .status(400)
      .send(e?.message || "Something went wrong,couldn't delete user");
  }
});

module.exports = router;
