import React from "react";
import SignupForm from "./SignupForm";
import LoginForm from "./LoginForm";
import frame from "../../../assets/Images/frame.png"
import { useSelector } from "react-redux";

const Template = ({title,description1,description2,image,formType})=>{

    const {loading} = useSelector((state) => state.auth);
    return(

        <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
            {
                loading ?
                (<div className="spinner"></div>) : 
                (
                    <div className="mx-auto flex w-11/12 max-w-maxContent flex-col-reverse justify-around gap-y-12 py-12 md:flex-row md:gap-y-0 md:gap-x-12 text-richblack-300">
                        <div className="mx-auto w-11/12 max-w-[450px] md:mx-0">
                            {/* Form details */}
                            {/* Heading and subheading*/}
                            <div>
                                <h1 className="text-[1.875rem] font-semibold leading-[2.375rem] text-richblack-5">{title}</h1>
                                <p className="mt-4 text-[1.125rem] leading-[1.625rem]"><span className="text-richblack-100">{description1}</span>{" "} <span className="font-edu-sa font-bold italic text-blue-100">{description2}</span></p>
                            </div>

                            {/* Form */}
                            {formType === "Signup" ? <SignupForm/> : <LoginForm/>}

                
                        </div>
                        <div>
                            {/* Image */}
                            <div className="relative mx-auto w-11/12 max-w-[450px] md:mx-0">
                                <img src={frame} alt="patterImage" width={558} height={504} loading="lazy"/>
                                <img src={image} alt="studentImage" width={558} height={504} loading="lazy" className="absolute -top-4 right-4 z-10"/>
                            </div>
                        </div>
                    </div>
                    
                )
            }
            
        </div>
    )
}

export default Template;