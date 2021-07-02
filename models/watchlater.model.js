const mongoose = require("mongoose");
const WatchLaterSchema = mongoose.Schema({
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

module.exports = mongoose.model("WatchLater", WatchLaterSchema);
