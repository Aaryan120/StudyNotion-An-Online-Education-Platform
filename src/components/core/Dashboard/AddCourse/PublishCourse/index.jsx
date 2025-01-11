import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { resetCourseState, setStep } from '../../../../../slices/courseSlice';
import IconBtn from '../../../../common/IconBtn';
import { COURSE_STATUS } from '../../../../../utils/constants';
import { editCourseDetails } from '../../../../../services/operations/CourseDetailsAPI';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
function PublishCourse() {
    const {
        register,
        handleSubmit,
        setValue,
        getValues,
    } = useForm()
    const [loading,setLoading] = useState(false);
    const {token} = useSelector((state) =>state.auth);
    const {course} = useSelector((state) =>state.course);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const goBack = () =>{
        dispatch(setStep(2));
    }
    useEffect(() => {
        if (course?.status === COURSE_STATUS.PUBLISHED) {
          setValue("public", true)
        }
    }, [])
    
    const goToCourses = () =>{
        dispatch(resetCourseState());
        navigate("/dashboard/my-courses")
    }
    const handlePublishCourse = async () =>{
        if(
            (course?.status === COURSE_STATUS.PUBLISHED && getValues("public") === true) ||
            (course?.status === COURSE_STATUS.DRAFT && getValues("public") === false)
        ){
            goToCourses();
            return;
        }

        const formData = new FormData();
        formData.append("courseId",course._id);
        const currentValues = getValues("public") ? COURSE_STATUS.PUBLISHED : COURSE_STATUS.DRAFT;
        formData.append("status",currentValues);
        setLoading(true);
        const result = await editCourseDetails(formData,token);
        if(result){
            goToCourses()
        }
        setLoading(false);
    }

    const onSubmit = (data) =>{
        handlePublishCourse()
    }
    return (
        <div>
            <div className='my-10 flex flex-col gap-y-7 bg-richblack-800 p-8 px-12 justify-between rounded-md border-[1px] border-richblack-700 text-richblack-5 '>
                <p className='text-xl font-semibold'>Publish Settings</p>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <label className='flex items-center text-md gap-x-4'>
                            <input 
                            name="public"
                            type="checkbox" 
                            className='border-gray-300 h-4 w-4 rounded bg-richblack-500 text-richblack-400 focus:ring-2 focus:ring-richblack-500'
                            {...register("public")}
                            />
                            <p>Make this course as public</p>
                        </label>
                    </div>
                    <div className='flex gap-x-6 justify-end mt-8'>
                        <button 
                        disabled={loading}
                        type='button'
                        onClick={goBack}
                        className='bg-pure-greys-400 rounded-md py-[8px] px-[12px] text-black'>
                            Back
                        </button>
                        <div className='flex items-center justify-center bg-yellow-50 text-richblack-900 py-[8px] px-[12px]  rounded-md'>
                            <IconBtn 
                            type="submit"
                            text="Save Changes"
                            disabled={loading}/>
                        </div>
                        
                    </div>
                </form>
            </div>
        </div>
    )
}

export default PublishCourse;