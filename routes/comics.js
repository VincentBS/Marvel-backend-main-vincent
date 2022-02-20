require("dotenv").config;
const express = require("express");
const router = express.Router();
const axios = require("axios");

// Route /comics/:characterId pour récupérer les détails des comics, en fonction du characterId
router.get("/comics/:characterId", async (req, res) => {
  try {
    // API KEY MARVEL
    let apikey = `?apiKey=${process.env.MARVEL_API_KEY}`;

    const { data } = await axios.get(
      `${process.env.MARVEL_API_URL}/comics/${req.params.characterId}${apikey}`
    );
    console.log("API data response ===>", data.comics);
    res.status(200).json(data.comics);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Route /comics pour affichage ensemble des comics
router.get("/comics", async (req, res) => {
  try {
    // API KEY MARVEL
    let apikey = `?apiKey=${process.env.MARVEL_API_KEY}`;

    if (req.query.limit) {
      apikey += `&limit=${req.query.limit}`;
    }
    if (req.query.skip) {
      apikey += `&skip=${req.query.skip}`;
    }
    if (req.query.title && req.query.name !== "") {
      apikey += `&title=${req.query.title}`;
    }

    const { data } = await axios.get(
      `${process.env.MARVEL_API_URL}/comics${apikey}`
    );

    res.status(200).json(data.results);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
