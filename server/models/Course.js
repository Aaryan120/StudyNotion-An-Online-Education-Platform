//instance of mongoose
const mongoose = require("mongoose");

//course schema
const courseSchema = new mongoose.Schema({
    courseName:{
        type:String,
        required:true,
        trim:true
    },
    courseDescription:{
        type:String,
        required:true,
        trim:true,
    },
    price:{
        type:Number,
        required:true,
    },
    instructor:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"User",
    },
    thumbnail:{
        type:String,
        // required:true,
    },
    whatYouWillLearn:{
        type:String,
        required:true,
    },
    tag:[{
        type:String,
    }],
    courseContent:[{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"Section",
    }],
    ratingAndReviews:[{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"RatingAndReviews"
    }],
    category:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"Category"
    },
    studentEnrolled:[{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"User",
    }],
    instructions:[{
        type:String,
    }],
    status:{
        type:String,
        enum:["Draft","Published"],
    },
    createAt:{
        type:Date,
        default:Date.now,
    }
});
 
module.exports = mongoose.model("Course",courseSchema);