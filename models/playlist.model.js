const mongoose = require("mongoose");

const PlaylistSchema = mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  name: String,
  videos: [],
});

module.exports = mongoose.model("Playlist", PlaylistSchema);
