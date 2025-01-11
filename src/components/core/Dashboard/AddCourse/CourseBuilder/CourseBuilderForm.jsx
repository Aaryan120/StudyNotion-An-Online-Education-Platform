import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import IconBtn from '../../../../common/IconBtn';
import { IoIosArrowForward } from 'react-icons/io';
import { MdAddCircleOutline } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux';
import { setCourse, setEditCourse, setStep } from '../../../../../slices/courseSlice';
import toast from 'react-hot-toast';
import { createSection, updateSection } from '../../../../../services/operations/CourseDetailsAPI';
import NestedView from './NestedView';
function CourseBuilderForm() {
    const {
        register,
        setValue,
        formState:{errors},
        handleSubmit,
    } = useForm();
    const [editSectionName,setEditSectionName] = useState(null);
    const {course} = useSelector((state) => state.course);
    const dispatch = useDispatch();
    const {token} = useSelector((state) =>state.auth);
    const [loading,setLoading] = useState(false);

    const cancelEdit = () =>{
        setEditSectionName(null);
        setValue("sectionName","");
    }

    const goBack = () =>{
        dispatch(setEditCourse(true));
        dispatch(setStep(1));
    }

    const goToNext = () =>{
        if(course?.courseContent.length === 0){
            toast.error("Please Enter Atleast 1 Section");
            return;
        }
        if(course?.courseContent.some((section) => section.subSection.length === 0)){
            toast.error("Please Enter at least 1 lecture in each section");
            return;
        }
        dispatch(setStep(3));
    }

    const onSubmit = async (data) =>{
        setLoading(true);
        let result = null;
        if(editSectionName){
            result = await updateSection(
                {
                    sectionName:data.sectionName,
                    sectionID:editSectionName,
                    courseId:course._id,
                },token
            )
        }
        else{
            result = await createSection(
                {
                    sectionName:data.sectionName,
                    courseId:course._id
                },token
            )
        }

        if(result){
            setEditSectionName(null);
            setValue("sectionName","");
            dispatch(setCourse(result));
        }

        setLoading(false);
    }

    const handleEditSectionName = (sectionId,sectionName) =>{
        if(editSectionName){
            cancelEdit();
            return;
        }

        setEditSectionName(sectionId);
        setValue("sectionName",sectionName);
    }

    return (
        <>  
            <div className='my-10 flex flex-col gap-y-7 bg-richblack-800 p-8 px-12 justify-between rounded-md border-[1px] border-richblack-700 text-richblack-5 '> 
                <div className='text-2xl font-semibold'>
                    Course Builder
                </div>
                <form onSubmit={handleSubmit(onSubmit)}>
                <label className='w-full'>
                    <p className="text-sm text-richblack-5">Section Name <sup className='text-pink-200'>*</sup></p>
                    <input 
                    name='sectionName'
                    placeholder='Add a section to build your course'
                    type="text" 
                    {...register("sectionName",{required:true})}
                    className="font-medium  bg-richblack-500 rounded-[0.5rem] mt-[3px] w-full p-[12px] shadow-[0px_2px] shadow-richblack-300 focus:outline-none"/>
                    {
                        errors.sectionName && <span>
                            Section Name is Required
                        </span>
                    }
                </label>
                <div className='mt-5 flex items-end gap-x-5'>
                    <div className='text-yellow-50 flex border-[1px] max-w-maxContent border-yellow-50 rounded-md p-3 items-center gap-x-2 cursor-pointer'>
                        <IconBtn 
                        type="Submit"
                        text={editSectionName ? "Edit Section Name" : "Create Section"}
                        outline={true}
                        >

                        </IconBtn>
                        <MdAddCircleOutline />
                    </div>
                    {
                        editSectionName && (<div>
                            <button className='text-richblack-500 underline'
                            onClick={cancelEdit}>
                                Cancel Edit
                            </button>
                        </div>)
                    }
                </div>
                </form>

                {
                    course?.courseContent?.length > 0 && (
                        <NestedView handleEditSectionName={handleEditSectionName}></NestedView>
                    )
                }

                <div className='flex justify-end gap-x-6'>
                    <button 
                    onClick={goBack}
                    className='bg-pure-greys-400 rounded-md py-[8px] px-[12px] text-black'
                    >
                        Back
                    </button>
                    <div className='flex items-center justify-center bg-yellow-50 text-richblack-900 py-[8px] px-[12px]  rounded-md'>
                    <IconBtn text="Next" onClick={goToNext}>
                    </IconBtn>
                    <IoIosArrowForward className='ml-1'/>
                    </div>
                    
                </div>
            </div>
            
        </>
    )
}

export default CourseBuilderForm