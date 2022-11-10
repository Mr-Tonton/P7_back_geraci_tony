import express from "express";
import { Multer } from "../middlewares/multerConfig.middleware.js";
import { Auth } from "../middlewares/auth.middleware.js";
import { IsAdminOrCurrentUser } from "../middlewares/isAdminOrCurrentUser.middleware.js";
import { IsCurrentUser } from "../middlewares/isCurrentUser.middleware.js";

import { PostControllers } from "../controllers/post.controller.js";

export class PostRoutes {
  static routes() {
    const router = express.Router(); // pour créer un nouvel objet routeur
    router.get("/:skip/:limit", Auth.setAuth, PostControllers.getPosts);
    router.post(
      "/",
      Auth.setAuth,
      Multer.setMulter(),
      PostControllers.createPost
    );
    router.put(
      "/:post_id",
      Auth.setAuth,
      IsCurrentUser.setIsCurrentUser,
      Multer.setMulter(),
      PostControllers.updatePost
    );
    router.delete(
      "/:post_id",
      Auth.setAuth,
      IsAdminOrCurrentUser.setIsAdminOrCurrentUser,
      PostControllers.deletePost
    );
    router.post("/:post_id/like", Auth.setAuth, PostControllers.likePost);
    return router;
  }
}
