import { CommentModel } from "../models/comment.model.js";
const Comment = CommentModel.setCommentSchema();

export class CommentControllers {
  static getCommentsOfPost = (req, res, next) => {
    Comment.find({ postId: req.params.post_id })
      .then((comments) => res.status(200).json(comments))
      .catch((error) => res.status(404).json({ error: error }));
  };

  static createComment = (req, res, next) => {
    console.log(req);
    const commentObject = JSON.parse(req.body.comment);
    let comment = new Comment({
      ...commentObject,
      postId: req.params.post_id,
    });
    console.log(comment);
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
    Comment.findOne({ _id: req.params.id })
      .then(() => {
        Comment.deleteOne({ _id: req.params.id })
          .then(() =>
            res.status(200).json({ message: "Commentaire supprimé !" })
          )
          .catch((error) => res.status(400).json({ message: error }));
      })
      .catch((error) => res.status(500).json({ message: error }));
  };
}
