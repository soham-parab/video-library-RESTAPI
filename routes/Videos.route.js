const express = require("express");
const router = express.Router();
const Videos = require("../models/videos.model");
const verify = require("../middlewares/verifyToken");

//GET POSTS
router.get("/", verify, async (req, res) => {
  try {
    const getVideos = await Videos.find();
    console.log(getVideos);
    res.json(getVideos);
  } catch (err) {
    res.json({ message: err });
  }
});

//SUBMITS POST
router.post("/", async (req, res) => {
  try {
    const videos = req.body;
    const newVideo = new Videos(videos);
    const savedItem = await newVideo.save();
    res.json(savedItem);
  } catch (err) {
    res.json({ message: err });
  }
});

router.get("/:itemId", async (req, res) => {
  try {
    const itemFound = await Videos.findById(req.params.itemId);
    res.json(itemFound);
  } catch (err) {
    res.json({ message: err });
  }
});

router.delete("/:itemId", async (req, res) => {
  try {
    const removeItem = await Videos.remove({ _id: req.params.itemId });
    res.json(removeItem);
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = router;
