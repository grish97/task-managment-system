const router = require("express").Router();
const auth = require("../controllers/auth");

router.post("/register", auth.register);
router.post("/signin", auth.login);


module.exports = router;