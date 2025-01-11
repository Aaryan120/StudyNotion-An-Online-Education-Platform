const express = require("express");
const router = express.Router();


const {contactUs} = require("../controllers/ContactUs");

// ********************************************************************************************************
//                                      Contact us route
// ********************************************************************************************************


router.post("/contact",contactUs);

module.exports = router