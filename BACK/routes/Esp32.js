const express = require("express");
const router = express.Router();
const controller = require("../controllers/Esp32");

// Variable pour stocker la dernière donnée reçue
let lastSensorData = null;

// Route POST (l’ESP32 enverra ses mesures ici)
router.post("/data", (req, res) => {
  lastSensorData = req.body;
  controller.receiveData(req, res);
});

// Route GET (pour tester dans le navigateur)
router.get("/data", (req, res) => {
  if (lastSensorData) {
    res.json(lastSensorData); // Renvoie la dernière donnée reçue
  } else {
    res.json({ message: "Aucune donnée reçue pour le moment." });
  }
});

module.exports = router;