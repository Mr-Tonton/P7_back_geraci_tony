import { mongoose } from "mongoose";
import uniqueValidator from "mongoose-unique-validator"; // plugin qui ajoute une validation de pré-enregistrement pour des champs dans un schéma Mongoose.

export class UserModel {
  static setUserSchema() {
    const userSchema = mongoose.Schema(
      {
        email: {
          type: String,
          required: true,
          unique: true,
          validate: {
            validator: function (v) {
              return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,}$/.test(v);
            },
          },
        },
        password: { type: String, required: true },
      },
      {
        timestamps: true,
      }
    );

    userSchema.plugin(uniqueValidator);

    return mongoose.model("User", userSchema);
  }
}
