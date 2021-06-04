const express = require("express");

const router = express.Router();

const WatchLater = require("../models/watchlater");

//GET POSTS
router.get("/", async (req, res) => {
   try {
      const watchLaterVids = await WatchLater.find();
      res.json(watchLaterVids);
   } catch (err) {
      res.json({ message: err });
   }
});

//SUBMITS POST
router.post("/", async (req, res) => {
   console.log(req.body._id);
   try {
      const videos = req.body;
      const newVideo = new WatchLater(videos);
      const savedItem = await newVideo.save();
      res.json(savedItem);
   } catch (err) {
      res.json({ message: err });
   }
});

router.get("/:itemId", async (req, res) => {
   try {
      const itemFound = await WatchLater.findById(req.params.itemId);
      res.json(itemFound);
   } catch (err) {
      res.json({ message: err });
   }
});

router.delete("/:itemId", async (req, res) => {
   try {
      const removeItem = await WatchLater.remove({ _id: req.params.itemId });

  const savedWatchLater = await WatchLater.find()
      res.json(savedWatchLater);
   } catch (err) {
      res.json({ message: err });
   }
});

router.patch("/:prdId", async (req, res) => {
   try {
      const updatedPrd = await WatchLater.updateOne(
         { _id: req.params.prdId },
         {}
      );
      const newPrd = await WatchLater.find();
      res.json(newPrd);
      console.log(updatedPrd);
   } catch (err) {
      res.json({ message: err });
      console.log(err);
   }
});

module.exports = router;
