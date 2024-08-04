const express = require("express");
const PostReps = require("../../models/RepPost");
const UserReps = require("../../models/RepUser");
const { roleMiddleware } = require("../../middlewares/authentication");

const router = express.Router();

router.get("/getPostReps", roleMiddleware("ADMIN"), async (req, res) => {
  try {
    const postReps = await PostReps.find()
      .sort({ createdAt: -1 })
      .populate("reportedBy")
      .populate("reportedPost");

    if (postReps.length === 0)
      return res.status(400).send("There is no post reports avaible");

    return res.status(200).send(postReps);
  } catch (e) {
    return res
      .status(400)
      .send(e?.message || "Something went wrong,couldn't fetch post reports");
  }
});

router.get("/getPostRep/:id", roleMiddleware("ADMIN"), async (req, res) => {
  const id = req.params.id;
  if (!id)
    return res
      .status(400)
      .send("You didn't provide what rep you are trying to fetch");

  try {
    const rep = await PostReps.findById(id)
      .sort({ createdAt: -1 })
      .populate("reportedBy")
      .populate("reportedPost");
    if (!rep) return res.status(400).send("Specified report doesn't exist");

    return res.status(200).send(rep);
  } catch (e) {
    return res
      .status(400)
      .send(
        e?.message ||
          "Something went wrong,couldn't fetch specified post report"
      );
  }
});

router.delete(
  "/deletePostRep/:id",
  roleMiddleware("ADMIN"),
  async (req, res) => {
    const id = req.params.id;
    if (!id)
      return res
        .status(400)
        .send("You didn't provide what rep you are trying to delete");

    try {
      await PostReps.findByIdAndDelete(id);

      return res.status(200).send("Report deleted successfully");
    } catch (e) {
      return res
        .status(400)
        .send(
          e?.message ||
            "Something went wrong,couldn't fetch specified post report"
        );
    }
  }
);

router.delete(
  "/deleteUserRep/:id",
  roleMiddleware("ADMIN"),
  async (req, res) => {
    const id = req.params.id;
    if (!id)
      return res
        .status(400)
        .send("You didn't provide what rep you are trying to delete");

    try {
      await UserReps.findByIdAndDelete(id);

      return res.status(200).send("Report deleted successfully");
    } catch (e) {
      return res
        .status(400)
        .send(
          e?.message ||
            "Something went wrong,couldn't fetch specified post report"
        );
    }
  }
);

router.get("/getUserRep/:id", roleMiddleware("ADMIN"), async (req, res) => {
  const id = req.params.id;

  if (!id)
    return res
      .status(400)
      .send("You didn't provide what rep you are trying to fetch");

  try {
    const rep = await UserReps.findById(id)
      .sort({ createdAt: -1 })
      .populate("reportedBy")
      .populate("reportedUser");

    if (!rep) return res.status(400).send("Specified user rep doesn't exist");

    return res.status(200).send(rep);
  } catch (e) {
    return res
      .status(400)
      .send(
        e?.message ||
          "Something went wrong,couldn't fetch specified user report"
      );
  }
});

router.get("/getUserReps", roleMiddleware("ADMIN"), async (req, res) => {
  try {
    const userReps = await UserReps.find()
      .sort({ createdAt: -1 })
      .populate("reportedBy")
      .populate("reportedUser");
    if (userReps.length === 0)
      return res.status(400).send("There is no user reports avaible");

    return res.status(200).send(userReps);
  } catch (e) {
    return res
      .status(400)
      .send(e?.message || "Something went wrong,couldn't fetch user reports");
  }
});

module.exports = router;
