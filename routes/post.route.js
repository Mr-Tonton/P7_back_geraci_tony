import express from "express";
import { Multer } from "../middlewares/multerConfig.middleware.js";
import { Auth } from "../middlewares/auth.middleware.js";

import { PostControllers } from "../controllers/post.controller.js";
import { IsAuthorized } from "../middlewares/isAuthorized.middleware.js";

export class PostRoutes {
  static routes() {
    const router = express.Router(); // pour créer un nouvel objet routeur
    router.get("/:skip/:limit", Auth.setAuth, PostControllers.getPosts); // récupérer les posts avec une limite modifiable
    router.post(
      "/",
      Auth.setAuth,
      Multer.setMulter(),
      PostControllers.createPost
    ); //création d'un post par l'utilisateur
    router.put(
      "/:post_id",
      Auth.setAuth,
      IsAuthorized.IsCurrentUser,
      Multer.setMulter(),
      PostControllers.updatePost
    ); // modification d'un post par l'utilisateur
    router.delete(
      "/:post_id",
      Auth.setAuth,
      IsAuthorized.IsAdminOrCurrentUser,
      PostControllers.deletePost
    ); // suppression d'un post par l'utilisateur ou l'admin
    router.post("/:post_id/like", Auth.setAuth, PostControllers.likePost); // like d'un post par l'utilisateur
    return router;
  }
}
