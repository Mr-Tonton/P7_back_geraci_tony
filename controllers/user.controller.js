import { UserModel } from "../models/user.model.js";
import bcrypt from "bcrypt"; // bibliothèque aidant à hacher les mots de passe
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config(); // utilisation des variables d'environnement pour sécuriser les accès

export class UserControllers {
  static signup() {
    (req, res, next) => {
      bcrypt
        .hash(req.body.password, 10)
        .then((hash) => {
          const user = new UserModel.setUserSchema()({
            email: req.body.email,
            password: hash,
          });
          user
            .save()
            .then(() => res.status(201).json({ message: "Utilisateur crée !" }))
            .catch((error) => res.status(400).json({ error }));
        })
        .catch((error) => res.status(500).json({ error }));
    };
  }

  static login() {
    (req, res, next) => {
      UserModel.setUserSchema()
        .findOne({ email: req.body.email })
        .then((user) => {
          if (!user) {
            return res
              .status(401)
              .json({ error: "Paire identifiant / Mot de passe incorrecte !" });
          }
          bcrypt
            .compare(req.body.password, user.password)
            .then((valid) => {
              if (!valid) {
                return res.status(401).json({
                  error: "Paire identifiant / Mot de passe incorrecte !",
                });
              }
              res.status(200).json({
                userId: user._id,
                token: jwt.sign(
                  { userId: user._id },
                  process.env.SECRET_TOKEN,
                  { expiresIn: "24h" }
                ),
              });
            })
            .catch((error) => res.status(500).json({ error }));
        })
        .catch((error) => res.status(500).json({ error }));
    };
  }
}
