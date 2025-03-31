const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const Comment = require("../models/Comment");

exports.addComment = async (req, res) => {

    try{
        //create new user
        const newComment = new Comment({
            userId: req.body.userId,
            postId: req.body.postId,
            content: req.body.content
        })
    
    //save user and return response
        const comment = await newComment.save();
        res.status(200).json(comment);
    } catch(err){
        res.status(500).json(err)
    }

}