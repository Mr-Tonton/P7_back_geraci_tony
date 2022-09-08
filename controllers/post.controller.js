import { PostModel } from "../models/post.model.js";
const Post = PostModel.setPostSchema();
import fs from "fs";

export class PostControllers {
  static getAllPosts() {
    return (req, res, next) => {
      Post.find()
        .then((posts) => res.status(200).json(posts))
        .catch((error) => res.status(404).json({ error: error }));
    };
  }

  static getOnePost() {
    return (req, res, next) => {
      Post.findOne({ _id: req.params.id })
        .then((post) => res.status(200).json(post))
        .catch((error) => res.status(404).json({ error: error }));
    };
  }

  static createPost() {
    // return (req, res, next) => {
    //   const postObject = req.body;
    //   delete postObject._id;
    //   let post;
    //   if (postObject.imageUrl) {
    //     post = new Post({
    //       ...postObject,
    //       imageUrl: `${req.protocol}://${req.get("host")}/images/${
    //         req.file.filename
    //       }`,
    //     });
    //   } else {
    //     post = new Post({
    //       ...postObject,
    //     });
    //   }
    //   post
    //     .save()
    //     .then(() =>
    //       res.status(201).json({ message: "Post saved successfully!" })
    //     )
    //     .catch((error) => res.status(400).json({ error: error }));
    // };
  }

  static updatePost() {
    // return (req, res, next) => {
    //   Post
    //     .findOne({ _id: req.params.id })
    //     .then((post) => {
    //       let postObject = { ...req.body };
    //       if (req.file) {
    //         const filename = post.imageUrl.split("/images/")[1];
    //         postObject = {
    //           ...JSON.parse(req.body.post),
    //           imageUrl: `${req.protocol}://${req.get("host")}/images/${
    //             req.file.filename
    //           }`,
    //         };
    //         fs.unlink(`images/${filename}`, (err) => {
    //           if (err) console.log(err);
    //           else {
    //             console.log(`Deleted file from ./images: ${filename}`);
    //           }
    //         });
    //       }
    //       Post
    //         .updateOne(
    //           { _id: req.params.id },
    //           { ...postObject, _id: req.params.id }
    //         )
    //         .then(() => res.status(200).json({ message: "Post modifié!" }))
    //         .catch((error) => res.status(400).json({ error }));
    //     });
    // };
  }

  static deletePost() {
    // return (req, res, next) => {
    //   Post
    //     .findOne({ _id: req.params.id })
    //     .then((post) => {
    //       const filename = post.imageUrl.split("/images/")[1];
    //       fs.unlink(`images/${filename}`, (err) => {
    //         if (err) console.log(err);
    //         else {
    //           console.log(`Deleted file from ./images: ${filename}`);
    //         }
    //       });
    //       Post
    //         .deleteOne({ _id: req.params.id })
    //         .then(() => res.status(200).json({ message: "Post supprimé !" }))
    //         .catch((error) => res.status(400).json({ message: error }));
    //     })
    //     .catch((error) => res.status(500).json({ message: error }));
    // };
  }
}
