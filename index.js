const express = require("express");
const app = express();
const mongoose = require("mongoose");

const bodyParser = require("body-parser");
const cors = require("cors");

const likedVideosRoute = require("./routes/Likedvideos");
const playlistRoute = require("./routes/Playlist");
const watchLaterRoute = require("./routes/Watchlater");
const videosRoute = require("./routes/Videos");

require("dotenv/config");

//ROUTES
const PORT = process.env.PORT || 3100;

//MIDDLEWARES
app.use(bodyParser.json());
app.use(cors());
app.use("/likedvideos", likedVideosRoute);
app.use("/watchlater", watchLaterRoute);
app.use("/videos", videosRoute);
app.use("/playlists", playlistRoute);

app.get("/", (req, res) => {
   res.send("juasdjaksd");
});

mongoose.connect(
   process.env.DB_CONNECTION,
   { useNewUrlParser: true, useUnifiedTopology: true },
   () => {
      console.log("hello");
   }
);

app.listen(PORT);
