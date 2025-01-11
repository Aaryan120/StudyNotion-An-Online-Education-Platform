import react from "react";
import ContactUsForm from "../components/contactPage/ContactUsForm";
import { IoMdChatboxes } from "react-icons/io";
import { HiMiniGlobeEuropeAfrica } from "react-icons/hi2";
import { IoCall } from "react-icons/io5";
import ReviewSlider from "../components/common/ReviewSlider";
import Footer from "../components/common/Footer";

const Data = [
    {
        icon: <IoMdChatboxes/>,
        heading: "Chat on us",
        description1 : "Our friendly team is here to help.",
        description2: "@mail address"
    },
    {
        icon: <HiMiniGlobeEuropeAfrica/>,
        heading: "Visit us",
        description1 : "Come and say hello at our office HQ.",
        description2: "Here is the location/address"
    },
    {
        icon: <IoCall/>,
        heading: "Call us",
        description1 : "Mon - Fri from 8am to 5pm",
        description2: "+123 456 7890"
    }
]

const ContactUs = () =>{
    return(
        <>
            <div className="w-11/12 max-w-maxContent text-white flex flex-col lg:flex-row justify-evenly gap-16 lg:gap-5 mx-auto mt-12 mb-10 items-center lg:items-start">
                <div className="flex flex-col rounded-xl p-7 pl-10 md:h-[350px] md:w-[400px] lg:h-[320px] bg-richblack-800">
                    {/* Detail block */}
                    {
                        Data.map((element,index) =>{
                            return (
                                <div
                                className="flex flex-col mb-5"
                                key={index}>
                                    <div>
                                        <div className="flex items-center gap-2 text-richblack-100">
                                            {element.icon}
                                            <h1 className="text-md text-white font-semibold">{element.heading}</h1>
                                        </div>
                                        <div className="px-6 text-richblack-300 text-sm font-medium">
                                            {element.description1}
                                        </div>
                                        <div className="px-6 text-richblack-300 text-sm font-medium">
                                            {element.description2}
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
                <div className="border rounded-xl p-10 flex flex-col gap-4 w-[90%] md:w-[65%] border-richblack-500 lg:w-[55%]">
                    <div className="flex flex-col gap-4 p-2">
                        <h1 className="text-2xl lg:text-4xl font-semibold text-richblack-5 ">Got an Idea? We've got the skills.
                        Let's team up</h1>
                        <p className="text-richblack-300 text-sm font-medium">Tell us more about yourself and what you've got in mind</p>
                    </div>
                    <div>
                        <ContactUsForm/>
                    </div>
                </div>
            </div>
            <div className="w-11/12 max-w-maxContent bg-richblack-900 text-white flex-col items-center justify-between mx-auto">
                    <h1 className="text-center text-4xl font-semibold ">Review from Other Learners</h1>
                    <ReviewSlider/>
            </div>
                
        <Footer/>
        </>
        
    )
}


export default ContactUs;