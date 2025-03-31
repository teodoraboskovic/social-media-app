const router = require("express").Router();
const bcrypt = require("bcrypt");
const User = require("../models/User");

const commentController = require('../controllers/commentController');
const authMiddleware = require("../middleware/authMiddleware");

router.post('/add', commentController.addComment);

module.exports = router