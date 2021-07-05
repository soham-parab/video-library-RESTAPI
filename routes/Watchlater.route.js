const express = require("express");
const verify = require("../middlewares/verifyToken");
const router = express.Router();
const WatchLater = require("../models/watchlater.model");

//GET POSTS
router.get("/", verify, async (req, res) => {
  try {
    const watchLaterVids = await WatchLater.find({ user: req.user._id });
    res.json(watchLaterVids);
  } catch (err) {
    res.json({ message: err });
  }
});

//SUBMITS POST
router.post("/", verify, async (req, res) => {
  console.log(req.body._id);
  try {
    const videos = req.body;
    const newVideo = new WatchLater({ ...videos, user: req.user._id });
    const savedItem = await newVideo.save({ user: req.user._id });
    res.json(savedItem);
  } catch (err) {
    res.json({ message: err });
  }
});

// router.get("/:itemId", verify, async (req, res) => {
//   try {
//     const itemFound = await WatchLater.findById(req.params.itemId);
//     res.json(itemFound);
//   } catch (err) {
//     res.json({ message: err });
//   }
// });

router.delete("/:itemId", verify, async (req, res) => {
  try {
    const removeItem = await WatchLater.remove({
      _id: req.params.itemId,
      user: req.user._id,
    });

    const savedWatchLater = await WatchLater.find({ user: req.user._id });
    res.json(savedWatchLater);
  } catch (err) {
    res.json({ message: err });
  }
});

// router.patch("/:prdId", verify, async (req, res) => {
//   try {
//     const updatedPrd = await WatchLater.updateOne(
//       { _id: req.params.prdId },
//       {}
//     );
//     const newPrd = await WatchLater.find();
//     res.json(newPrd);
//     console.log(updatedPrd);
//   } catch (err) {
//     res.json({ message: err });
//     console.log(err);
//   }
// });

module.exports = router;
