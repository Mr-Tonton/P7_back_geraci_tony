const express = require("express");
const router = express.Router();
const multer = require("../middlewares/multerConfig.middleware");
const auth = require("../middlewares/auth.middleware");

const postCtrl = require("../controllers/post.controller");

router.get("/", auth, postCtrl.getAllPosts);
router.get("/:id", auth, postCtrl.getOnePost);
router.post("/", auth, multer, postCtrl.createPost);
router.put("/:id", auth, multer, postCtrl.updatePost);
router.delete("/:id", auth, postCtrl.deletePost);

module.exports = router;
