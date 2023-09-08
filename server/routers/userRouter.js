const router = require("express").Router();
const { UserController } = require("../controllers");
const { upload } = require("../middlewares");

router.post("/login", UserController.login);
router.post("/register", UserController.register);
router.post('/googleLogin', UserController.googleLogin)

module.exports = router;
