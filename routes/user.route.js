const express = require("express");
const router = express.Router(); // pour créer un nouvel objet routeur

const userCtrl = require("../controllers/user.controller");
const validatePassword = require("../middlewares/validatePassword.middlewares");

router.post("/signup", validatePassword, userCtrl.signup);
router.post("/login", userCtrl.login);

module.exports = router;
