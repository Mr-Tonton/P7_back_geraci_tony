import express from "express";
import { Auth } from "../middlewares/auth.middleware.js";

import { CommentControllers } from "../controllers/comment.controller.js";

export class CommentRoutes {
  static routes() {
    const router = express.Router({ mergeParams: true }); // pour créer un nouvel objet routeur
    router.post("/", Auth.setAuth, CommentControllers.createComment);
    router.get("/", Auth.setAuth, CommentControllers.getCommentsOfPost);
    router.delete(
      "/:comment_id",
      Auth.setAuth,
      CommentControllers.deleteComment
    );
    return router;
  }
}
