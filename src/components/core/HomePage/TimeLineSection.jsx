import React from "react";
import TimeLineImage from "../../../assets/Images/TimelineImage.png"


import Logo1 from "../../../assets/TimeLineLogo/Logo1.svg"
import Logo2 from "../../../assets/TimeLineLogo/Logo2.svg"
import Logo3 from "../../../assets/TimeLineLogo/Logo3.svg"
import Logo4 from "../../../assets/TimeLineLogo/Logo4.svg"


const timeline = [
    {
      Logo: Logo1,
      Heading: "Leadership",
      Description: "Fully committed to the success company",
    },
    {
      Logo: Logo2,
      Heading: "Responsibility",
      Description: "Students will always be our top priority",
    },
    {
      Logo: Logo3,
      Heading: "Flexibility",
      Description: "The ability to switch is an important skills",
    },
    {
      Logo: Logo4,
      Heading: "Solve the problem",
      Description: "Code your way to a solution",
    },
  ];

const TimeLine = () =>{
    return (
        <div>
            <div className="flex flex-col md:flex-row gap-20 items-center mb-20 ">
                {/* Descriptions */}
                <div className="md:w-[45%] flex flex-col gap-14 lg:gap-3">
                    {
                        timeline.map((element,index) =>{
                            return (
                                <div className="flex flex-col lg:gap-3" key={index}>
                                    <div className="w-[50px] h-[50px] flex rounded-full justify-center items-center">
                                        <img src={element.Logo} alt="logo" />
                                    </div>
                                    <div >
                                        <p className="text-[18px] font-semibold">{element.Heading}</p>
                                        <p className="text-base ">{element.Description}</p>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>

                {/* Image */}
                <div className="relative w-fit h-fit shadow-blue-200 shadow-[0px_0px_30px_0px]">
                    
                    <div className="absolute lg:left-[50%] lg:bottom-0 lg:translate-x-[-50%] lg:translate-y-[50%] bg-caribbeangreen-700 flex lg:flex-row flex-col text-white uppercase py-5 gap-4 lg:gap-0 lg:py-10 ">
                        {/* Section 1 */}
                        <div className="flex gap-5 items-center lg:border-r border-caribbeangreen-300 px-7 lg:px-14">
                        <h1 className="text-3xl font-bold w-[75px]">10</h1>
                        <h1 className="text-caribbeangreen-300 text-sm w-[75px]">
                            Years experiences
                        </h1>
                        </div>

                        {/* Section 2 */}
                        <div className="flex gap-5 items-center lg:px-14 px-7">
                        <h1 className="text-3xl font-bold w-[75px]">250</h1>
                        <h1 className="text-caribbeangreen-300 text-sm w-[75px]">
                            types of courses
                        </h1>
                        </div>
                        <div></div>
                    </div>
                    <div className="shadow-[10px_-5px_50px_-5px] shadow-blue-200">
                        <img src={TimeLineImage} alt="TimeLineImage" className="h-fit" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TimeLine;