const mongoose = require("mongoose");

const LikedVideosSchema = mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  title: String,
  description: String,
  thumbnail: [],
  runtime: { minutes: Number, seconds: Number },
  video: String,
  categoryId: Number,
  subcategory: { typer: String, name: String },
  channel: String,
  views: Number,
});

module.exports = mongoose.model("Likedvids", LikedVideosSchema);
