const express = require("express");
const task = require("../controllers/task.js");

const router = express.Router();

router.get("/", task.read);
router.post("/", task.create);
router.patch("/:id", task.update);
router.delete("/:id", task.remove);

module.exports = router;
