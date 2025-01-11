import React from 'react'
import { AiOutlineDown } from 'react-icons/ai'
import CourseSubSectionAccordion from './CourseSubSectionAccordion'
function CourseAccordionBar({section,isActive,handleIsActive}) {
    
    return (
        <div className='overflow-hidden border border-solid border-richblack-600 bg-richblack-700 text-richblack-5 last:mb-0'>
            <div
            className='flex cursor-pointer items-start justify-between bg-opacity-20 px-7 py-6 transition-[0.3s] '
            onClick={() => handleIsActive(section._id)}>
                <div className='flex items-center gap-2'>
                    <i className={`${isActive.includes(section._id) ? "rotate-180" : "rotate-0"}`}>
                        <AiOutlineDown/>
                    </i>
                    <span>{section.sectionName}</span>
                </div>
                <div>
                    <span className='text-yellow-25'>
                        {section.subSection.length || 0} lecture(s)
                    </span>
                </div>
            </div>
            <div>
                {
                    isActive.includes(section._id) && <CourseSubSectionAccordion subSection={section?.subSection} />
                }
            </div>
        </div>
    )
}

export default CourseAccordionBar