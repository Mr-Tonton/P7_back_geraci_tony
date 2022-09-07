import { Password } from "../models/password.model.js";

export class ValidatePassword {
  static testPassword() {
    (req, res, next) => {
      if (!Password.setPasswordSchema().validate(req.body.password)) {
        res.status(400).json({
          message:
            "Wrong password, min 10 char, min 1 lowerCase, 1 upperCase, 1 number and no space",
        });
      } else {
        next();
      }
    };
  }
}
