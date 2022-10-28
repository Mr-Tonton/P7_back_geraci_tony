import express from "express";
import { Multer } from "../middlewares/multerConfig.middleware.js";
import { Auth } from "../middlewares/auth.middleware.js";

import { PostControllers } from "../controllers/post.controller.js";

export class PostRoutes {
  static routes() {
    const router = express.Router(); // pour créer un nouvel objet routeur
    router.get("/:skip/:limit", Auth.setAuth, PostControllers.getFewPosts);
    router.get("/:post_id", Auth.setAuth, PostControllers.getOnePost);
    router.post(
      "/",
      Auth.setAuth,
      Multer.setMulter(),
      PostControllers.createPost
    );
    router.put(
      "/:post_id",
      Auth.setAuth,
      Multer.setMulter(),
      PostControllers.updatePost
    );
    router.delete("/:post_id", Auth.setAuth, PostControllers.deletePost);
    router.delete(
      "/user_posts/:user_id",
      Auth.setAuth,
      PostControllers.deleteAllUserPost
    );
    return router;
  }
}
