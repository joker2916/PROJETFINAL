// authorizeRole.js (middleware)
const admin = require("../config/firebase").admin;

// Middleware pour vérifier les rôles
const authorizeRole = (requiredRole) => {
  return async (req, res, next) => {
    try {
      const token = req.headers.authorization?.split(" ")[1];
      if (!token) return res.status(403).json({ error: "Accès refusé" });

      const decodedToken = await admin.auth().verifyIdToken(token);
      const user = await admin.auth().getUser(decodedToken.uid);

      if (user.customClaims?.role !== requiredRole) {
        return res.status(403).json({ error: "Accès refusé : rôle insuffisant" });
      }

      next();
    } catch (err) {
      res.status(403).json({ error: "Accès refusé : problème d'autorisation" });
    }
  };
};

module.exports = authorizeRole;
