const express = require("express");
const verify = require("../middlewares/verifyToken");
const router = express.Router();

const Playlist = require("../models/playlist.model");

const { extend } = require("lodash");

//GET POSTS
router.get("/", verify, async (req, res) => {
  try {
    const playlistVideos = await Playlist.find();
    res.json(playlistVideos);
  } catch (err) {
    res.json({ message: err });
  }
});

//SUBMITS POST
router.post("/", verify, async (req, res) => {
  try {
    const playlist = new Playlist(req.body);
    const savedItem = await playlist.save();
    res.json(savedItem);
  } catch (err) {
    res.json({ message: err });
  }
});

router.post("/update/:id", verify, async (req, res) => {
  try {
    const playlist = await Playlist.findById(req.params.id);

    console.log(playlist, "playlist 22");

    const oldVids = playlist.videos;

    const newVid = [...oldVids, req.body.video];

    console.log(newVid, "newVid 30");

    const savedPlaylist = await Playlist.updateOne(
      { _id: req.params.id },
      {
        $set: { videos: newVid },
      }
    );

    console.log(savedPlaylist, "savedPlaylist 40");

    const getPlaylist = await Playlist.findById(req.params.id);

    res.json(getPlaylist);
  } catch (err) {
    res.json({ message: err });
    console.log(err);
  }
});

router.post("/delete", verify, async (req, res) => {
  try {
    let { playlistId, videoId } = req.body;
    const playlist = await Playlist.findById(playlistId);

    console.log(playlist, "playlist 22");

    // const oldVids = playlist.videos
    // const removeVideo = playlist.videos._id
    // console.log(removeVideo)

    //

    let newdata = {
      ...playlist,
      videos: playlist.videos.filter((item) => item._id !== videoId),
    };

    let data = extend(playlist, newdata);

    const savedData = await data.save();

    res.json(savedData);
  } catch (err) {
    res.json({ message: err });
    console.log(err);
  }
});

router.post("/:itemId", async (req, res) => {
  console.log(req.params.itemId);
  console.log(req.body.videos);

  try {
    const newVid = await Playlist.updateOne(
      { _id: req.params.itemId },

      req.body
    );
    console.log(newVid);
    const newVids = await Playlist.find();
    res.json(newVids);
  } catch (err) {
    res.json({ message: err });
    console.log(err);
  }
});

router.get("/:itemId", async (req, res) => {
  try {
    const itemFound = await Playlist.findById(req.params.itemId);
    res.json(itemFound);
  } catch (err) {
    res.json({ message: err });
  }
});

router.delete("/:itemId", async (req, res) => {
  try {
    const removeItem = await Playlist.remove({ _id: req.params.itemId });
    res.json(removeItem);
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = router;
