// Import express and create instance of router
const express = require("express");
const router = express.Router();

// Import the required handler function
const {
    sendOTP,
    signUp,
    login,
    changePassword
} = require("../controllers/Auth");


const {
    resetPasswordToken,
    resetPassword
} = require("../controllers/ResetPassword");

// Import the required middlewares
const {auth} = require("../middlewares/auth");

// Create route for every handler function

// ********************************************************************************************************
//                                      Authentication routes
// ********************************************************************************************************

router.post("/login",login);

router.post("/signup",signUp);

router.post("/sendotp",sendOTP);

router.post("/changepassword",auth,changePassword);


// ********************************************************************************************************
//                                      Reset Password
// ********************************************************************************************************

router.post("/reset-password-token",resetPasswordToken);

router.post("/reset-password",resetPassword);


// Export the router for use in the main application
module.exports = router