// routes/Esp32.js
const express = require("express");
const router = express.Router();
const controller = require("../controllers/Esp32");

// Route pour que l'ESP32 envoie ses mesures
router.post("/data", controller.receiveData);

module.exports = router;
