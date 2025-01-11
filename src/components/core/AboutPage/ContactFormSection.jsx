import react from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import ContactUsForm from "../../contactPage/ContactUsForm";
const ContactFormSection = () =>{
    
    return (
        <div className="w-11/12 max-w-maxContent mx-auto text-white flex
        flex-col gap-5 items-center mb-10 mt-5">
            <div className="text-center">
                <h1 className="text-xl lg:text-4xl font-semibold">Get in Touch</h1>
                <p className="text-richblack-300 font-medium text-base mt-2">We'd love to hear from you, Please fill out this form</p>
            </div>
            <div className="mt-7 mx-auto">
               <ContactUsForm/> 
            </div>
            
        </div>
    )
}

export default ContactFormSection