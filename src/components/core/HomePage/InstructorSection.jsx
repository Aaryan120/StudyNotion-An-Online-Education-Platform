import React from "react";
import InstructorImage from "../../../assets/Images/Instructor.png"
import HighlightText from "./HighlightText";
import CTAbutton from "./Button";
import { FaLongArrowAltRight } from "react-icons/fa";
const InstructorSection = () =>{
    return(
        <div className="mt-[100px] mb-[50px]">
            <div className="flex md:flex-row flex-col mx-auto items-center gap-5">
                <div className="w-[50%]  ">
                    {/* Image here */}
                    <img src={InstructorImage} alt="InstructorImage" className="object-contain h-fit shadow-[-20px_-20px_rgba(255,255,255,1)]"/>
                </div>
                <div className="flex flex-col items-start justify-around gap-4 mt-2 md:mt-0 w-[60%] md:w-[35%] mx-auto">
                    {/* heading */}
                    <div className="text-4xl font-semibold w-[50%] ">
                        Become an
                        <HighlightText text={"instructor"}/>
                    </div>
                    <div className="font-semibold text-richblack-500">
                        {/* subheading */}
                        Instructors from around the world teach millions of students on StudyNotion. We provide the tools and skills to teach what you love.
                    </div>
                    <div className="mt-[25px] md:mt-[50px]">
                        <CTAbutton active={true} linkTo={"/signup"}>
                            <div className="flex flex-row items-center gap-2">
                                Start Teaching Today
                                <FaLongArrowAltRight/>
                            </div>
                        </CTAbutton>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default InstructorSection;