const express = require("express");
const router = express.Router();
const controller = require("../controllers/Actuator");
const auth = require("../middleware/middleware");

router.use(auth);
router.get("/", controller.getAll);
router.get("/:id", controller.getById);
router.post("/", controller.create);
router.put("/:id", controller.update);
router.delete("/:id", controller.delete);
router.patch('/:id/toggle', controller.toggleStatus);

module.exports = router;