import jwt from "jsonwebtoken"; // méthode standard pour l’échange de données sécurisées via un système de token.
import dotenv from "dotenv";
dotenv.config(); // utilisation des variables d'environnement pour sécuriser les accès
import { UserModel } from "../models/user.model.js";
const User = UserModel.setUserSchema();
import { PostModel } from "../models/post.model.js";
const Post = PostModel.setPostSchema();

export class IsCurrentUser {
  static setIsCurrentUser = (req, res, next) => {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.SECRET_TOKEN);
    const userId = decodedToken.userId;
    Post.findOne({ _id: req.params.post_id }).then((post) => {
      const posterId = post.userId;
      try {
        if (posterId !== userId) {
          throw "L'utilisateur n'a pas les droits requis";
        } else {
          next();
        }
      } catch {
        res
          .status(401)
          .json({ error: "L'utilisateur n'a pas les droits requis" });
      }
    });
  };
}
