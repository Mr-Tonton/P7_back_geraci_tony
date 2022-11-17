import fs from "fs";

import { PostModel } from "../models/post.model.js";
import { CommentModel } from "../models/comment.model.js";
const Post = PostModel.setPostSchema();
const Comment = CommentModel.setCommentSchema();

export class PostControllers {
  static getPosts = (req, res, next) => {
    let postCollectionLength;
    Post.find()
      .then((res) => {
        postCollectionLength = res.length;
      })
      .then(() => {
        Post.find()
          .sort({ createdAt: -1 })
          .skip(req.params.skip)
          .limit(req.params.limit)
          .then((posts) =>
            res.status(200).json({
              posts: posts,
              postCollectionLength: postCollectionLength,
            })
          );
      })
      .catch((error) => res.status(404).json({ error: error }));
  };

  static createPost = (req, res, next) => {
    const postObject = JSON.parse(req.body.post);
    let post;
    if (req.file) {
      post = new Post({
        ...postObject,
        imageUrl: `${req.protocol}://${req.get("host")}/images/postPictures/${
          req.file.filename
        }`,
      });
    } else {
      post = new Post({
        ...postObject,
      });
    }
    post
      .save()
      .then((result) =>
        res.status(201).json({ message: "Post sauvegardé avec succès !" })
      )
      .catch((error) => res.status(400).json({ error: error }));
  };

  static updatePost = (req, res, next) => {
    let postObject = { ...JSON.parse(req.body.updatePost) };
    console.log(postObject);
    Post.findOne({ _id: req.params.post_id }).then((post) => {
      if ((req.file && post.imageUrl) || postObject.deletedImage) {
        const filename = post.imageUrl.split("/images/postPictures/")[1];
        fs.unlink(`images/postPictures/${filename}`, (err) => {
          if (err) {
            console.log(err);
          } else {
            console.log(
              `fichier effacé depuis ./images/postPictures: ${filename}`
            );
          }
        });
      }
      if (req.file) {
        delete postObject.deletedImage;
        postObject = {
          ...JSON.parse(req.body.updatePost),
          imageUrl: `${req.protocol}://${req.get("host")}/images/postPictures/${
            req.file.filename
          }`,
        };
        console.log(postObject);
      }

      if (postObject.deletedImage) {
        delete postObject.deletedImage;
        console.log(postObject);

        Post.updateOne({ _id: req.params.post_id }, { ...postObject })
          .then(() =>
            Post.updateOne(
              { _id: req.params.post_id },
              { $unset: { imageUrl: "" } }
            ).then(() => {
              res.status(200).json({ message: "Post modifié avec succès!" });
            })
          )
          .catch((error) => res.status(400).json({ error }));
      } else {
        Post.updateOne({ _id: req.params.post_id }, { ...postObject })
          .then(() =>
            res.status(200).json({ message: "Post modifié avec succès!" })
          )
          .catch((error) => res.status(400).json({ error }));
      }
    });
  };

  static deletePost = (req, res, next) => {
    Post.findOne({ _id: req.params.post_id })
      .then((post) => {
        if (post.imageUrl) {
          const filename = post.imageUrl.split("/images/postPictures/")[1];
          fs.unlink(`images/postPictures/${filename}`, (err) => {
            if (err) {
              console.log(err);
            } else {
              console.log(
                `fichier effacé depuis ./images/postPictures: ${filename}`
              );
            }
          });
        }
        Comment.deleteMany({ postId: req.params.post_id }).then(() => {
          Post.deleteOne({ _id: req.params.post_id })
            .then(() =>
              res.status(200).json({ message: "Post supprimé avec succès !" })
            )
            .catch((error) => res.status(400).json({ message: error }));
        });
      })
      .catch((error) => res.status(500).json({ message: error }));
  };

  static likePost = (req, res, next) => {
    let like = req.body.like;
    let userId = req.body.userId;
    let postId = req.params.post_id;
    switch (like) {
      case 1:
        Post.findOne({ _id: postId })
          .then((post) => {
            if (!post.usersLiked.includes(userId)) {
              Post.updateOne(
                { _id: postId },
                { $push: { usersLiked: userId }, $inc: { likes: +1 } }
              ) // On push sur l'array userLiked l'userId et on incrémente likes
                .then(() => res.status(200).json({ message: `J'aime` }))
                .catch((error) => res.status(400).json({ error }));
            }
          })
          .catch((error) => {
            res.status(404).json({ error });
          });
        break;
      case 0:
        Post.findOne({ _id: postId })
          .then((post) => {
            if (post.usersLiked.includes(userId)) {
              Post.updateOne(
                { _id: postId },
                { $pull: { usersLiked: userId }, $inc: { likes: -1 } }
              ) // On retire l'userId de l'array userLiked et on décrémente likes
                .then(() =>
                  res.status(200).json({ message: `Je retire mon like` })
                )
                .catch((error) => res.status(400).json({ error }));
            }
          })
          .catch((error) => {
            res.status(404).json({ error });
          });
        break;
      default:
        console.log("Une erreur a été rencontrée");
    }
  };
}
