const router = require("express").Router();
const bcrypt = require("bcrypt");
const User = require("../models/User");

const userController = require('../controllers/userController');
const authMiddleware = require("../middleware/authMiddleware");

//update
router.put('/:id', userController.updateUser);

//delete
router.delete('/:id', authMiddleware, userController.deleteUser);

//get user
router.get('/', userController.getUser);

//get friends
router.get('/friends/:userId', userController.getFriends);

//follow
router.put('/:id/follow', userController.followUser);


//unfollow
router.put('/:id/unfollow', userController.unfollowUser);


module.exports = router