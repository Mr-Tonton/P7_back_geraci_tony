import express from "express";
import { Auth } from "../middlewares/auth.middleware.js";
import { IsAuthorized } from "../middlewares/isAuthorized.middleware.js";
import { Multer } from "../middlewares/multerConfig.middleware.js";

import { CommentControllers } from "../controllers/comment.controller.js";

export class CommentRoutes {
  static routes() {
    const router = express.Router({ mergeParams: true }); // pour créer un nouvel objet routeur
    router.post(
      "/",
      Auth.setAuth,
      Multer.setMulter(),
      CommentControllers.createComment
    ); // creation d'un commentaire par l'utilisateur
    router.get(
      "/:skip/:limit",
      Auth.setAuth,
      CommentControllers.getCommentsOfPost
    ); // récupération des commentaires d'un post
    router.delete(
      "/:comment_id",
      Auth.setAuth,
      IsAuthorized.IsAdminOrCurrentUser,
      CommentControllers.deleteComment
    ); // suppression d'un commentaire par l'utilisateur ou l'admin
    return router;
  }
}
