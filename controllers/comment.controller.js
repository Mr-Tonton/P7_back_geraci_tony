import { CommentModel } from "../models/comment.model.js";
const Comment = CommentModel.setCommentSchema();

export class CommentControllers {
  static getCommentsOfPost = (req, res, next) => {
    let commentCollectionLength;
    Comment.find({ postId: req.params.post_id })
      .then((res) => {
        commentCollectionLength = res.length;
      })
      .then(() => {
        Comment.find({ postId: req.params.post_id })
          .sort({ createdAt: -1 })
          .skip(req.params.skip)
          .limit(req.params.limit)
          .then((comments) => {
            res.status(200).json({
              comments: comments,
              commentCollectionLength: commentCollectionLength,
            });
          });
      })
      .catch((error) => res.status(404).json({ error: error }));
  };

  static createComment = (req, res, next) => {
    const commentObject = JSON.parse(req.body.comment);
    let comment = new Comment({
      ...commentObject,
      postId: req.params.post_id,
    });
    comment
      .save()
      .then(() =>
        res
          .status(201)
          .json({ message: "Commentaire sauvegardé avec succès !" })
      )
      .catch((error) => res.status(400).json({ error: error }));
  };

  static deleteComment = (req, res, next) => {
    Comment.findOne({ _id: req.params.comment_id })
      .then((comment) => {
        Comment.deleteOne({ _id: comment._id })
          .then(() => {
            res.status(200).json({ message: "Commentaire supprimé !" });
          })
          .catch((error) => res.status(400).json({ message: error }));
      })
      .catch((error) => res.status(400).json({ message: error }));
  };
}
