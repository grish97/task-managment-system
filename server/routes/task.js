const express = require("express");
const task = require("../controllers/task.js");
const { verifyJWT } = require("./authVerify.js");

const router = express.Router();

router.get("/", verifyJWT, task.read);
router.post("/", verifyJWT, task.create);
router.put("/:id", verifyJWT, task.update);
router.delete("/:id", verifyJWT, task.remove);

module.exports = router;
