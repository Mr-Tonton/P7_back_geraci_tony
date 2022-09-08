import passwordValidator from "password-validator"; // Valide le mot de passe selon des spécifications flexibles

export class PasswordModel {
  static setPasswordSchema() {
    const passwordSchema = new passwordValidator();

    passwordSchema
      .is()
      .min(8)
      .is()
      .max(64)
      .has()
      .uppercase()
      .has()
      .lowercase()
      .has()
      .digits()
      .has()
      .not()
      .spaces();
    return passwordSchema;
  }
}
