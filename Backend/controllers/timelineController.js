const router = require("express").Router();
const Post = require("../models/Post");
const User = require("../models/User");


exports.getTimeline = async (req, res) => {

    try{
        
        const currentUser = await User.findById(req.params.userId)
        const userPosts = await Post.find({userId: currentUser._id})
        const friendPosts = await Promise.all( //ubacuje u kolekciju friendspost sve postove prijatelja
            currentUser.followings.map(friendId=>{
                return Post.find({userId:friendId})
            })
        )

        res.json(userPosts.concat(...friendPosts))
    }catch(err){
        res.status(500).json(err + " :greska")
    }
};

exports.getProfilePosts = async (req, res) => {

    try{
        const user = await User.findOne({username:req.params.username})
        const posts = await Post.find({userId: user._id})
        res.status(200).json(posts)
    }catch(err){
        res.status(500).json(err + " :greska")
    }
};