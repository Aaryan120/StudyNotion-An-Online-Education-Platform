import React from 'react'
import { useForm } from 'react-hook-form';
import { RxCross2 } from 'react-icons/rx'
import { useSelector } from 'react-redux'
import ReactStars from 'react-stars';
import { useEffect } from 'react';
import IconBtn from '../../common/IconBtn';
import { createRating } from '../../../services/operations/CourseDetailsAPI';
import { useParams } from 'react-router-dom';
function CourseReviewModal({setReviewModal}) {
  const {user} = useSelector((state) => state.profile);
  const {token} = useSelector((state) => state.auth);
  const {
    register,
    setValue,
    handleSubmit,
    formState:{errors},
    getValues
  } = useForm();

  useEffect(() =>{
    setValue("courseExperience","");
    setValue("courseRating",0)
  },[])

  const {courseId} = useParams();
  const ratingChanged = (newRating) =>{
    setValue("courseRating",newRating);
  }
  const onSubmit =async () =>{
    const currentValues = getValues();
    const formData = new FormData();
    formData.append("courseID",courseId);
    formData.append("rating",currentValues.courseRating);
    formData.append("review",currentValues.courseExperience);
    await createRating(formData,token);
    setReviewModal(false);
  }


  return (
    <div className='fixed inset-0 !mt-0 grid h-screen text-white w-screen place-items-center z-100 overflow-auto bg-opacity-10 backdrop-blur-sm bg-white'>
      <div className='my-10 w-11/12 max-w-[700px] rounded-lg border border-richblack-400 bg-richblack-800'>
          <div className='flex items-center justify-between rounded-t-lg bg-richblack-700 p-5'>
              <p className='text-xl font-semibold text-richblack-5'>Add Review</p>
              <button 
              className='text-xl font-semibold text-richblack-300'
              onClick={() =>setReviewModal(false)}>
              <RxCross2 />
              </button>
          </div>
          <div className='mt-5 flex flex-col px-8 mb-4'>
            <div>
              <div className='flex gap-2 items-center justify-center'>
                <img src={user?.imageUrl} alt="userImage" className='h-[40px] rounded-full object-cover aspect-square'/>
                <div>
                  <p className='text-md font-medium'>{user?.firstName} {user?.lastName}</p>
                  <p className='text-sm text-richblack-300'>Posting Publicly</p>
                </div>
              </div>
              <form  onSubmit={handleSubmit(onSubmit)}>

                <div className='flex items-center justify-center'>
                  <ReactStars
                className="mb-2 mt-3"
                count={5}
                onChange={ratingChanged}
                size={24}
                acitveColor="ffd700"/>
                </div>
                

                
                <div>
                  <label className='w-full'>
                    <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">Add Your Experience <sup className='text-pink-200'>*</sup></p>
                    <textarea 
                    placeholder='Add Your Experience here'
                    name="courseExperience" 
                    {...register("courseExperience",{required:true})}
                    className="font-medium  bg-richblack-500 rounded-[0.5rem] mt-[3px] w-full p-[12px] shadow-[0px_2px] shadow-richblack-300 focus:outline-none min-h-[140px]">
                    </textarea>
                    {
                      errors.courseExperience && <span>
                        Please Add Your Experience
                      </span>
                    }
                  </label>
                </div>
                <div className='flex justify-end gap-x-4'>
                        <button 
                        onClick={() => setReviewModal(false)}
                        className="mt-6 rounded-[8px] bg-pure-greys-400 font-medium py-[8px] px-[12px]  text-richblack-900">
                            Cancel
                        </button>

                        <div className="bg-yellow-50 px-5 py-1  mt-6 rounded-md flex  text-black font-medium cursor-pointer ">
                          <button 
                          type='submit'>
                            Save
                          </button>
                        </div>
                    </div>
              </form>
            </div>
          </div>
        </div>
    </div>
  )
}

export default CourseReviewModal