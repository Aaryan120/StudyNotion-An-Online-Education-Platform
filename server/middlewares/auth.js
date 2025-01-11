// import the required modules
const jwt = require("jsonwebtoken");
require("dotenv").config();
const User = require("../models/User");


// Auth middleware used to authenticate the user requests
exports.auth = async(req,res,next) =>{
    try {
        //extract token
        const token = req.cookies.token 
                      || req.body.token 
                      || req.header("Authorization").replace("Bearer ","");

        if(!token){
            return res.status(401).json({
                success:false,
                message:"Token is missing"
            });
        }

        //verify the token
        try {
            const decode = await jwt.verify(token, process.env.JWT_SECRET);

            req.user = decode;
        } catch (error) {
            return res.status(401).json({
                success:false,
                message:"Token is invalid",
            });
        }
        next();

    } catch (error) {
        return res.status(401).json({
            success:false,
            message:"Something went wrong while validating the Token",
        });
    }
};

//isStudent to authenticate that the user is student
exports.isStudent = async(req,res,next) =>{
    try {
        const userDetails = await User.findOne({email: req.user.email});
        //verify the role of the user
        if(userDetails.accountType !== "Student"){
            return res.status(401).json({
                success:false,
                message:"This route is for students only",
            });
        }
        // call the next middleware
        next();

    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Could not authenticate user role",
        });
    }
}


//isInstructor
exports.isInstructor = async(req,res,next) =>{
    try {
        const userDetails = await User.findOne({email: req.user.email});

        //verify the role of the user
        if(userDetails.accountType !== "Instructor"){
            return res.status(401).json({
                success:false,
                message:"This route is for Instructor only",
            });
        }
        // call the next middleware
        next();

    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Could not authenticate user role",
        });
    }
}

//isAdmin
exports.isAdmin = async(req,res,next) =>{
    try {
        const userDetails = await User.findOne({email: req.user.email});
        //verify the role of the user
        if(userDetails.accountType !== "Admin"){
            return res.status(401).json({
                success:false,
                message:"This route is for Admin only",
            });
        }
        // call the next middleware
        next();

    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Could not authenticate user role inside admin",
        });
    }
}