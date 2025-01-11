//instance of mongoose
const mongoose = require("mongoose");

//course progress schema
const courseProgressSchema = new mongoose.Schema({
    courseID:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Course",
    },
    userID:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
    },
    completedVideos:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Sub-Section",
        },
    ]
}) 

module.exports = mongoose.model("CourseProgress",courseProgressSchema);