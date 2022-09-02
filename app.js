// class App {
//   constructor() {
//     this.requires();
//     this.app = this.express();
//     this.mongooseConnect();
//     this.setApp();
//   }

//   requires() {
//     this.express = require("express"); //  framework nodeJS, traite les requêtes http (routes), middlewares...
//     this.mongoose = require("mongoose"); // facilite les interactions avec la BDD
//     this.path = require("path"); // donne des outils pour faciliter le travail avec les fichiers et les chemins d'accès.
//     this.helmet = require("helmet"); // sécurise l'application express en mettant en place différents headers HTTP
//     this.hpp = require("hpp"); // contre les attaques par pollution des paramètres http
//     this.mongoSanitize = require("express-mongo-sanitize"); // nettoie les données fournies par l'utilisateur pour empêcher l'injection d'opérateur MongoDB.
//     require("dotenv").config(); // utilisation des variables d'environnement pour sécuriser les accès

//     this.userRoutes = require("./routes/User.routes");
//   }

//   mongooseConnect() {
//     this.mongoose
//       .connect(process.env.SECRET_DB, {
//         useNewUrlParser: true,
//         useUnifiedTopology: true,
//       })
//       .then(() => console.log("Connexion à MongoDB réussie !"))
//       .catch(() => console.log("Connexion à MongoDB échouée !"));
//   }

//   setApp() {
//     this.app.use(this.helmet());
//     this.app.use((req, res, next) => {
//       res.setHeader("Access-Control-Allow-Origin", "*");
//       res.setHeader(
//         "Access-Control-Allow-Headers",
//         "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
//       );
//       res.setHeader(
//         "Access-Control-Allow-Methods",
//         "GET, POST, PUT, DELETE, PATCH, OPTIONS"
//       );
//       res.setHeader("Cross-Origin-Resource-Policy", "same-site");
//       next();
//     });

//     this.app.use(this.express.json());
//     this.app.use(this.mongoSanitize());
//     this.app.use(this.hpp());

//     this.app.use(
//       "/images",
//       this.express.static(this.path.join(__dirname, "images"))
//     );

//     this.app.use("/api/auth", this.userRoutes);
//     module.exports = this.app;
//   }
// }

// import express from "express"; //  framework nodeJS, traite les requêtes http (routes), middlewares...
// import mongoose from "mongoose"; // facilite les interactions avec la BDD
// import path from "path"; // donne des outils pour faciliter le travail avec les fichiers et les chemins d'accès.
// import helmet from "helmet"; // sécurise l'application express en mettant en place différents headers HTTP
// import hpp from "hpp"; // contre les attaques par pollution des paramètres http
// import mongoSanitize from "express-mongo-sanitize"; // nettoie les données fournies par l'utilisateur pour empêcher l'injection d'opérateur MongoDB.
// import dotenv from "dotenv";
// dotenv.config(); // utilisation des variables d'environnement pour sécuriser les accès

// // this.userRoutes = require("./routes/User.routes");

// export class App {
//   constructor() {
//     dotenv.config();
//     this.app = express();
//     this.mongooseConnect();
//     this.setApp();
//   }

//   mongooseConnect() {
//     mongoose
//       .connect(process.env.SECRET_DB, {
//         useNewUrlParser: true,
//         useUnifiedTopology: true,
//       })
//       .then(() => console.log("Connexion à MongoDB réussie !"))
//       .catch(() => console.log("Connexion à MongoDB échouée !"));
//   }

//   setApp() {
//     this.app.use(helmet());
//     this.app.use((req, res, next) => {
//       res.setHeader("Access-Control-Allow-Origin", "*");
//       res.setHeader(
//         "Access-Control-Allow-Headers",
//         "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
//       );
//       res.setHeader(
//         "Access-Control-Allow-Methods",
//         "GET, POST, PUT, DELETE, PATCH, OPTIONS"
//       );
//       res.setHeader("Cross-Origin-Resource-Policy", "same-site");
//       next();
//     });

//     this.app.use(express.json());
//     this.app.use(mongoSanitize());
//     this.app.use(hpp());

//     // this.app.use("/images", express.static(path.join(__dirname, "images")));

//     // this.app.use("/api/auth", this.userRoutes);
//   }
// }

// REQUIRES
const express = require("express"); //  framework nodeJS, traite les requêtes http (routes), middlewares...
const mongoose = require("mongoose"); // facilite les interactions avec la BDD
const path = require("path"); // donne des outils pour faciliter le travail avec les fichiers et les chemins d'accès.
const helmet = require("helmet"); // sécurise l'application express en mettant en place différents headers HTTP
const hpp = require("hpp"); // contre les attaques par pollution des paramètres http
const mongoSanitize = require("express-mongo-sanitize"); // nettoie les données fournies par l'utilisateur pour empêcher l'injection d'opérateur MongoDB.
require("dotenv").config(); // utilisation des variables d'environnement pour sécuriser les accès

const userRoutes = require("./routes/User.routes");

mongoose
  .connect(process.env.SECRET_DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.log("Connexion à MongoDB échouée !"));

const app = express();

app.use(helmet());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  res.setHeader("Cross-Origin-Resource-Policy", "same-site");
  next();
});

app.use(express.json());

app.use(mongoSanitize());
app.use(hpp());

app.use("/images", express.static(path.join(__dirname, "images")));
app.use("/api/auth", userRoutes);

module.exports = app;
