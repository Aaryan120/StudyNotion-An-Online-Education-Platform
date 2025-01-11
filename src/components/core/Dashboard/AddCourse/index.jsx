import React from 'react'
import RenderSteps from './RenderSteps'
function AddCourse() {
  return (
    <>
        <div className='text-white flex items-start justify-between gap-x-10 w-full'>
            <div className='w-11/12 max-w-maxContent overflow-x-hidden mx-auto'>
                <div className='flex flex-1 flex-col '>
                <h1 className='mb-14 text-richblack-5 text-3xl font-medium'>Add Course</h1>
                <div>
                    <RenderSteps>
                    </RenderSteps>
                </div>
            </div>
            </div>
            
            <div className='hidden md:flex'>
                <div className=' max-w-[400px] flex-1 border-richblack-700 border-[1px] bg-richblack-800 rounded-md px-8 py-5'>
                <p className='mb-5 text-left font-medium '>⚡Course Upload Tips</p>
                <ul className='ml-5 space-y-2 list-inside list-disc text-xs leading-5 text-left'>
                    <li>Set the Course Price option or make it free.</li>
                    <li>Standard size for the course thumbnail is 1024x576.</li>
                    <li>Video section controls the course overview video.</li>
                    <li>Course Builder is where you create & organize a course.</li>
                    <li>Add Topics in the Course Builder section to create lessons, quizzes, and assignments.</li>
                    <li>Information from the Additional Data section shows up on the course single page.</li>
                    <li>Make Announcements to notify any important</li>
                    <li>Notes to all enrolled students at once.</li>
                </ul>
            </div>
            </div>
            
        </div>
    </>
  )
}

export default AddCourse