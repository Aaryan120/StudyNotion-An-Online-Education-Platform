import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux';
import { fetchCourseCategories } from '../../../../../services/operations/CourseDetailsAPI';
import { RiMoneyRupeeCircleLine } from "react-icons/ri";
import RequirementField from './RequirementField';
import IconBtn from '../../../../common/IconBtn';
import { editCourseDetails } from '../../../../../services/operations/CourseDetailsAPI';
import toast from 'react-hot-toast';
import { addCourseDetails } from '../../../../../services/operations/CourseDetailsAPI';
import { COURSE_STATUS } from '../../../../../utils/constants';
import ChipInput from './ChipInput';
import Upload from '../Upload';
import { setCourse, setStep } from "../../../../../slices/courseSlice"
function CourseInformationForm() {


    const {
        register,
        handleSubmit,
        setValue,
        getValues,
        formState:{errors},
    } = useForm();
    const dispatch = useDispatch();
    const {token} = useSelector((state) => state.auth);
    const {course,editCourse} = useSelector((state) => state.course);
    const [loading,setLoading] = useState(false);
    const [courseCategories,setCourseCategories] = useState([]);
    const {step} = useSelector((state) => state.course);

    

    useEffect(() =>{

        
        const getCategories = async () =>{
            setLoading(true);
            const allCategories = await fetchCourseCategories();
            if(allCategories.length > 0){
                setCourseCategories(allCategories);
            }
            setLoading(false)
        }

        if (editCourse) {
            setValue("courseTitle", course.courseName)
            setValue("courseShortDesc", course.courseDescription)
            setValue("coursePrice", course.price)
            setValue("courseTags", course.tag)
            setValue("courseBenefits", course.whatYouWillLearn)
            setValue("courseCategory", course.category)
            setValue("courseRequirements", course.instructions)
            setValue("courseImage", course.thumbnail)
        }


        getCategories();

        
    },[])


    const isFormUpdated = () =>{
        const currentValues = getValues();
        if(
            currentValues.courseTitle !== course.courseName ||
            currentValues.courseShortDesc !== course.courseDescription ||
            currentValues.coursePrice !== course.price ||
            currentValues.courseTags.toString() !== course.tag.toString() ||
            currentValues.courseBenefits !== course.whatYouWillLearn ||
            currentValues.courseCategory !== course.category._id ||
            currentValues.courseRequirements.toString() !== course.instructions.toString() ||
            currentValues.courseImage !== course.thumbnail 
        ){
            return true;
        }
        else{
            return false;
        }
    }


    const onSubmit = async(data) =>{
        if(editCourse){
            if(isFormUpdated()){
                const currentValues = getValues();
                const formData = new FormData();
                formData.append("courseId",course._id);
                if(currentValues.courseTitle !== course.courseName){
                    formData.append("courseName",data.courseTitle);
                }
                if(currentValues.courseShortDesc !== course.courseDescription){
                    formData.append("courseDescription",data.courseShortDesc);
                }
                if(currentValues.coursePrice !== course.price){
                    formData.append("price",data.coursePrice);
                }
                if(currentValues.courseTags.toString() !== course.tag.toString()){
                    formData.append("tag",JSON.stringify(data.courseTags));
                }
                if(currentValues.courseBenefits !== course.whatYouWillLearn){
                    formData.append("whatYouWillLearn",data.courseBenefits);
                }
                if(currentValues.courseCategory._id !== course.category._id){
                    formData.append("category",data.courseCategory);
                }
                if(currentValues.courseRequirements.toString() !== course.instructions.toString()){
                    formData.append("instructions",JSON.stringify(data.courseRequirements));
                }
                if(currentValues.courseImage !== course.thumbnail){
                    formData.append("thumbnailImage",data.courseImage);
                }

                setLoading(true);

                const result = await editCourseDetails(formData,token);
                setLoading(false);
                if(result){
                    dispatch(setStep(2));
                    dispatch(setCourse(result));
                }
                return;
            }  
            else{
                toast.error("No Changes made to the form");
            }
            return;
        }
        // Create a new course
        const formData = new FormData();
        formData.append("courseName",data.courseTitle);
        formData.append("courseDescription",data.courseShortDesc);
        formData.append("price",data.coursePrice);
        formData.append("tag",JSON.stringify(data.courseTags));
        formData.append("whatYouWillLearn",data.courseBenefits);
        formData.append("category",data.courseCategory);
        formData.append("instructions",JSON.stringify(data.courseRequirements));
        formData.append("status",COURSE_STATUS.DRAFT);
        formData.append("thumbnailImage",data.courseImage);
        setLoading(true);
        const result = await addCourseDetails(formData,token);

        if(result){
            dispatch(setStep(2))
            dispatch(setCourse(result));
        }
        setLoading(false);
    }
    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)} className='text-white'>
                <div className='my-10 flex flex-col gap-y-7 bg-richblack-800 p-8 px-12 justify-between rounded-md border-[1px] border-richblack-700 text-richblack-5 '> 
                    <div>
                        {/* course title */}
                        <label className="w-full">
                            <p className="text-sm text-richblack-5">Course Title <sup className='text-pink-200'>*</sup></p>
                            <input 
                            name="courseTitle"
                            placeholder="Enter Course Title"
                            type="text"
                            {...register("courseTitle",{required:true})}
                            className="font-medium  bg-richblack-500 rounded-[0.5rem] mt-[3px] w-full p-[12px] shadow-[0px_2px] shadow-richblack-300 focus:outline-none" />
                            {
                                errors.courseTitle && <span>
                                    Please enter Course Title
                                </span>
                            }
                        </label>
                    </div>
                    <div>
                        {/* Course Description */}
                        <label className="w-full">
                            <p className="text-sm text-richblack-5">Course Short Description <sup className='text-pink-200'>*</sup></p>
                            <textarea 
                            name="courseShortDesc"
                            placeholder="Enter Description"
                            type="text"
                            {...register("courseShortDesc",{required:true})}
                            className="font-medium  bg-richblack-500 rounded-[0.5rem] mt-[3px] w-full p-[12px] shadow-[0px_2px] shadow-richblack-300 focus:outline-none min-h-[140px]" />
                            {
                                errors.courseShortDesc && <span>
                                    Please enter Description
                                </span>
                            }
                        </label>
                    </div>
                    <div className='relative'>
                        {/* Course Price */}
                        <label className="w-full ">
                            <p className="text-sm text-richblack-5">Price <sup className='text-pink-200'>*</sup></p>
                            <input 
                            name="coursePrice"
                            placeholder="Enter Price"
                            type="number"
                            min={0}
                            max={50000}
                            {...register("coursePrice",{required:true})}
                            className="font-medium  bg-richblack-500 rounded-[0.5rem] mt-[3px] w-full p-[12px] shadow-[0px_2px] shadow-richblack-300 focus:outline-none pl-9" />
                            <span className='absolute left-2 top-[48%]'><RiMoneyRupeeCircleLine className='text-2xl opacity-50 text-richblack-800'/></span>
                        </label>
                    </div>
                    <div>
                        {/* Course Category */}
                        <label className="w-full relative">
                            <p className="text-sm text-richblack-5">Category <sup className='text-pink-200'>*</sup></p>
                            <select 
                            name="courseCategory"
                            {...register("courseCategory",{required:true})}
                            defaultValue={editCourse && course?.category?._id }
                            className="font-medium  bg-richblack-500 rounded-[0.5rem] mt-[3px] w-full p-[12px] shadow-[0px_2px] shadow-richblack-300 focus:outline-none ">
                            
                            <option value="" disabled>Choose a Category</option>
                            {
                                !loading && courseCategories.map((category,index) =>{
                                    return (
                                        <option 
                                        value={category._id}
                                        key={index}>
                                            {category.categoryName}
                                        </option>
                                    )
                                })
                            }
                            </select>
                            {
                                errors.courseCategory && <span>
                                    Please Choose a category
                                </span>
                            }
                        </label>
                    </div>
                    {/* Course Tags */}
                    <div>
                        <ChipInput
                        label="Tags"
                        name="courseTags"
                        register ={register}
                        setValue={setValue}
                        errors={errors}
                        placeholder="Choose a Tag"
                        />
                    </div>
                    {/* Course Video */}
                    <div>
                        <Upload
                        name="courseImage"
                        label="Course Thumbnail"
                        setValue={setValue}
                        getValues={getValues}
                        errors= {errors}
                        register={register}
                        editData={editCourse ? course?.thumbnail : null}
                        />
                    </div>
                    <div>
                        {/* Course Benefits */}
                        <label className="w-full">
                            <p className="text-sm text-richblack-5">Benefits of the course <sup className='text-pink-200'>*</sup></p>
                            <textarea 
                            name="courseBenefits"
                            placeholder="Enter Benefits of the course"
                            type="text"
                            {...register("courseBenefits",{required:true})}
                            className="font-medium  bg-richblack-500 rounded-[0.5rem] mt-[3px] w-full p-[12px] shadow-[0px_2px] shadow-richblack-300 focus:outline-none min-h-[140px]" />
                            {
                                errors.courseBenefits && <span>
                                    Please enter benefits of the course
                                </span>
                            }
                        </label>
                    </div>
                    {/* Course courseRequirements */}
                    <div>
                        <RequirementField
                        name="courseRequirements"
                        label="Requirements/Instructions "
                        register={register}
                        setValue={setValue}
                        getValues={getValues}
                        errors={errors}
                        placeholder="Enter Requirements/Instructions"
                        />
                    </div>
                    
                    <div className='flex justify-end gap-x-4'>
                        {
                            editCourse && (
                                <button 
                                onClick={() => dispatch(setStep(2))}
                                className="mt-6 rounded-[8px] bg-pure-greys-400 font-medium py-[8px] px-[12px]  text-richblack-900">
                                    Continue Without Saving
                                </button>
                            )
                        }
                        <div className="bg-yellow-50 px-5 py-1  mt-6 rounded-md flex  text-black font-medium cursor-pointer ">
                            <IconBtn
                            text={editCourse ? "Save Changes" : "Next"}/>
                        </div>
                        
                    </div>
                    
                </div>

            </form> 
        </>
    )
}

export default CourseInformationForm;