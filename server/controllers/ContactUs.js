// Import mongoose
const mailSender = require("../utils/mailSender");
const { contactUsEmail } = require("../mail/templates/contactFormRes");

require("dotenv").config();


// contactUs (handler function)
exports.contactUs = async (req,res) =>{
    // fetch all the data
    const {firstName,lastName,email,phoneNumber,message,countrycode} = req.body;
    
    try {
        // send the mail to the user
        const mailResponse = await mailSender(
            email,
            "Your Data is Sent Successfully",
            contactUsEmail(email,firstName,lastName,message,phoneNumber,countrycode)
        );

        return res.status(200).json({
            success:true,
            message:"Email send successfully",
        })
    } catch (error) {

        return res.status(500).json({
            success:false,
            message:"Something went wrong..."
        })
    }
}