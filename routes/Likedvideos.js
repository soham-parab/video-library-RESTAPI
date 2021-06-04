const express = require("express");
const router = express.Router();

const Likedvids = require("../models/likedvideos");

//GET POSTS
router.get("/", async (req, res) => {
   try {
      const likedVideos = await Likedvids.find();
      res.json(likedVideos);
   } catch (err) {
      res.json({ message: err });
   }
});

//SUBMITS POST
router.post("/", async (req, res) => {
   console.log(req.body._id);
   try {
      const videos = req.body;
      const newVideo = new Likedvids(videos);
      const savedItem = await newVideo.save();
      res.json(savedItem);
   } catch (err) {
      res.json({ message: err });
   }
});

router.get("/:itemId", async (req, res) => {
   try {
      const itemFound = await Likedvids.findById(req.params.itemId);
      res.json(itemFound);
   } catch (err) {
      res.json({ message: err });
   }
});

router.delete("/:itemId", async (req, res) => {
   try {
      const removeItem = await Likedvids.remove({ _id: req.params.itemId });
      
      const savedLikedVideos = await Likedvids.find()
      res.json(savedLikedVideos);

   } catch (err) {
      res.json({ message: err });
   }
});

router.patch("/:prdId", async (req, res) => {
   try {
      const updatedPrd = await Likedvids.updateOne(
         { _id: req.params.prdId },
         {}
      );
      const newPrd = await Likedvids.find();
      res.json(newPrd);
      console.log(updatedPrd);
   } catch (err) {
      res.json({ message: err });
      console.log(err);
   }
});

module.exports = router;




 