import express from "express";
import { ValidatePassword } from "../middlewares/validatePassword.middleware.js";
import { UserControllers } from "../controllers/user.controller.js";

export class UserRoutes {
  static routes() {
    const router = express.Router(); // pour créer un nouvel objet routeur
    router.post(
      "/signup",
      ValidatePassword.testPassword,
      UserControllers.signup
    );
    router.post("/login", UserControllers.login);
    router.get("/:user_id", UserControllers.getUser);

    return router;
  }
}
