//instance of mongoose
const mongoose = require("mongoose");

//user model schema
const userSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required: true,
        trim:true,
    },
    lastName:{
        type:String,
        required : true,
        trim:true,
    },
    email:{
        type:String,
        required:true,
        trim:true
    },
    password:{
        type:String,
        required: true,
    },
    accountType:{
        type: String,
        required:true,
        enum:["Student","Instructor","Admin"],
    },
    active:{
        type: Boolean,
        defaul:true,
    },
    approved:{
        type:Boolean,
        defaul:true,
    },
    additionalDetails:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"Profile",
    },
    courses:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Course",
        }
    ],
    imageUrl:{
        type:String,
    },
    token:{
        type:String,
    },
    resetPasswordExpires:{
        type:Date,
    },
    courseProgress:[
        {
            type:mongoose.Schema.Types.ObjectId,
            required:true,
            ref:"CourseProgress",
        },
    ],
});

module.exports = mongoose.model("User",userSchema);