import { PostModel } from "../models/post.model.js";
const Post = PostModel.setPostSchema();
import fs from "fs";

export class PostControllers {
  static getAllPosts = (req, res, next) => {
    Post.find()
      .then((posts) => res.status(200).json(posts))
      .catch((error) => res.status(404).json({ error: error }));
  };

  static getOnePost = (req, res, next) => {
    Post.findOne({ _id: req.params.post_id })
      .then((post) => res.status(200).json(post))
      .catch((error) => res.status(404).json({ error: error }));
  };

  static createPost = (req, res, next) => {
    const postObject = req.body;
    delete postObject._id;
    let post;
    if (req.file) {
      post = new Post({
        ...postObject,
        imageUrl: `${req.protocol}://${req.get("host")}/images/${
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
          const filename = post.imageUrl.split("/images/")[1];
          fs.unlink(`images/${filename}`, (err) => {
            if (err) {
              console.log(err);
            } else {
              console.log(`fichier effacé depuis ./images: ${filename}`);
            }
          });
        }
        postObject = {
          ...JSON.parse(req.body.post),
          imageUrl: `${req.protocol}://${req.get("host")}/images/${
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
          const filename = post.imageUrl.split("/images/")[1];
          fs.unlink(`images/${filename} `, (err) => {
            if (err) {
              console.log(err);
            } else {
              console.log(`fichier effacé depuis ./images: ${filename}`);
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
}
