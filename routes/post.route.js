import express from "express";
const router = express.Router(); // pour créer un nouvel objet routeur
import { Multer } from "../middlewares/multerConfig.middleware.js";
import { Auth } from "../middlewares/auth.middleware.js";

import { PostControllers } from "../controllers/post.controller.js";

export class PostRoutes {
  static routes() {
    router.get("/", Auth.setAuth(), PostControllers.getAllPosts());
    router.get("/:id", Auth.setAuth(), PostControllers.getOnePost());
    router.post(
      "/",
      Auth.setAuth(),
      Multer.setMulter(),
      PostControllers.createPost()
    );
    router.put(
      "/:id",
      Auth.setAuth(),
      Multer.setMulter(),
      PostControllers.updatePost()
    );
    router.delete("/:id", Auth.setAuth(), PostControllers.deletePost());
  }
}
