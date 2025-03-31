const mongoose = require("mongoose");

const VideoPostSchema = new mongoose.Schema({

    userId:{
        type:String,
        required:true
    },
    description:{
        type:String,
        max:500
    },
    video:{
        type:String
    },
    likes:{
        type:Array,
        deafult:[]
    }
   
},
{timestamps:true}

)

module.exports = mongoose.model("VideoPost", VideoPostSchema)