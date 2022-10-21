import express from "express";
import { ValidatePassword } from "../middlewares/validatePassword.middleware.js";
import { UserControllers } from "../controllers/user.controller.js";
import { Multer } from "../middlewares/multerConfig.middleware.js";
import { Auth } from "../middlewares/auth.middleware.js";

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
    router.get("/token/:user_token", UserControllers.verifyToken);
    router.put("/name/:user_id", UserControllers.updateName);
    router.put(
      "/profile_image/:user_id",
      Auth.setAuth,
      Multer.setMulter(),
      UserControllers.updateProfileImage
    );
    router.delete("/:user_id", Auth.setAuth, UserControllers.deleteUser);

    return router;
  }
}
