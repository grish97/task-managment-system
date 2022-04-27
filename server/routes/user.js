const express = require("express");
const user = require("../controllers/user.js");
const verify = require("./authVerify.js");

const router = express.Router();

router.get("/", verify, user.read);

module.exports = router;