const passwordSchema = require("../models/password.model");

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
