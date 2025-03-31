const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

const authController = require('../controllers/authController');
const authMiddleware = require("../middleware/authMiddleware");

//register
router.post('/register', authController.register);

//LOGIN
router.post('/login', authController.login);

//LOGOUT
router.post('/logout', authMiddleware, authController.logout);

module.exports = router