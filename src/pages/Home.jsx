import React from "react";
import { FaLongArrowAltRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import HighlightText from "../components/core/HomePage/HighlightText";
import CTAbutton from "../components/core/HomePage/Button";
import banner from "../assets/Images/banner.mp4"
import CodeBlocks from "../components/core/HomePage/CodeBlocks";
import TimeLine from "../components/core/HomePage/TimeLineSection";
import LearningLanguage from "../components/core/HomePage/LearningLanguageSection";
import InstructorSection from "../components/core/HomePage/InstructorSection";
// import Footer from "../components/common/Footer";
import ExploreMore from "../components/core/HomePage/ExploreMore";
import ReviewSlider from "../components/common/ReviewSlider";
import Footer from "../components/common/Footer";



const Home = () =>{
    return (
        <div>
            {/* Section 1 */}
            <div className="max-w-maxContent relative mx-auto flex flex-col w-11/12 items-center text-white justify-between">
                <Link to={"/signup"} className="group mx-auto mt-16 w-fit rounded-full bg-richblack-800 p-1 font-bold text-richblack-200 drop-shadow-[0_1.5px_rgba(255,255,255,0.25)] transition-all duration-200 hover:scale-95 hover:drop-shadow-none">
                    <div className="flex flex-row items-center gap-2 rounded-full px-10 py-[5px] transition-all duration-200 group-hover:bg-richblack-900">
                        <p>Become an Instructor</p>
                        <FaLongArrowAltRight />
                    </div>
                </Link>

                <div className="text-center text-4xl mt-8 font-semibold">
                    Empower Your Future with
                    <HighlightText text={"Coding Skills"}/>
                </div>
                <div className="text-center mt-4 w-[90%] text-lg font-bold text-richblack-300">
                    With our online coding courses, you can learn at your own pace, from anywhere in the world, and get access to a wealth of resources, including hands-on project, quizzes, and personalized feedback from instructors
                </div>
                <div className="flex flex-row gap-7 mt-8">
                    <CTAbutton active={true} linkTo={"/signup"}>
                        Learn More
                    </CTAbutton>
                    <CTAbutton active={false} linkTo={"/login"}>
                        Book a Demo
                    </CTAbutton>
                </div>

                <div className="mx-3 my-7 shadow-[10px_-5px_50px_-5px] shadow-blue-200">
                    <video
                    muted
                    loop
                    autoPlay
                    className="shadow-[20px_20px_rgba(255,255,255)]"
                    >
                        <source src={banner} type="video/mp4"/>
                    </video>
                </div>

                {/* Code Section 1 */}
                <div>
                <CodeBlocks
                    position={"lg:flex-row"}
                    heading={
                        <div className="text-4xl font-semibold">
                            Unlock Your
                            <HighlightText text={"coding potential "}/>
                            with our online courses.
                        </div>
                    }
                    subHeading={
                        "Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you"
                    }
                    button1 = {
                        {
                            active: true,
                            btnText: "Try It Yourself",
                            link: "/signup",
                        }
                    }
                    button2 = {
                        {
                            active:false,
                            btnText: "Learn More",
                            link: "/login"
                        }
                    }

                    codeblock={
                        `<!DOCTYPE html>\n <html lang="en">\n<head>\n<title>This is myPage</title>\n</head>\n<body>\n<h1><a href="/">Header</a></h1>\n<nav> <a href="/one">One</a> <a href="/two">Two</a> <a href="/three">Three</a>\n</nav>\n</body>`
                    }
                    codeColor={"text-yellow-25"}

                    backgroundGradient={<div className="codeblock1 absolute"></div>}
                />
                </div>
                {/* Code Section 2 */}
                <div>                
                <CodeBlocks
                    position={"lg:flex-row-reverse"}
                    heading={
                        <div className="text-4xl font-semibold">
                            Start
                            <HighlightText text={"coding in seconds"}/>
                        </div>
                    }
                    subHeading={
                        "Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lession."
                    }
                    button1 = {
                        {
                            active: true,
                            btnText: "Continue Lessions",
                            link: "/login",
                        }
                    }
                    button2 = {
                        {
                            active:false,
                            btnText: "Learn More",
                            link: "/signup"
                        }
                    }
                    codeblock={
                        `import React from "react";\n import CTAButton from "./Button";\nimport TypeAnimation from "react-type";\nimport { FaArrowRight } from "react-icons/fa";\n\nconst Home = () => {\nreturn (\n<div>Home</div>\n)\n}\nexport default Home;`
                    }
                    codeColor={"text-blue-100"}
                    backgroundGradient={<div className="codeblock2 absolute"></div>}
                />
                </div>
                

                <ExploreMore/>
            </div>

            {/* Section 2 */}
            <div className="bg-pure-greys-5 text-richblack-700">
                {/* Pattern */}
                <div className="homepage_bg h-[320px]">
                    <div className="flex flex-col items-center w-11/12 max-w-maxContent gap-5 mx-auto">
                        <div className="lg:h-[150px]">
                            
                        </div>
                        <div className="flex flex-row gap-7 text-white lg:mt-8">
                            <CTAbutton active={true} linkTo={"/signup"}>
                                <div className="flex items-center gap-2">
                                    Explore Full Catalog
                                    <FaLongArrowAltRight /> 
                                </div>
                                
                            </CTAbutton>
                            <CTAbutton active={false} linkTo={"/login"}>
                                <div>
                                    Learn More
                                </div>
                                
                            </CTAbutton>
                        </div>
                        
                    </div>
                </div>

                <div className="flex flex-col items-center justify-between mx-auto w-11/12 max-w-maxContent">
                    {/* first block with image*/}
                    <div className="mb-10 mt-[-100px] flex flex-col justify-between gap-7 lg:mt-20 md:flex-row lg:gap-0">
                        {/* Heading */}
                        <div className="text-4xl font-bold text-richblack-900 md:w-[45%]">
                            Get the skills you need for a
                            <HighlightText text={"job that is in demand."}></HighlightText>
                        </div>

                        {/* subheading and button */}
                        <div className="flex flex-col items-start justify-evenly md:w-[40%] gap-5">
                            <div className="text-[16px] ">
                                {/* subheading */}
                                The modern StudyNotion dictates its own terms.Today, to be a competitive specialist requires more than professional skills.
                            </div>
                            <CTAbutton active={true} linkTo={"/signup"}>
                                <div>
                                    Learn More
                                </div>
                            </CTAbutton>
                        </div>
                    </div>

                    <TimeLine/>

                    <LearningLanguage/>
                </div>
            </div>

            {/* Section 3 */}
            <div className="w-11/12 max-w-maxContent bg-richblack-900 text-white flex-col items-center justify-between mx-auto">

                <InstructorSection />

                <h2 className="text-center text-4xl font-semibold ">Review from other learners</h2>

                {/* Review Slider */}
                <ReviewSlider></ReviewSlider>
            </div>

            {/* Footer */}
            <Footer/>
                
        </div>
    )
}

export default Home;