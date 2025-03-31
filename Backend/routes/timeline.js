const router = require("express").Router();
const Post = require("../models/Post");
const User = require("../models/User");

const timelineController = require('../controllers/timelineController');
//get timeline posts
router.get("/:userId", timelineController.getTimeline);

router.get("/profile/:username", timelineController.getProfilePosts);

module.exports = router