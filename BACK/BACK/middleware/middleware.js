// middleware/middleware.js
const admin = require("../config/firebase").admin;

const authenticate = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(403).json({ error: "Accès refusé : token manquant" });

    const decodedToken = await admin.auth().verifyIdToken(token);
    req.user = decodedToken;
    next();
  } catch (err) {
    res.status(403).json({ error: "Accès refusé : problème de token" });
  }
};

module.exports = authenticate;
