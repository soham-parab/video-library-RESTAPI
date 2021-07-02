const express = require("express");

const router = express.Router();

const Videos = require("../models/videos.model");

console.log(Videos);

//GET POSTS
router.get("/", async (req, res) => {
   try {
      const getVideos = await Videos.find();
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

// const videos = new Videos({

// title: req.body.title,
// description: req.body.description,
// thumbnail: req.body.thumbnail,
// runtime: {
//    minutes: req.body.minutes,
//    seconds: req.body.seconds,
// },

// video: req.body.video,
// categoryId: req.body.categoryId,
// // subcategory: {
// //    type: req.body.category.type,
// //    name: req.body.category.name,
// // },

// channel: req.body.channel,
// views: req.body.views,
// });
