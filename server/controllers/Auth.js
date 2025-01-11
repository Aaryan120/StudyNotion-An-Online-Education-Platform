//all necessary models imported here
const OTP = require("../models/OTP");
const User = require("../models/User");
const otpGenerator = require("otp-generator");
const bcrypt = require("bcrypt");
const Profile = require("../models/Profile");
const jwt = require("jsonwebtoken");
const mailSender = require("../utils/mailSender")
const {passwordUpdated} = require("../mail/templates/passwordUpdate");
require("dotenv").config();
//send OTP
exports.sendOTP = async(req,res) =>{
    try{
        //fetch email from request body
        const {email} = req.body;
        
        //check if user already exists
        const isAlreadyPresent = await User.findOne({email: email});
        //if exists return response
        if(isAlreadyPresent){
            return res.status(401).json({
                success:false,
                message:"User already exists, Please Login",
            });
        }
        //if not exists, generate Unique OTP
        var otp = otpGenerator.generate(6, {
            upperCaseAlphabets: false,
            lowerCaseAlphabets: false,
            digits: true,
            specialChars:false,
        });

        //otp should be unique,find if otp exists in db(not a good way to find the unique code)
        let otpExists = await OTP.findOne({otp: otp});

        while(otpExists){
            otp = otpGenerator.generate(6, {
                upperCaseAlphabets: false,
                lowerCaseAlphabets: false,
                digits: true,
                specialChars:false,
            });
            otpExists = await OTP.findOne({otp: otp});
        }

        const otpPayload = {email, otp};

        //create an entry in db for OTP
        const otpBody = await OTP.create(otpPayload);



        //return response successful

        res.status(200).json({
            success:true,
            message:'OTP sent successfully',
            otp,
        });

    }
    catch(error){
        return res.status(500).json({
            success: false,
            message: "OTP send failed",
        })
    }
}

//sign up handler
exports.signUp = async(req,res) =>{
    try{
        //data fetch from request body
        const {
            firstName,
            lastName,
            email,
            password,
            confirmPassword,
            accountType,
            otp
        } = req.body;
        //validate data 
        if(
            !firstName || 
            !lastName || 
            !email || 
            !password || 
            !confirmPassword ||
            !otp
        ){
            return res.status(403).json({
                success:false,
                message:"Please fill all the fields"
            })
        }
        //match the 2 passwords
        if(password !== confirmPassword){
            return res.status(400).json({
                success:false,
                message:"Password and confirm password value does not match, please try again"
            });
        }
        // (if user exists already or not)
        const alreadyExists = await User.findOne({email : email});

        if(alreadyExists){
            return res.status(400).json({
                success:false,
                message:"User Already Exists, Please Sign-In To Continue",
            });
        }
        //verify otp ( from most recent otp stored for user)
        //sorting on the basis of createdAt and -1 is for sorting in descending order and limit(1) limits the results to only one document.
        const recentOTP = await OTP.find({email: email}).sort({createdAt:-1}).limit(1);

        if(recentOTP.length === 0){
            return res.status(400).json({
                success:false,
                message:"OTP is not valid"
            })
        }
        if(recentOTP[0].otp !== otp){
            return res.status(400).json({
                success:false,
                message:"invalid OTP",
            });
        }
        //hash password
        const hashPassword = await bcrypt.hash(password,10);

        //create entry in db
        // let approved = ""
        // approved === "Instructor" ? (approved = false) : (approved = true)

        const profileDetails = await Profile.create({
            gender:null,
            dateOfBirth:null,
            about:null,
            contactNumber:null,
        })
        const user = await User.create({
            firstName,
            lastName,
            email,
            password:hashPassword,
            accountType,
            // approved:approved,
            additionalDetails:profileDetails._id,
            imageUrl:""
        });

        //response send
        res.status(200).json({
            success:true,
            message:"User Registered Successfully",
            user,
        }); 
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:"Error while signing in. Please try again",
        });
    }
}


//login handler
exports.login = async(req,res) => {
    try {
        //fetch data from req body
        const {email,password} = req.body;
        //validate data
        if(!email || !password){
            return res.status(400).json({
                success:false,
                message:"Fill all the fields carefully"
            });
        };
        //check if user exists or not
        const user = await User.findOne({email}).populate("additionalDetails");//no need to populate, can be populated and can not be populated(Should be populated because needed when need bio for frontend)

        if(!user){
            return res.status(401).json({
                success:false,
                message:"User is not Registered, Please Sign-Up To Continue"
            });
        }

        //match passwords from DB and generate token and create cookie
        if(await bcrypt.compare(password,user.password)){
            const payload = {
                email: user.email,
                id: user._id,
                accountType: user.accountType
            };

            const token = jwt.sign(payload,process.env.JWT_SECRET,{
                expiresIn:"24h",
            })
            user.token = token;
            user.password = undefined;
            // Create cookie and send response
            const options = {
                expiresIn: new Date(Date.now() + 3*24*60*60*1000),
                httpOnly:true,
            };
            res.cookie("token",token,options).status(200).json({
                success:true,
                token,
                user,
                message:"Logged in Successfully"
            })
        }
        else{
            return res.status(401).json({
                success:false,
                message:"Password is incorrect",
            })
        } 
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Login failed. Please try again later"
        })
    }
}

exports.changePassword = async(req,res) =>{
    try {
        //fetch data from req body
        const {currentPassword,newPassword} = req.body;
        //fetch the details of user from req body
        const userID = req.user.id;
        //validate karo data
        if(!currentPassword || !newPassword){
            return res.status(400).json({
                success:false,
                message:"All fields are required"
            })
        };
        const userDetails = await User.findById(userID);

        //match password
        if(await bcrypt.compare(currentPassword,userDetails.password)){
            //assign new password after hashing update the db
            const newHashedPassword = await bcrypt.hash(newPassword,10);
            
            //update the user entry
            const updatedUserDetails = await User.findByIdAndUpdate(
                {_id:userID},
                { 
                    password:newHashedPassword,
                },
                {new:true},
            )
            //send the mail for password change successfully
            try {
                const emailResponse = await mailSender(
                    updatedUserDetails.email,
                    "Password for your account has been updated",
                    passwordUpdated(
                        updatedUserDetails.email,
                        `Password updated successfully for ${updatedUserDetails.firstName} ${updatedUserDetails.lastName}`
                    )
                )


            } catch (error) {
                return res.status(500).json({
                    success:false,
                    message:"Error occured while sending email",
                })
            }
            //return res
            return res.status(200).json({
                success:true,
                message:"Password changed successfully",
            })
        }
        return res.status(401).json({
            success:false,
            message:"Password do not match",
        })
    
    } catch (error) {
        return res.status(400).json({
            success:false,
            message:"Password change failed,Please Try Again Later"
        });
    }
}