const express = require("express");
const user = require("../controllers/user.js");
const { verifyJWT } = require("./authVerify.js");

const router = express.Router();

router.get("/", verifyJWT, user.read);

module.exports = router;