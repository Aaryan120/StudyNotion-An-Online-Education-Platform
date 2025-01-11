import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import RenderSteps from '../AddCourse/RenderSteps';
import { useLocation } from 'react-router-dom';
import {useState} from "react"
import { setCourse, setEditCourse } from '../../../../slices/courseSlice';
import { useEffect } from 'react';
import { getFullCourseDetail } from '../../../../services/operations/CourseDetailsAPI';
function EditCourse() {
    const location = useLocation();
    const dispatch = useDispatch();
    const courseId = location.pathname.split('/').at(-1);
    const {course} = useSelector((state) =>state.course);
    const [loading,setLoading] = useState(false);
    const {token} = useSelector((state) => state.auth);

    useEffect(() =>{
        
        const completeCourseDetail = async() =>{
            setLoading(true);
            const result = await getFullCourseDetail(courseId,token);
            const courseDetails = result.courseDetails;
            if(courseDetails){
                dispatch(setEditCourse(true));
                dispatch(setCourse(courseDetails));
            }

            setLoading(false);

        }
        completeCourseDetail();
    },[])

    if(loading){
        return <div className='h-100vh w-100vw flex items-center justify-center my-auto'>
            <div className='spinner'></div>
        </div>
    }
    return (
        <div className="mx-auto w-10/12 max-w-maxContent">
            <div className='flex  flex-col'>
                <h1 className='mb-14 text-richblack-5 text-3xl font-medium'>Edit Course</h1>
                <div>
                    {course ? (<RenderSteps/>) : (<p>Course Not Found</p>)}
                </div>
            </div>
        </div>
    )
}

export default EditCourse;