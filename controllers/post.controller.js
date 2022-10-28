import { PostModel } from "../models/post.model.js";
const Post = PostModel.setPostSchema();
import fs from "fs";

export class PostControllers {
  static getFewPosts = (req, res, next) => {
    Post.find()
      .sort({ createdAt: -1 })
      .skip(req.params.skip)
      .limit(req.params.limit)
      .then((posts) => res.status(200).json(posts))
      .catch((error) => res.status(404).json({ error: error }));
  };

  static getOnePost = (req, res, next) => {
    Post.findOne({ _id: req.params.post_id })
      .then((post) => res.status(200).json(post))
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
      .then(() =>
        res.status(201).json({ message: "Post sauvegardé avec succès !" })
      )
      .catch((error) => res.status(400).json({ error: error }));
  };

  static updatePost = (req, res, next) => {
    Post.findOne({ _id: req.params.post_id }).then((post) => {
      let postObject = { ...req.body };
      if (req.file) {
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
        postObject = {
          ...JSON.parse(req.body.post),
          imageUrl: `${req.protocol}://${req.get("host")}/images/postPictures/${
            req.file.filename
          }`,
        };
      }
      Post.updateOne(
        { _id: req.params.post_id },
        { ...postObject, _id: req.params.post_id }
      )
        .then(() =>
          res.status(200).json({ message: "Post modifié avec succès!" })
        )
        .catch((error) => res.status(400).json({ error }));
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
        Post.deleteOne({ _id: req.params.post_id })
          .then(() =>
            res.status(200).json({ message: "Post supprimé avec succès !" })
          )
          .catch((error) => res.status(400).json({ message: error }));
      })
      .catch((error) => res.status(500).json({ message: error }));
  };

  static deleteAllUserPost = (req, res, next) => {
    Post.find({ userId: req.params.user_id }).then((posts) => {
      for (let post of posts) {
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
      }
    });
    Post.deleteMany({ userId: req.params.user_id })
      .then((posts) => {
        res.status(200).json({ post: posts });
      })
      .catch((err) => {
        res.status(400).json({ err: err });
      });
  };
}
