const mongoose = require("mongoose");

const FavoriteCharacter = mongoose.model("FavoriteCharacter", {
  apiid: {
    type: String,
  },
  name: {
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

module.exports = FavoriteCharacter;
