const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

exports.login = async (req, res) => {
    try{
        const user = await User.findOne({email:req.body.email});
    !user && res.status(404).json("Korisnik nije pronadjen")

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if(!validPassword){
        res.status(400).json("pogresna sifra")
    }else{
        console.log("ovo radii")
        // Kreiranje JWT tokena
        const token = jwt.sign({ userId: user.id, username: user.username }, 'secret');
   
        // Slanje tokena u odgovoru
       //  res.json({ token });
       res.status(200).json(user);
    }
    // !validPassword && res.status(400).json("pogresna sifra")


    

    } catch(err){

        res.status(500).json(err + " greskaa")
    }
};

exports.register = async (req, res) => {

    try{

        //generate new password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt)
    
        //create new user
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword
        })
    
    //save user and return response
        const user = await newUser.save();
        res.status(200).json(user);
    } catch(err){
        res.status(500).json(err)
    }

}


exports.logout = async (req, res) => {

    try {
        // Izvući token iz zaglavlja ili iz tela zahteva, zavisno o tome kako ga šaljete
        const token = req.headers.authorization;
        res.status(200).json("Uspešno ste odjavljeni.");
      } catch (err) {
        console.error("Greška pri odjavljivanju:", err);
        res.status(500).json("Greška pri odjavljivanju.");
      }
};


// Dodatna logiku za devalidaciju tokena
        // Na primer, možete ga dodati na crnu listu tokena
        // Ova crna lista može biti u bazi podataka, kešu, ili drugom mestu
    
        // Ovde se pretpostavlja da postoji globalna promenljiva za crnu listu tokena
        // if (!global.blacklist) {
        //   global.blacklist = [];
        // }
    
        // global.blacklist.push(token);