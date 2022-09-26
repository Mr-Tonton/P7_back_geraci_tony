import { UserModel } from "../models/user.model.js";
const User = UserModel.setUserSchema();
import bcrypt from "bcrypt"; // bibliothèque aidant à hacher les mots de passe
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config(); // utilisation des variables d'environnement pour sécuriser les accès

export class UserControllers {
  static signup = (req, res, next) => {
    bcrypt
      .hash(req.body.password, 10)
      .then((hash) => {
        const user = new User({
          email: req.body.email,
          password: hash,
          name: req.body.name,
          imageUrl: "http://localhost:3000/images/basic_profil.png",
          accountType: "user",
        });
        user
          .save()
          .then(() => res.status(201).json({ message: "Utilisateur créé !" }))
          .catch((error) => res.status(400).json({ error }));
      })
      .catch((error) => res.status(500).json({ error }));
  };

  static login = (req, res, next) => {
    User.findOne({ email: req.body.email })
      .then((user) => {
        if (!user) {
          return res
            .status(401)
            .json({ error: "Identifiant ou mot de passe incorrect !" });
        }
        bcrypt
          .compare(req.body.password, user.password)
          .then((valid) => {
            if (!valid) {
              return res.status(401).json({
                error: "Identifiant ou mot de passe incorrect !",
              });
            }
            res.status(200).json({
              userId: user._id,
              token: jwt.sign({ userId: user._id }, process.env.SECRET_TOKEN, {
                expiresIn: "24h",
              }),
            });
          })
          .catch((error) => res.status(500).json({ error }));
      })
      .catch((error) => res.status(500).json({ error }));
  };

  static getUser = (req, res, next) => {
    User.findOne({ _id: req.params.user_id })
      .then((user) =>
        res.status(200).json({
          userId: user._id,
          email: user.email,
          name: user.name,
          imageUrl: user.imageUrl,
          accountType: user.accountType,
        })
      )
      .catch((error) => res.status(404).json({ error: error }));
  };
}
