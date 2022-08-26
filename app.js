class App {
  constructor() {
    this.requires();
    this.app = this.express();
    this.setApp();
    this.mongooseConnect();
    module.exports = this.app;
  }

  requires() {
    this.express = require("express"); //  framework nodeJS, traite les requêtes http (routes), middlewares...
    this.mongoose = require("mongoose"); // facilite les interactions avec la BDD
    this.path = require("path"); // donne des outils pour faciliter le travail avec les fichiers et les chemins d'accès.
    this.helmet = require("helmet"); // sécurise l'application express en mettant en place différents headers HTTP
    this.hpp = require("hpp"); // contre les attaques par pollution des paramètres http
    this.mongoSanitize = require("express-mongo-sanitize"); // nettoie les données fournies par l'utilisateur pour empêcher l'injection d'opérateur MongoDB.
    require("dotenv").config(); // utilisation des variables d'environnement pour sécuriser les accès
  }

  mongooseConnect() {
    this.mongoose
      .connect(process.env.SECRET_DB, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(() => console.log("Connexion à MongoDB réussie !"))
      .catch(() => console.log("Connexion à MongoDB échouée !"));
  }

  setApp() {
    this.app.use(this.helmet());
    this.app.use((req, res, next) => {
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

    this.app.use(this.express.json());
    this.app.use(this.mongoSanitize());
    this.app.use(this.hpp());
  }
}

new App();
