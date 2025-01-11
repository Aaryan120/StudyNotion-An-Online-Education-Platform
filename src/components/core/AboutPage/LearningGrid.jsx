import react from "react"
import HighlightText from "../HomePage/HighlightText"
import CTAbutton from "../HomePage/Button"
const LearningGridData = [
    {
        order: -1,
        heading:"World-Class Learning for",
        highlightText : "Anyone, Anywhere",
        description:"Studynotion partners with more than 275+ leading universities and companies to bring flexible, affordable, job-relevant online learning to individuals and organizations worldwide.",
        BtnText:"Learn More",
        btnLink:"/"
    },
    {
        order: 1,
        heading:"Curriculum Based on Industry Needs",
        description:"Save time and money! The Belajar curriculum is made to be easier to understand and in line with industry needs.",
    },
    {
        order: 2,
        heading:"Our Learning Methods",
        description:"Studynotion partners with more than 275+ leading universities and companies to bring",
    },
    {
        order: 3,
        heading:"Certification",
        description:"Studynotion partners with more than 275+ leading universities and companies to bring",
    },
    {
        order: 4,
        heading:`Rating "Auto-grading"`,
        description:"Studynotion partners with more than 275+ leading universities and companies to bring",
    },
    {
        order: 5,
        heading:"Ready to Work",
        description:"Studynotion partners with more than 275+ leading universities and companies to bring",
    },
]

const LearningGrid = () =>{
    return (
        <div className="w-11/12 max-w-maxContent flex flex-col justify-between gap-10 items-center mx-auto text-white">
            <div className="mt-20 grid mx-auto grid-col-1 mb-10 lg:grid-cols-4">
                {
                    LearningGridData.map((element,index) =>{
                        return (
                            <div
                            className={
                                `${index === 0 && "lg:col-span-2 lg:h-[250px]"}
                                ${element.order&1 === 1 && element.order !== -1? "bg-richblack-700 lg:h-[250px]" : "bg-richblack-800 lg:h-[250px]"}
                                ${element.order === 3 && "lg:col-start-2"}
                                ${element.order === -1 && "bg-richblack-900"}
                                `}
                            key={index}>
                                {
                                    element.order < 0 ?
                                    (<div className="lg:w-[90%] flex flex-col pb-5 gap-3">
                                        <div className="text-4xl font-semibold">
                                            <h1>{element.heading}</h1>
                                            <HighlightText text={element.highlightText}/>
                                        </div>
                                        
                                        <p className="font-medium text-base text-richblack-300">{element.description}</p>
                                        <div className="w-fit mt-4">
                                            <CTAbutton active={true} linkTo={element.btnLink}>
                                                {element.BtnText}
                                            </CTAbutton>
                                        </div>
                                        
                                    </div>) : 
                                    (<div className="p-7">
                                        <h1 className="text-lg font-medium">{element.heading}</h1>
                                        <p className="text-richblack-300 text-base font-medium mt-5">{element.description}</p>
                                    </div>)
                                }
                            </div>
                        )
                    })
                }
            </div>
        </div>
       
    )
}

export default LearningGrid;