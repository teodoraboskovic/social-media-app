const User = require("../models/User");
// const router = require("express").Router();
const bcrypt = require("bcrypt");

exports.deleteUser = async (req, res) => {
    const { id: userId } = req.params;
    const { userId: requestingUserId, isAdmin } = req.body;

    try {
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json("Korisnik nije pronađen.");
        }

        if (requestingUserId === userId || isAdmin) {
            await User.findByIdAndDelete(userId);
            return res.status(200).json("Nalog je obrisan.");
        } else {
            return res.status(403).json("Mozes da delete-ujes samo svoj nalog!");
        }
    } catch (err) {
        console.error(err);
        return res.status(500).json("Greška prilikom brisanja naloga.");
    }
};

exports.getUser = async (req, res) => {
    const userId = req.query.userId
    const username = req.query.username
    try{

        const user = userId ? await User.findById(userId) : await User.findOne({username : username})
        const {password, isAdmin, updatedAt, ...other} = user._doc //pravi dokument i u njega smesta objekat koji sadrzi sve ove propertije
        res.status(200).json(other) //saljemo mu samo other (sve bez napisanih properyija)
    }catch(err){
        return res.status(500).json(err + " greskaaa")
    }

};

exports.updateUser = async (req, res) => {
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
            res.status(200).json("Account je azuriran")

        }catch(err){
            return res.status(500).json(err + " greskaaa")
        }

    }else{
        return res.status(403).json("Mozes da update-ujes samo svoj nalog!")
    }
}

exports.followUser = async (req, res) => {

    if(req.body.userId !== req.params.id){
        try{
            const user = await User.findById(req.params.id)//u linku je koga zelimo da zapratimo
            const currentUser = await User.findById(req.body.userId)
            if(!user.followers.includes(req.body.userId)){ //ako kod te osobe koju zelimo da zapratimo se ja vec nalazim u followerima
                await user.updateOne({$push:{followers:req.body.userId}})
                await currentUser.updateOne({$push:{followings:req.params.id}})
                res.status(200).json("Korisnik je zapracen!")
            }else{
                res.status(403).json("Vec pratite ovu osobu.")
            }

        }catch(err){
            res.status(500).json(err + "greska je")
        }


    }else{
        res.status(403).json("ne mozes da zapratis samog sebe!");
    }

}

exports.unfollowUser = async (req, res) => {

    if(req.body.userId !== req.params.id){
        try{
            const user = await User.findById(req.params.id)//u linku je koga zelimo da zapratimo
            const currentUser = await User.findById(req.body.userId)
            if(user.followers.includes(req.body.userId)){ //ako kod te osobe koju zelimo da zapratimo se ja vec nalazim u followerima
                await user.updateOne({$pull:{followers:req.body.userId}})
                await currentUser.updateOne({$pull:{followings:req.params.id}})
                res.status(200).json("Korisnik je otpracen!")
            }else{
                res.status(403).json("Ne pratite ovu osobu.")
            }

        }catch(err){
            res.status(500).json(err + "greska je")
        }


    }else{
        res.status(403).json("ne mozes da otpratis samog sebe!");
    }

}

exports.getFriends = async (req, res) => {
    
    try{

        const user = await User.findById(req.params.userId)
        const friends = await Promise.all(
            user.followings.map(friendId=>{
                return User.findById(friendId)
            })
        )
        
            let friendList = []
            friends.map(friend=>{

                const{_id, username, profilePicture} = friend
                friendList.push({_id, username, profilePicture})
            })

            res.status(200).json(friendList)

    }catch(err){
        return res.status(500).json(err + " greskaaa")
    }

};