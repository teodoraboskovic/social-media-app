const router = require("express").Router();
const bcrypt = require("bcrypt");
const User = require("../models/User");

const userController = require('../controllers/userController');
const authMiddleware = require("../middleware/authMiddleware");

exports.filter = async (req, res) => {
    try {
      // console.log(req.body.page)
        // const page = parseInt(req.body.page) || 1;
        // const pageSize = parseInt(req.body.pageSize) || 2;
        // const nameFilter = req.body.username;
        const page = parseInt(req.query.page) || 1;
const pageSize = parseInt(req.query.pageSize) || 2;
const nameFilter = req.query.username;
    
        // Formiranje objekta za MongoDB upit
        const query = {};
        if (nameFilter) {
          query.username = { $regex: new RegExp(nameFilter, 'i') }; // Filtriranje po imenu, case-insensitive
        }
    
        // Izvršavanje upita sa paginacijom
        const users = await User.find(query)
          .skip((page - 1) * pageSize)
          .limit(pageSize);
    
        res.json(users);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Greška prilikom dohvatanja korisnika.' });
      }

};