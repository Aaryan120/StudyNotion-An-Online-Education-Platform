import react from "react";
import image1 from "../assets/Images/aboutus1.webp"
import image2 from "../assets/Images/aboutus2.webp"
import image3 from "../assets/Images/aboutus3.webp"
import foundStory from "../assets/Images/FoundingStory.png"
import HighlightText from "../components/core/HomePage/HighlightText";
import Quote from "../components/core/AboutPage/Quote";
import StatsComponent from "../components/core/AboutPage/Stats";
import LearningGrid from "../components/core/AboutPage/LearningGrid";
import { BiSolidQuoteLeft, BiSolidQuoteRight } from "react-icons/bi";
import ContactFormSection from "../components/core/AboutPage/ContactFormSection";
import ReviewSlider from "../components/common/ReviewSlider";
import Footer from "../components/common/Footer";


const AboutUs = ()=>{
    return(
        <div>
            {/* Section 1 */}
            <section className="bg-richblack-800">
                <div className="relative mx-auto flex w-11/12 max-w-maxContent flex-col justify-between gap-10 text-center text-white">
                <header className="mx-auto py-20 text-4xl font-semibold lg:w-[70%]">
                    Driving Innovation in Online Education for a
                    <HighlightText text={"Brighter Future"} />
                    <p className="mx-auto mt-3 text-center text-base font-medium text-richblack-300 lg:w-[95%]">
                    Studynotion is at the forefront of driving innovation in online
                    education. We're passionate about creating a brighter future by
                    offering cutting-edge courses, leveraging emerging technologies,
                    and nurturing a vibrant learning community.
                    </p>
                </header>
                <div className="sm:h-[70px] lg:h-[150px]"></div>
                <div className="absolute bottom-0 left-[50%] grid w-[100%] translate-x-[-50%] translate-y-[30%] grid-cols-3 gap-3 lg:gap-5 ">
                    <img src={image1} alt="" />
                    <img src={image2} alt="" className="shadow-[0_-20px_50px] shadow-brown-500"/>
                    <img src={image3} alt="" />
                </div>
                </div>
            </section>

            {/* Section 2 */}

            <section className="border-b border-richblack-700 mt-32">
                <div className="mx-auto flex w-11/12 max-w-maxContent text-center text-richblack-100 gap-10 flex-col justify-between">
                    <Quote/>
                </div>
            </section>

            {/* Section 3 */}

            <section>
                <div className="mx-auto flex w-11/12 max-w-maxContent flex-col justify-between gap-1 text-richblack-500">
                    {/* foundStory wala div */}
                    <div className="flex flex-col lg:flex-row items-center justify-between gap-10">
                        {/* Founding story left box */}
                        <div className="my-24 flex lg:w-[50%] flex-col gap-10">
                            <h1 className="bg-gradient-to-br from-[#833AB4] via-[#FD1D1D] to-[#FCB045] bg-clip-text text-4xl font-semibold text-transparent lg:w-[70%]" >Our Founding Story</h1>
                            <p className="text-base font-medium text-richblack-300 lg:w-[95%]">Our e-learning platform was born out of a shared vision and passion for transforming education. It all began with a group of educators, technologists, and lifelong learners who recognized the need for accessible, flexible, and high-quality learning opportunities in a rapidly evolving digital world.</p>
                            <p className="text-base font-medium text-richblack-300 lg:w-[95%]">As experienced educators ourselves, we witnessed firsthand the limitations and challenges of traditional education systems. We believed that education should not be confined to the walls of a classroom or restricted by geographical boundaries. We envisioned a platform that could bridge these gaps and empower individuals from all walks of life to unlock their full potential.</p>
                        </div>
                        {/* Founding story right box */}
                        <div className="mt-3">
                            <img src={foundStory} alt="foundingImage" className="shadow-[0_0_20px_0] shadow-[#FC6767]"/>
                        </div>
                    </div>
                    {/* Vision box */}
                    <div className="flex flex-col lg:flex-row lg:gap-10 items-center justify-between ">
                        {/* Our vision box */}
                        <div className="mx-5 my-24 flex lg:w-[40%] flex-col gap-10">
                            <h1 className="bg-gradient-to-b from-[#FF512F] to-[#F09819] bg-clip-text text-4xl font-semibold text-transparent lg:w-[70%] ">Our Vision</h1>
                            <p className="text-base font-medium text-richblack-300 lg:w-[95%]">With this vision in mind, we set out on a journey to create an e-learning platform that would revolutionize the way people learn. Our team of dedicated experts worked tirelessly to develop a robust and intuitive platform that combines cutting-edge technology with engaging content, fostering a dynamic and interactive learning experience.</p>
                        </div>
                        {/* Our mission box */}
                        <div className="mx-5 my-24 flex lg:w-[40%] flex-col gap-10">
                            <h1 className="bg-gradient-to-b from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB] text-transparent bg-clip-text text-4xl font-semibold lg:w-[70%]">Our Mission</h1>
                            <p className="text-base font-medium text-richblack-300 lg:w-[95%]">our mission goes beyond just delivering courses online. We wanted to create a vibrant community of learners, where individuals can connect, collaborate, and learn from one another. We believe that knowledge thrives in an environment of sharing and dialogue, and we foster this spirit of collaboration through forums, live sessions, and networking opportunities.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Section 4 */}
            
            <StatsComponent/>

            {/* Section 5 */}

            <section>
                <LearningGrid/>
            </section>


            {/* Section 6 */}
            

            <section>

            </section>


            {/* Section 7 */}
            
            <section>
                <ContactFormSection/>
            </section>

            {/* Review Slider */}
            <div className="w-11/12 max-w-maxContent bg-richblack-900 text-white flex-col items-center justify-between mx-auto">
                <h1 className="text-center text-4xl font-semibold ">Review from Other Learners</h1>
            <ReviewSlider/>
            </div>
            
            {/* Footer */}
            <Footer/>
        </div>
    )
}


export default AboutUs