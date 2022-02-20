const express = require("express");
const SHA256 = require("crypto-js/sha256");
const encBase64 = require("crypto-js/enc-base64");
const uid2 = require("uid2");
const router = express.Router();

const User = require("../Models/User");

// Route pour SignUp, Route en POST : req.fields
router.post("/user/signup", async (req, res) => {
  try {
    const password = req.fields.password;
    // On crée les salt, hash et token
    const salt = uid2(16);
    const hash = SHA256(password + salt).toString(encBase64);
    const token = uid2(16);
    // On cherche si l'email renseigné par l'utilisateur existe
    const emailUser = await User.findOne({ email: req.fields.email });
    // Si l'email renseigné n'existe pas
    if (!emailUser) {
      // On vérifie qu'il y a bien un username de renseigné par le User
      if (req.fields.username) {
        // Si username renseigné, on crée le newUser
        const newUser = new User({
          email: req.fields.email,
          account: {
            username: req.fields.username,
          },
          token: token,
          hash: hash,
          salt: salt,
        });
        // On enregistre le newUser
        await newUser.save();
        // On renvoie le newUser créé
        res.status(200).json(newUser);
      } else {
        // S'il n'y pas de username renseigné, on renvoie un message d'erreur
        res.status(400).json({ error: { message: "Username required" } });
      }
    } else {
      // Si l'email existe déjà dans la BDD, on renvoie un message d'erreur
      res
        .status(400)
        .json({ error: { message: "Email already exists, please Sign In" } });
    }
  } catch (error) {
    res.status(400).json({ message: { error: "Impossible to Sign Up" } });
  }
});

// Route pour SignIn
router.post("/user/signin", async (req, res) => {
  try {
    const userDemanded = await User.findOne({ email: req.fields.email });
    const salt = userDemanded.salt;
    const password = req.fields.password;
    const hash = SHA256(password + salt).toString(encBase64);
    if (hash === userDemanded.hash) {
      res
        .status(200)
        .json({ message: "Successfully connected", token: userDemanded.token });
    } else {
      res.status(401).json({ error: { message: "Unauthorized" } });
    }
  } catch (error) {
    res.status(400).json({ error: { message: "Impossible to connect" } });
  }
});

module.exports = router;
