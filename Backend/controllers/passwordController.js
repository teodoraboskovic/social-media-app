const router = require("express").Router();
const bcrypt = require("bcrypt");
const User = require("../models/User");

const userController = require('../controllers/userController');
const authMiddleware = require("../middleware/authMiddleware");


exports.changePassword = async (req, res) => {
  
    if(req.body.userId === req.params.id || req.body.isAdmin){

        if(req.body.password){
            try{
                const salt = await bcrypt.genSalt(10);
                req.body.password = await bcrypt.hash(req.body.password, salt)

            }catch(err){
                return res.status(500).json(err)
            }
        }

        try{
            const user = await User.findByIdAndUpdate(req.params.id, {
                $set:req.body
            })
            res.status(200).json("Password je azuriran")

        }catch(err){
            return res.status(500).json(err + " greskaaa")
        }

    }else{
        return res.status(403).json("Mozes da update-ujes samo svoj nalog!")
    }
};