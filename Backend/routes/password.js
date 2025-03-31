//promena lozinke 

const router = require("express").Router();
const bcrypt = require("bcrypt");
const User = require("../models/User");

const userController = require('../controllers/userController');
const authMiddleware = require("../middleware/authMiddleware");

const passwordController = require('../controllers/passwordController');
//dodati middleware ovde
router.put('/:id/change', authMiddleware, passwordController.changePassword);


module.exports = router