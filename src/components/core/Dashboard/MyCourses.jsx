import React, { useEffect, useState } from 'react'
import IconBtn from '../../common/IconBtn';
import { useSelector } from 'react-redux';
import { FaPlus } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import CoursesTable from './InstructorCourses/CoursesTable';
import {fetchInstructorCourses} from "../../../services/operations/CourseDetailsAPI"
function MyCourses() {

    const {token} = useSelector((state) => state.auth);
    const navigate = useNavigate()
    const [loading,setLoading] = useState(false);
    const [courses,setCourses] = useState([]);
    useEffect(() =>{
        
        const fetchCourses = async () =>{
            setLoading(true);
            const result = await fetchInstructorCourses(token);
            if(result){
                setCourses(result);
            }
            setLoading(false);
        }
        fetchCourses();
        
    }
    ,[])

    return (
        <>
            {
                loading ? 
                (
                    <div className='h-100vh w-100vw flex items-center justify-center my-auto'>
                        <div className='spinner'></div>
                    </div>
                ) 
                : (
                    <div className='mb-4'>
                        <div className='flex mb-14 flex-row items-center justify-between '>
                        <h1 className=' text-richblack-5 text-3xl font-medium'>My Courses</h1>
                        <div className='cursor-pointer flex items-center gap-x-2 rounded-md bg-yellow-50 text-black py-[8px] px-[12px]'>
                            <IconBtn 
                            text="Add Course"
                            onClick={() =>navigate("/dashboard/add-course")}/>
                            <FaPlus />
                        </div>
                        </div>
                        {courses.length > 0 && <CoursesTable courses={courses} setCourses={setCourses}/>}
                    </div>
                    
                )
            }
            
        </>
    )
}

export default MyCourses