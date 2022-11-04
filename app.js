import express from "express"; //  framework nodeJS, traite les requêtes http (routes), middlewares...
import { mongoose } from "mongoose"; // facilite les interactions avec la BDD
import path from "path"; // donne des outils pour faciliter le travail avec les fichiers et les chemins d'accès.
import * as url from "url";
const __dirname = url.fileURLToPath(new URL(".", import.meta.url));
import helmet from "helmet"; // sécurise l'application express en mettant en place différents headers HTTP
import hpp from "hpp"; // contre les attaques par pollution des paramètres http
import mongoSanitize from "express-mongo-sanitize"; // nettoie les données fournies par l'utilisateur pour empêcher l'injection d'opérateur MongoDB.
import dotenv from "dotenv";
dotenv.config(); // utilisation des variables d'environnement pour sécuriser les accès

import { UserRoutes } from "./routes/user.route.js";
import { PostRoutes } from "./routes/post.route.js";
import { CommentRoutes } from "./routes/comment.route.js";

export class App {
  constructor() {
    dotenv.config();
    this.app = express();
    this.mongooseConnect();
    this.setApp();
  }

  mongooseConnect() {
    mongoose
      .connect(process.env.SECRET_DB, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(() => console.log("Connexion à MongoDB réussie !"))
      .catch(() => console.log("Connexion à MongoDB échouée !"));
  }

  setApp() {
    this.app.use(helmet());
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

    this.app.use(express.json());
    this.app.use(mongoSanitize());
    this.app.use(hpp());

    this.app.use("/images", express.static(path.join(__dirname, "images")));

    this.app.use("/api/auth", UserRoutes.routes());
    this.app.use("/api/posts", PostRoutes.routes());
    this.app.use("/api/posts/:post_id/comments", CommentRoutes.routes());
  }
}
