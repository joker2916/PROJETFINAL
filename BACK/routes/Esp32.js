// routes/Esp32.js
const express = require("express");
const router = express.Router();
const controller = require("../controllers/Esp32");
const auth = require("../middleware/middleware");

/* router.use(auth); */
router.get("/data", controller.fetchData);
router.patch("/toggle-led", controller.toggleLed);


module.exports = router;
