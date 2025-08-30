const { Signup, Signin } = require("../Controllers/UserController");
const router = require("express").Router();

router.post("/signup", Signup);
router.post("/signin", Signin);

module.exports = router;