import express from "express";
const router = express.Router(); // pour créer un nouvel objet routeur
import { ValidatePassword } from "../middlewares/validatePassword.middleware.js";
import { UserControllers } from "../controllers/user.controller.js";

export class UserRoutes {
  static routes() {
    router.post(
      "/signup",
      ValidatePassword.testPassword(),
      UserControllers.signup()
    );
    router.post("/login", UserControllers.login());
  }
}
