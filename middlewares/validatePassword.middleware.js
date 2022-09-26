import { PasswordModel } from "../models/password.model.js";

export class ValidatePassword {
  static testPassword = (req, res, next) => {
    if (!PasswordModel.setPasswordSchema().validate(req.body.password)) {
      res.status(400).json({
        message:
          "Mot de passe incorrect: min 8 caractères, 1 majuscule, 1 minuscule, 1 chiffre, max 64 caractères et pas d'espaces",
      });
    } else {
      next();
    }
  };
}
