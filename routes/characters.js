const express = require("express");
const router = express.Router();
const axios = require("axios");

// Route /characters avec une recherche dans les characters (Method GET via Query)
router.get("/characters", async (req, res) => {
  try {
    let apikey = `?apiKey=${process.env.MARVEL_API_KEY}`;

    if (req.query.limit) {
      apikey += `&limit=${req.query.limit}`;
    }
    if (req.query.skip) {
      apikey += `&skip=${req.query.skip}`;
    }
    if (req.query.name && req.query.name !== "") {
      apikey += `&name=${req.query.name}`;
    }

    const { data } = await axios.get(
      `${process.env.MARVEL_API_URL}/characters${apikey}`
    );

    res.status(200).json(data.results);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Route /character/:characterId pour récupérer des informations supplémentaires sur un character sélectionné en fonction de son id (Method GET via params)
router.get("/character/:characterId", async (req, res) => {
  try {
    const charIdSelection = `/character/${req.params.characterId}?apiKey=${process.env.MARVEL_API_KEY}`;

    const { data } = await axios.get(
      `${process.env.MARVEL_API_URL}${charIdSelection}`
    );
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
