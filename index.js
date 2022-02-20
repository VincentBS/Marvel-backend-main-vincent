// Import des packages
const express = require("express");
const formidable = require("express-formidable");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
app.use(formidable());
app.use(cors()); // Permet d'autoriser les demandes provenant de l'extérieur d'appeler l'API

// Connection Mongoose
mongoose.connect(process.env.MONGODB_URI, {
  // deprecation warning
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Import routes
const signup = require("./routes/user");
app.use(signup);

const comics = require("./routes/comics");
app.use(comics);

const characters = require("./routes/characters");
app.use(characters);

// Routes qui n'existent pas, Page not found
app.get("*", (req, res) => {
  res.status(404).json({ error: "page not found" });
});

// Démarrage du serveur
app.listen(process.env.PORT, () => {
  console.log("Server Started");
});
