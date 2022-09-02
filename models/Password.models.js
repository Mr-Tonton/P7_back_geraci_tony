// class Password {
//   constructor() {
//     this.passwordValidator = require("password-validator"); // Valide le mot de passe selon des spécifications flexibles
//     this.setPasswordSchema();
//   }

//   setPasswordSchema() {
//     const passwordSchema = new this.passwordValidator();

//     passwordSchema
//       .is()
//       .min(8)
//       .is()
//       .max(64)
//       .has()
//       .uppercase()
//       .has()
//       .lowercase()
//       .has()
//       .digits()
//       .has()
//       .not()
//       .spaces();

//     module.exports = passwordSchema;
//   }
// }

// new Password();

const passwordValidator = require("password-validator"); // Valide le mot de passe selon des spécifications flexibles

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

module.exports = passwordSchema;
