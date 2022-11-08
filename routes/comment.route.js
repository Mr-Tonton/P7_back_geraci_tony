import express from "express";
import { Auth } from "../middlewares/auth.middleware.js";
import { IsAdminOrCurrentUser } from "../middlewares/isAdminOrCurrentUser.middleware.js";
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
    );
    router.get(
      "/:skip/:limit",
      Auth.setAuth,
      CommentControllers.getCommentsOfPost
    );
    router.delete(
      "/:comment_id",
      Auth.setAuth,
      IsAdminOrCurrentUser.setIsAdminOrCurrentUser,
      CommentControllers.deleteComment
    );
    return router;
  }
}
