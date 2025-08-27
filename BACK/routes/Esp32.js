const express = require("express");
const router = express.Router();
const controller = require("../controllers/Esp32");

// Route POST (l’ESP32 enverra ses mesures ici)
router.post("/data", controller.receiveData);

// Route GET (pour tester dans le navigateur)
router.get("/data", (req, res) => {
  res.json({ message: "✅ Endpoint ESP32 OK. Envoie tes données en POST." });
});

module.exports = router;