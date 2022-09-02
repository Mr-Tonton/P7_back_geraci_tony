// class UserRoutes {
//   constructor() {
//     this.requires();
//     this.routes();
//     module.exports = this.router;
//   }

//   requires() {
//     this.express = require("express");
//     this.router = this.express.Router(); // pour créer un nouvel objet routeur
//     this.validatePassword = require("../middlewares/Validate-password");
//     this.userCtrl = require("../controllers/User.controllers");
//   }

//   routes() {
//     this.router.post("/signup", this.validatePassword, this.userCtrl.signup);
//     this.router.post("/login", this.userCtrl.login);
//   }
// }
// new UserRoutes();

const express = require("express");
const router = express.Router(); // pour créer un nouvel objet routeur

const userCtrl = require("../controllers/User.controllers");
const validatePassword = require("../middlewares/Validate-password");

router.post("/signup", validatePassword, userCtrl.signup);
router.post("/login", userCtrl.login);

module.exports = router;
