const express = require("express");
const Ratings = require("../../models/StarRating");
const { roleMiddleware } = require("../../middlewares/authentication");

const router = express.Router();

router.get("/allRatings", roleMiddleware("ADMIN"), async (req, res) => {
  try {
    const ratings = await Ratings.find()
      .populate("ratedBy")
      .sort({ ratedAt: -1 });

    if (ratings.length === 0)
      return res.status(400).send("There is no rating avaible at the moment");

    return res.status(200).send(ratings);
  } catch (e) {
    return res
      .status(400)
      .send(e?.message || "Something went wrong,couldn't fetch ratings");
  }
});

module.exports = router;
