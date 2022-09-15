import { mongoose } from "mongoose";

export class CommentModel {
  static setCommentSchema() {
    const commentSchema = mongoose.Schema(
      {
        userId: { type: String, required: true },
        commentContent: { type: String, required: true },
        postId: { type: String, required: true },
      },
      {
        timestamps: true,
      }
    );

    return mongoose.model("Comment", commentSchema);
  }
}
