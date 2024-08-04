const express = require("express");
const User = require("../../models/UserModel");
const Rating = require("../../models/StarRating");
const { roleMiddleware } = require("../../middlewares/authentication");

const router = express.Router();

router.post("/rateApp", roleMiddleware("USER"), async ({ body }, res) => {
  const { ratedBy, stars } = body || {};

  if (!ratedBy || !stars)
    return res
      .status(400)
      .send(`Some required fields are missing: ${ratedBy} or ${stars}`);

  try {
    const user = await User.findById(ratedBy);
    if (!user)
      return res
        .status(400)
        .send("Couldn't identify you,make sure you are logged in");

    await Rating.create({ ratedBy, stars });

    await User.findByIdAndUpdate(ratedBy, { rated: true }, { new: true });

    return res
      .status(200)
      .send(`Thank you ${user.firstName} for rating our application`);
  } catch (e) {
    return res
      .status(400)
      .send(e?.message || "Couldn't rate app,try again later");
  }
});

module.exports = router;
