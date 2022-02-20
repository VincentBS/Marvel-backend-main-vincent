const express = require("express");
const router = express.Router();
import isAuthenticated from "./isAuthenticated.js";
import FavoriteCharacter from "../Models/FavoriteCharacter";
import FavoriteComic from "../Models/FavoriteComic";

// ******* COMIC ******* \\
// Route pour récupérer tous les comics favoris d'un User
router.get("/favorite/comics", isAuthenticated, async (req, res) => {
  try {
    let search = await FavoriteComic.find({ user: req.user });
    res.status(200).json(search);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Route pour enregistrer un comic favori dans la BDD, en correspondance avec le bon User
router.post("/favorite/comic", isAuthenticated, async (req, res) => {
  try {
    const favoritesInfos = req.fields;
    const newFavoriteComic = new FavoriteComic({
      apiid: favoritesInfos._id,
      title: favoritesInfos.title,
      description: favoritesInfos.description,
      thumbnail: {
        path: favoritesInfos.thumbnail.path,
        extension: favoritesInfos.thumbnail.extension,
      },
      user: req.user,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Route pour supprimer un comic favori dans la BDD, en correspondance avec le bon User
router.delete("/favorite/comic/delete", isAuthenticated, async (req, res) => {
  try {
    let status = await FavoriteComic.findOneAndDelete({
      apiid: req.fields.apiid,
    });
    res.status(200).json("Has been successfully deleted");
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// ******* CHARACTER ******* \\
// Route pour récupérer tous les characters favoris d'un User
router.get("/favorite/characters", isAuthenticated, async (req, res) => {
  try {
    let search = await FavoriteCharacter.find({ user: req.user });
    res.status(200).json(search);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Route pour enregistrer un character favori dans la BDD, en correspondance avec le bon User
router.post("/favorite/character", isAuthenticated, async (req, res) => {
  try {
    const favoritesInfos = req.fields;
    const newFavoriteCharacter = new FavoriteCharacter({
      apiid: favoritesInfos._id,
      name: favoritesInfos.name,
      description: favoritesInfos.description,
      thumbnail: {
        path: favoritesInfos.thumbnail.path,
        extension: favoritesInfos.thumbnail.extension,
      },
      user: req.user,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Route pour supprimer un character favori dans la BDD, en correspondance avec le bon User
router.delete(
  "/favorite/character/delete",
  isAuthenticated,
  async (req, res) => {
    try {
      let status = await FavoriteCharacter.findOneAndDelete({
        apiid: req.fields.apiid,
      });
      res.status(200).json("Has been successfully deleted");
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
);

module.exports = router;
