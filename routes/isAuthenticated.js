const User = require("../Models/User");

// Fonction authentification par token
const isAuthenticated = async (req, res, next) => {
  const isTokenValid = await User.findOne({
    token: req.headers.authorization.replace("Bearer ", ""),
  });
  console.log("token ===>", isTokenValid);
  if (isTokenValid) {
    req.user = isTokenValid;
    next();
  } else {
    res.status(401).json({ error: "Unauthorized" });
  }
};

export default isAuthenticated;
