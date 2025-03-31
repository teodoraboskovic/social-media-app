//paginacija i filtriranje

const router = require("express").Router();
const bcrypt = require("bcrypt");
const User = require("../models/User");

const userController = require('../controllers/userController');
const authMiddleware = require("../middleware/authMiddleware");

const filterController = require('../controllers/filterController');

router.get('/users', filterController.filter);


module.exports = router