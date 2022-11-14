import express from "express";
import { ValidatePassword } from "../middlewares/validatePassword.middleware.js";
import { Multer } from "../middlewares/multerConfig.middleware.js";
import { Auth } from "../middlewares/auth.middleware.js";

import { UserControllers } from "../controllers/user.controller.js";

export class UserRoutes {
  static routes() {
    const router = express.Router(); // pour créer un nouvel objet routeur
    router.post(
      "/signup",
      ValidatePassword.testPassword,
      UserControllers.signup
    );
    router.post("/login", UserControllers.login); // log de l'utilisateur

    router.get("/:user_id", Auth.setAuth, UserControllers.getUser); // récupérer les infos d'un utilisateur.
    router.put("/name/:user_id", Auth.setAuth, UserControllers.updateName); // modifier le nom d'utilisateur
    router.put(
      "/profile_image/:user_id",
      Auth.setAuth,
      Multer.setMulter(),
      UserControllers.updateProfileImage
    ); // modifier l'image de profil utilisateur
    router.delete("/:user_id", Auth.setAuth, UserControllers.deleteUser); // supprimer un utilisateur, ses posts, comments, likes...

    return router;
  }
}
