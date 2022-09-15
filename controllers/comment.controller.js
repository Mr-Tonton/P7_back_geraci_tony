import { CommentModel } from "../models/comment.model.js";
const Comment = CommentModel.setCommentSchema();

export class CommentControllers {
  static createComment() {
    return (req, res, next) => {
      const commentObject = req.body;
      let post = new Comment({
        ...commentObject,
      });
      post
        .save()
        .then(() =>
          res
            .status(201)
            .json({ message: "Commentaire sauvegardé avec succès !" })
        )
        .catch((error) => res.status(400).json({ error: error }));
    };
  }

  static getCommentsOfPost() {
    return (req, res, next) => {
      Comment.find({ postId: req.params.postId })
        .then((posts) => res.status(200).json(posts))
        .catch((error) => res.status(404).json({ error: error }));
    };
  }

  static deleteComment() {
    return (req, res, next) => {
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
}
