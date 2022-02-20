const mongoose = require("mongoose");

const FavoriteComic = mongoose.model("FavoriteComic", {
  apiid: {
    type: String,
  },
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  thumbnail: {
    path: {
      type: String,
    },
    extension: {
      type: String,
    },
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = FavoriteComic;
