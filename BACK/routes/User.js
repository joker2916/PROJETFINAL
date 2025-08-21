const express = require("express");
const router = express.Router();

const userController = require("../controllers/User");

const authenticate = require("../middleware/middleware");
const authorizeRole = require("../middleware/authorizeRole");

// 🔐 ROUTE ajoutée pour la réinitialisation du mot de passe
router.post("/reset-password", userController.sendResetLink);

// ✅ Routes utilisateurs
router.post("/register", userController.create);
router.get("/", authenticate, userController.getAll);
router.get("/:id", authenticate, userController.getById);
router.put("/:id", authenticate, userController.update);
router.delete("/:id", authenticate, userController.delete);
router.put("/:uid/promote", authenticate, authorizeRole("admin"), userController.promoteToAdmin);

module.exports = router;