// class ValidatePassword {
//   constructor() {
//     this.passwordSchema = require("../models/Password.models");
//     this.ValidatePassword();
//   }

//   ValidatePassword() {
//     module.exports = (req, res, next) => {
//       if (!this.passwordSchema.validate(req.body.password)) {
//         res.status(400).json({
//           message:
//             "Wrong password, min 10 char, min 1 lowerCase, 1 upperCase, 1 number and no space",
//         });
//       } else {
//         next();
//       }
//     };
//   }
// }

// new ValidatePassword();

const passwordSchema = require("../models/Password.models");

module.exports = (req, res, next) => {
  if (!passwordSchema.validate(req.body.password)) {
    res.status(400).json({
      message:
        "Wrong password, min 8 char, min 1 lowerCase, 1 upperCase, 1 number and no space",
    });
  } else {
    next();
  }
};
