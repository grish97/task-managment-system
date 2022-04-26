const express = require("express");
const task = require("../controllers/task.js");

const router = express.Router();

router.get("/task", task.read);
router.post("/task", task.create);
router.patch("/task/:id", task.update);
router.delete("/task/:id", task.remove);

module.exports = router;