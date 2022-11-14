import bcrypt from "bcrypt"; // bibliothèque aidant à hacher les mots de passe
import jwt from "jsonwebtoken";
import fs from "fs";
import dotenv from "dotenv";
dotenv.config(); // utilisation des variables d'environnement pour sécuriser les accès

import { UserModel } from "../models/user.model.js";
import { PostModel } from "../models/post.model.js";
import { CommentModel } from "../models/comment.model.js";
const User = UserModel.setUserSchema();
const Post = PostModel.setPostSchema();
const Comment = CommentModel.setCommentSchema();

export class UserControllers {
  static signup = (req, res, next) => {
    bcrypt
      .hash(req.body.password, 10)
      .then((hash) => {
        const user = new User({
          email: req.body.email,
          password: hash,
          name: req.body.name,
          imageUrl:
            "http://localhost:3000/images/profilePictures/basic_profile.png",
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

  static updateName = (req, res, next) => {
    User.findOneAndUpdate(
      { _id: req.params.user_id },
      {
        $set: {
          name: req.body.name,
        },
      },
      {
        new: true,
      }
    )
      .then((updatedUser) => {
        res.status(200).json(updatedUser.name);
      })
      .catch((error) => res.status(400).json({ error: error }));
  };

  static updateProfileImage = (req, res, next) => {
    User.findOne({ _id: req.params.user_id }).then((user) => {
      const filename = user.imageUrl.split("/images/profilePictures/")[1];
      if (filename !== "basic_profile.png") {
        fs.unlink(`images/profilePictures/${filename}`, (err) => {
          if (err) {
            console.log(err);
          } else {
            console.log(
              `fichier effacé du dossier ./images/profilePictures: ${filename}`
            );
          }
        });
      }
      User.findOneAndUpdate(
        { _id: req.params.user_id },
        {
          $set: {
            imageUrl: `${req.protocol}://${req.get(
              "host"
            )}/images/profilePictures/${req.file.filename}`,
          },
        },
        {
          new: true,
        }
      )
        .then((data) => {
          return res.status(200).json(data.imageUrl);
        })
        .catch((err) => {
          console.log(err);
          return res.status(400).json({ err });
        });
    });
  };

  static deleteUser = (req, res, next) => {
    User.findOne({ _id: req.params.user_id }).then((user) => {
      const filename = user.imageUrl.split("/images/profilePictures/")[1];
      let userInfo = user;
      if (filename !== "basic_profile.png") {
        fs.unlink(`images/profilePictures/${filename}`, (err) => {
          if (err) {
            console.log(err);
          } else {
            console.log(
              `fichier effacé depuis ./images/profilePictures: ${filename}`
            );
          }
        });
      }
      User.deleteOne({ _id: req.params.user_id })
        .then(() => {
          Comment.deleteMany({ userId: req.params.user_id }).then(() => {
            Post.find({ userId: req.params.user_id }).then((posts) => {
              for (let post of posts) {
                if (post.imageUrl) {
                  const filename = post.imageUrl.split(
                    "/images/postPictures/"
                  )[1];
                  fs.unlink(`images/postPictures/${filename}`, (err) => {
                    if (err) {
                      console.log(err);
                    } else {
                      console.log(
                        `fichier effacé depuis ./images/postPictures: ${filename}`
                      );
                    }
                  });
                }
              }
            });
            Post.deleteMany({ userId: req.params.user_id }).then(() => {
              Post.updateMany(
                { usersLiked: req.params.user_id },
                {
                  $pull: { usersLiked: req.params.userId },
                  $inc: { likes: -1 },
                }
              ).then(() => {
                res.status(200).json({
                  message: `Utilisateur ${userInfo.name} ( id: ${userInfo._id}) a été supprimé avec succès !`,
                });
              });
            });
          });
        })
        .catch((error) => {
          res.status(400).json({ message: error });
        });
    });
  };
}
