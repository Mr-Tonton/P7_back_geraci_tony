// class UserControllers {
//   constructor() {
//     this.requires();
//   }

//   requires() {
//     this.User = require("../models/User.models");
//     this.bcrypt = require("bcrypt"); // bibliothèque aidant à hacher les mots de passe
//     this.jwt = require("jsonwebtoken");
//     require("dotenv").config();
//   }

//   signup() {
//     (req, res, next) => {
//       this.bcrypt
//         .hash(req.body.password, 10)
//         .then((hash) => {
//           const user = new User({
//             email: req.body.email,
//             password: hash,
//           });
//           user
//             .save()
//             .then(() => res.status(201).json({ message: "Utilisateur crée !" }))
//             .catch((error) => res.status(400).json({ error }));
//         })
//         .catch((error) => res.status(500).json({ error }));
//     };
//   }

//   login() {
//     (req, res, next) => {
//       User.findOne({ email: req.body.email })
//         .then((user) => {
//           if (!user) {
//             return res
//               .status(401)
//               .json({ error: "Paire identifiant / Mot de passe incorrecte !" });
//           }
//           this.bcrypt
//             .compare(req.body.password, user.password)
//             .then((valid) => {
//               if (!valid) {
//                 return res.status(401).json({
//                   error: "Paire identifiant / Mot de passe incorrecte !",
//                 });
//               }
//               res.status(200).json({
//                 userId: user._id,
//                 token: jwt.sign(
//                   { userId: user._id },
//                   process.env.SECRET_TOKEN,
//                   { expiresIn: "24h" }
//                 ),
//               });
//             })
//             .catch((error) => res.status(500).json({ error }));
//         })
//         .catch((error) => res.status(500).json({ error }));
//     };
//   }
// }

// new UserControllers();

const User = require("../models/User.models");
const bcrypt = require("bcrypt"); // bibliothèque aidant à hacher les mots de passe
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.signup = (req, res, next) => {
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
      const user = new User({
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

exports.login = (req, res, next) => {
  User.findOne({ email: req.body.email })
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
            return res
              .status(401)
              .json({ error: "Paire identifiant / Mot de passe incorrecte !" });
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