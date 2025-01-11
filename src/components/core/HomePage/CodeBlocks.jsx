import React from "react";
// import HighlightText from "./HighlightText";
import CTAbutton from "./Button";
import { FaLongArrowAltRight } from "react-icons/fa";
import { TypeAnimation } from "react-type-animation";

const CodeBlocks = ({position,heading,subHeading,button1,button2,codeblock,backgroundGradient,codeColor}) =>{
    return (
        <div className={`flex ${position} my-20 justify-between flex-col lg:gap-10 gap-10`}>

            {/* Section 1*/}
            <div className="w-[100%] lg:w-[50%] flex flex-col gap-8">
                {/* Heading */}
                {heading}

                {/* Sub heading */}
                <div className="text-richblack-300 text-base font-bold w-[85%] -mt-3">
                    {subHeading}
                </div>
                {/* 2 Buttons */}
                <div className="flex gap-7 mt-7">
                    <CTAbutton active={button1.active} linkTo={button1.link}>
                        <div className="flex gap-2 items-center">
                            {button1.btnText}
                            <FaLongArrowAltRight/>
                        </div>
                    </CTAbutton>

                    <CTAbutton active={button2.active} linkTo={button2.link}>
                        {button2.btnText}
                    </CTAbutton>
                </div>
            </div>

            {/* Section 2 */}
            <div className="h-fit code-border flex flex-row py-3 text-[10px] sm:text-sm leading-[18px] sm:leading-6 relative w-[100%] lg:w-[470px]">
                {/* Code writer */}
                {backgroundGradient}
                <div className="w-[10%] text-richblack-400 text-center flex flex-col font-inter font-bold">
                    <p>1</p>
                    <p>2</p>
                    <p>3</p>
                    <p>4</p>
                    <p>5</p>
                    <p>6</p>
                    <p>7</p>
                    <p>8</p>
                    <p>9</p>
                    <p>10</p>
                    <p>11</p>
                </div>
                <div className={`w-[90%] flex flex-col font-bold font-mono ${codeColor} pr-1`}>
                    <TypeAnimation 
                    sequence={[codeblock,1000,""]}
                    repeat={Infinity}
                    cursor={true}
                    style={
                        {
                            whiteSpace:"pre-line",
                            display:"block"

                        }
                    }
                    omitDeletionAnimation={true}
                    />
                </div>
            </div>
        </div>
    )
}

export default CodeBlocks;