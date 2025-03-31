const router = require("express").Router();
const Post = require("../models/Post");
const User = require("../models/User");

const postController = require('../controllers/postController');

//create post
router.post("/", postController.createPost);


//update post
router.put("/:id", postController.updatePost);

//delete post
router.delete("/:id", postController.deletePost);

//like a post/dislike
router.put("/:id/like", postController.likePost);


//get a post
router.get("/:id", postController.getPost);


module.exports = router