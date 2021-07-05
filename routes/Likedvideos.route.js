const express = require("express");
const router = express.Router();
const verify = require("../middlewares/verifyToken");
const Likedvids = require("../models/likedvideos.model");

//GET POSTS
router.get("/", verify, async (req, res) => {
  try {
    const likedVideos = await Likedvids.find({ user: req.user_id });
    res.json(likedVideos);
  } catch (err) {
    res.json({ message: err });
  }
});

//SUBMITS POST
router.post("/", verify, async (req, res) => {
  try {
    const videos = req.body;
    const newVideo = new Likedvids({ ...videos, user: req.user._id });
    const savedItem = await newVideo.save({ user: req.user._id });
    res.json(savedItem);
  } catch (err) {
    res.status(400).json({ success: false, message: err });
  }
});

// router.get("/:itemId", async (req, res) => {
//   try {
//     const itemFound = await Likedvids.findById(req.params.itemId);
//     res.json(itemFound);
//   } catch (err) {
//     res.json({ message: err });
//   }
// });

router.delete("/:itemId", verify, async (req, res) => {
  try {
    const removeItem = await Likedvids.remove({
      _id: req.params.itemId,
      user: req.user._id,
    });
    const savedLikedVideos = await Likedvids.find({ user: req.user._id });
    res.json(savedLikedVideos);
  } catch (err) {
    res.json({ message: err });
  }
});

// router.patch("/:prdId", async (req, res) => {
//   try {
//     const updatedPrd = await Likedvids.updateOne({ _id: req.params.prdId }, {});
//     const newPrd = await Likedvids.find();
//     res.json(newPrd);
//     console.log(updatedPrd);
//   } catch (err) {
//     res.json({ message: err });
//     console.log(err);
//   }
// });

module.exports = router;
