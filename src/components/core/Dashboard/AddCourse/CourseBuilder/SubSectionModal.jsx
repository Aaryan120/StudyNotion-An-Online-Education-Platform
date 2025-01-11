import React from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast';
import { setCourse } from '../../../../../slices/courseSlice';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createSubSection } from '../../../../../services/operations/CourseDetailsAPI';
import { updateSubSection } from '../../../../../services/operations/CourseDetailsAPI';
import { RxCross2 } from "react-icons/rx";
import Upload from '../Upload';
import IconBtn from '../../../../common/IconBtn';



function SubSectionModal({
    modalData,
    setModalData,
    view = false,
    add = false,
    edit = false
}) {
    const {
        register,
        handleSubmit,
        setValue,
        formState:{errors},
        getValues
    } = useForm();
    const [loading,setLoading] = useState(false);
    const {token} = useSelector((state) =>state.auth);
    const {course} = useSelector((state) =>state.course);
    const dispatch = useDispatch();

    const isFormUpdated = () =>{
        const currentValues = getValues();

        if(
            currentValues.lectureTitle !== modalData.title ||
            currentValues.lectureDescription !== modalData.description || 
            currentValues.lectureVideo !== modalData.videoURL
        ){
            return true;
        }
        else{
            return false;
        }
    }

    const handleEditSubSection = async () =>{
        
        const currentValues = getValues();
        const formData = new FormData();
        formData.append("sectionID",modalData.sectionId)
        formData.append("subSectionID",modalData._id);
        if(currentValues.lectureTitle !== modalData.title){
            formData.append("title",currentValues.lectureTitle);
        }
        if(currentValues.lectureDescription !== modalData.description){
            formData.append("description",currentValues.lectureDescription);
        }
        if(currentValues.lectureVideo !== modalData.videoURL){
            formData.append("videoFile",currentValues.lectureVideo);
        }
        setLoading(true);
        const result = await updateSubSection(formData,token);
        

        if(result){
            const updatedSection = course?.courseContent.map((section) => section._id === modalData.sectionId ? result : section);
            const updatedCourse = {...course,courseContent: updatedSection }
            dispatch(setCourse(updatedCourse));
        }

        setModalData(null);
        setLoading(false);
    }
    const onSubmit = async (data) =>{
        
        if(view){
            return;
        }

        if(edit){
            if(!isFormUpdated()){
                toast.error("No changes made to the form");
            }
            else{
                handleEditSubSection();
            }
            return;
        }
        setLoading(true);
        const formData = new FormData();
        formData.append("sectionID",modalData);
        formData.append("title",data.lectureTitle);
        formData.append("description",data.lectureDescription);
        formData.append("videoFile",data.lectureVideo);

        const result = await createSubSection(formData,token);

        if(result){
            const updatedSection = course?.courseContent.map((section) => section._id === modalData ? result : section);
            const updatedCourse = {...course,courseContent: updatedSection }
            dispatch(setCourse(updatedCourse));
        }

        setModalData(null);
        setLoading(true);


    }
    return (
        <div className='fixed inset-0 !mt-0 grid h-screen w-screen place-items-center z-100 overflow-auto bg-opacity-10 backdrop-blur-sm bg-white'>
            <div className='my-10 w-11/12 max-w-[700px] rounded-lg border border-richblack-400 bg-richblack-800'>
                <div className='flex items-center justify-between rounded-t-lg bg-richblack-700 p-5'>
                    <p className='text-xl font-semibold text-richblack-5'>{view && "Viewing"} {add && "Adding"} {edit && "Editing"} Lecture</p>
                    <button 
                    className='text-xl font-semibold'
                    onClick={() =>setModalData(null)}>
                    <RxCross2 />
                    </button>
                </div>
                <div>
                    <form onSubmit={handleSubmit(onSubmit)} className='space-y-8 px-8 py-10'>
                        <div>
                            <Upload
                            label={"Lecture Video"}
                            name={"lectureVideo"}
                            register={register}
                            setValue={setValue}
                            getValues={getValues}
                            errors={errors}
                            video={true}
                            editData={edit ? modalData.videoURL : null}
                            viewData={view ? modalData.videoURL : null}
                            ></Upload>
                        </div>
                        <div >
                            <label className='w-full'>
                                <p className="text-sm text-richblack-5">Lecture Title {!view && <sup className='text-pink-200'>*</sup>}</p>
                                <input 
                                name='lectureTitle'
                                disabled={view || loading}
                                type="text" 
                                placeholder="Enter Lecture Title"
                                defaultValue={(view || edit) ? (modalData.title) : null }
                                {...register("lectureTitle",{required:true})}
                                className="font-medium  bg-richblack-500 rounded-[0.5rem] mt-[3px] w-full p-[12px] shadow-[0px_2px] shadow-richblack-300 focus:outline-none"
                                />
                                {
                                    errors.lectureTitle && <span>
                                        Lecture Title is Required
                                    </span>
                                }
                            </label>
                        </div>
                        <div>
                            <label className='w-full'>
                                <p className="text-sm text-richblack-5">Lecture Description {!view && <sup className='text-pink-200'>*</sup>}</p>
                                <textarea 
                                name='lectureDescription'
                                disabled={view || loading}
                                type="text" 
                                placeholder="Enter Lecture Description"
                                defaultValue={(view || edit) ? (modalData.description) : null }
                                className="font-medium  bg-richblack-500 rounded-[0.5rem] mt-[3px] w-full p-[12px] shadow-[0px_2px] shadow-richblack-300 focus:outline-none min-h-[140px]"
                                {...register("lectureDescription",{required:true})}
                                />
                                {
                                    errors.lectureDescription && <span>
                                        Lecture Description is Required
                                    </span>
                                }
                            </label>
                        </div>
                        
                        {
                            (edit || add) && (
                                <div className='flex justify-end'>
                                    <div className='bg-yellow-50 text-black rounded-md py-[8px] px-[12px] '>
                                        <IconBtn
                                        text={loading ? "Loading..." : edit ? "Save Changes" : "Save" }
                                        type='submit'>
                                            
                                        </IconBtn>
                                    </div>
                                    
                                </div>
                                
                            )
                        }
                    </form>
                    
                </div>
            </div>
        </div>
    )
}

export default SubSectionModal