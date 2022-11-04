import { mongoose } from "mongoose";

export class PostModel {
  static setPostSchema() {
    const postSchema = mongoose.Schema(
      {
        userId: { type: String, required: true },
        postContent: { type: String, required: true },
        imageUrl: { type: String },
        likes: { type: Number, required: true, default: 0 },
        usersLiked: { type: [String], required: true, default: [] },
      },
      {
        timestamps: true,
      }
    );

    return mongoose.models.Post || mongoose.model("Post", postSchema);
  }
}
