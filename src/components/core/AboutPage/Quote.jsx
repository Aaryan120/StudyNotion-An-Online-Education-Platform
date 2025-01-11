import react from "react";
import HighlightText from "../HomePage/HighlightText";
import { BiSolidQuoteLeft, BiSolidQuoteRight } from "react-icons/bi";
const Quote = () =>{
    return (
        <div className="text-xl md:text-4xl text-center font-semibold mx-auto py-5 pb-20 px-10">
            <p>{/*<sup><BiSolidQuoteLeft/></sup> */}We are passionate about revolutionizing the way we learn. Our innovative platform
           <HighlightText text={"combines technology,"}/>
           <span className="bg-gradient-to-b from-[#FF512F] to-[#F09819] text-transparent bg-clip-text font-bold">
                {" "}
                expertise,
                {" "} 
           </span >
            and community to create an
            <span className="bg-gradient-to-b from-[#E65C00] to-[#F9D423] text-transparent bg-clip-text font-bold">
                {" "}
                unparalleled education experience.
            </span></p>
        </div>
    )
}

export default Quote;