const express = require("express");
const router = express.Router();
const User = require("../models/user.model");

router.get("/:userId", async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).populate("likedVideos");
    res.json(user);
  } catch (err) {
    console.log("err", err);
  }
});

// router.post("/addLikedVideo/:userId", async (req, res) => {
//   console.log(req.body);

//   const addVideo = req.body;

//   try {
//     const userData = await User.findById(req.params.userId).populate(
//       "LikedVideo"
//     );

//     const resss = (userData.likedVideos = new User({
//       ...newLikedVideo,
//     }));
//   } catch (err) {
//     console.log(err);
//   }
// });

module.exports = router;
