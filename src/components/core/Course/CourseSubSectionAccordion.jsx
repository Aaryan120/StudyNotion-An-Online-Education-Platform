import React from 'react'
import { IoVideocamOutline } from "react-icons/io5";

function CourseSubSectionAccordion({subSection}) {
  return (
    <div className='bg-richblack-900 text-richblack-5 flex flex-col gap-2 font-semibold'>
        <div>
            {
                subSection.map((item,index) =>{
                    return (
                        <div key={index} className='flex items-center gap-2 px-7 py-8'>
                            <IoVideocamOutline/>
                            <span>
                                {item.title}
                            </span>
                        </div>
                    )
                })
            }
        </div>
    </div>
  )
}

export default CourseSubSectionAccordion