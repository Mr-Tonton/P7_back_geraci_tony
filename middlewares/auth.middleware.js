import jwt from "jsonwebtoken"; // méthode standard pour l’échange de données sécurisées via un système de token.
import dotenv from "dotenv";
dotenv.config(); // utilisation des variables d'environnement pour sécuriser les accès

export class Auth {
  static setAuth = (req, res, next) => {
    try {
      const token = req.headers.authorization.split(" ")[1];
      const decodedToken = jwt.verify(token, process.env.SECRET_TOKEN);
      const userId = decodedToken.userId;
      if (req.body.userId && req.body.userId !== userId) {
        throw "ID utilisateur incorrect";
      } else {
        next();
      }
    } catch (error) {
      res.status(401).json({
        error: new Error("requête invalide"),
      });
    }
  };
}
