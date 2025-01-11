import react from "react";

const Stats = [
    {count: "5K", label:"Active Students"},
    {count: "10+", label:"Mentors"},
    {count: "200+", label:"Courses"},
    {count: "50+", label:"Awards"},
]
const StatsComponent = () =>{
    return (
        <section className="bg-richblack-800 text-white">
            <div className="flex flex-col gap-10 justify-between w-11/12 max-w-maxContent mx-auto text-center">
                <div className="grid grid-cols-2 md:grid-cols-4 text-center">
                    {
                        Stats.map((element,index) =>{
                            return (
                                <div 
                                className="flex flex-col py-10"
                                key={index}>
                                    <h1 className="text-xl lg:text-4xl font-semibold">
                                        {element.count}
                                    </h1>
                                    <h2 className="font-semibold text-richblack-500">
                                        {element.label}
                                    </h2>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </section>
    )
}


export default StatsComponent;