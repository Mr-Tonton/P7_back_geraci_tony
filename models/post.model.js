import { mongoose } from "mongoose";

export class PostModel {
  static setPostSchema() {
    const postSchema = mongoose.Schema(
      {
        userId: { type: String, required: true },
        postContent: { type: String, required: true },
      },
      {
        timestamps: true,
      }
    );

    return mongoose.model("Post", postSchema);
  }
}
