const express = require("express");
const { signup } = require("../controllers/authController");

const router = express.Router();

router.post("/signup", signup);
// route login inutile côté back sauf pour vérif de token

module.exports = router;
