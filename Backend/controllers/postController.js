const router = require("express").Router();
const Post = require("../models/Post");
const User = require("../models/User");


exports.createPost = async (req, res) => {

    const newPost = new Post(req.body)

    try{
        const savedPost = await newPost.save();
        res.status(200).json(savedPost)

    }catch(err){
        res.status(500).json(err + " :greska")
    }
};

exports.updatePost = async (req, res) => {
    try{
        
        const post = await Post.findById(req.params.id)

        if(post.userId === req.body.userId){
            await post.updateOne({$set:req.body})
            res.status(200).json("post je azuriran")
        }else{
            res.status(403).json("mozes samo svoj post da menjas")
        }
    }catch(err){
        res.status(500).json(err + " :greska")
    }

};

exports.deletePost = async (req, res) => {
    try{
        
        const post = await Post.findById(req.params.id)
        console.log(">>>>>>" +req.body.isAdmin)
        if(post.userId === req.body.userId || req.body.isAdmin){
            await post.deleteOne()
            res.status(200).json("post je obrisan")
        }else{
            res.status(403).json("mozes samo svoj post da obrises")
        }
    }catch(err){
        res.status(500).json(err + " :greska")
    }

};

exports.likePost = async (req, res) => {

    try{
        
        const post = await Post.findById(req.params.id)

        if(!post.likes.includes(req.body.userId)){
            await post.updateOne({$push:{likes:req.body.userId}})
            res.status(200).json("post je lajkovan")
        }else{
            await post.updateOne({$pull:{likes:req.body.userId}})
            res.status(200).json("post je dislajkovan")
        }
    }catch(err){
        res.status(500).json(err + " :greska")
    }
};

exports.getPost = async (req, res) => {

    try{
        
        const post = await Post.findById(req.params.id)
        res.status(200).json(post)
    }catch(err){
        res.status(500).json(err + " :greska")
    }
};