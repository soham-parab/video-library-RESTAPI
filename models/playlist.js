const mongoose = require("mongoose");

const PlaylistSchema = mongoose.Schema({
  
      name: String,
      videos: [   
      ],
  
},
);

module.exports = mongoose.model("Playlist", PlaylistSchema);
