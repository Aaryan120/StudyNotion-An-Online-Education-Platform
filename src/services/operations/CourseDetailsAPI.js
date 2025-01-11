import toast from "react-hot-toast";
import { courseEndpoints } from "../apis";
import { apiconnector } from "../apiconnector";

const {
    COURSE_DETAILS_API,
    COURSE_CATEGORIES_API,
    GET_ALL_COURSE_API,
    CREATE_COURSE_API,
    EDIT_COURSE_API,
    CREATE_SECTION_API,
    CREATE_SUBSECTION_API,
    UPDATE_SECTION_API,
    UPDATE_SUBSECTION_API,
    DELETE_SECTION_API,
    DELETE_SUBSECTION_API,
    GET_ALL_INSTRUCTOR_COURSES_API,
    DELETE_COURSE_API,
    GET_FULL_COURSE_DETAILS_AUTHENTICATED,
    CREATE_RATING_API,
    LECTURE_COMPLETION_API,
  } = courseEndpoints;


export const fetchCourseCategories = async () =>{
        let result = []
        try{
            const response = await apiconnector("GET",COURSE_CATEGORIES_API,null);

            if(!response.data.success){
                throw new Error(response.data.message);
            }
            result = response.data.data;
        }
        catch(error){
            console.log("COURSE CATEGORY API ERROR",error);
            toast.error(error.response.data.message);
        }
        return result;
}

export const  editCourseDetails = async (data,token) => {
    let result = null;
    try {
        const response = await apiconnector("POST",EDIT_COURSE_API,data,{
            "Content-Type" : "multipart/form-data",
            Authorization : `Bearer ${token}`,
        })

        if(!response.data.success){
            throw new Error(response.data.message);
        }

        toast.success("Course Edited Successfully")
        console.log("EDIT COURSE RESPONSE SUCCESSFULL",response);
        result = response.data.data;
    } catch (error) {
        console.log("EDIT COURSE API ERROR",error);
        toast.error(error.response.data.message);
    }
    return result;
}


export const addCourseDetails = async (data,token) =>{
    let result = null;
    const toastId = toast.loading("Loading...");
    try {
        const response = await apiconnector("POST",CREATE_COURSE_API,data,{
            "Content-Type" : "multipart/form-data",
            Authorization : `Bearer ${token}`
        })

        if(!response.data.success){
            throw new Error(response.data.message);
        }
        toast.success("COURSE CREATED SUCCESSFULLY")
        result = response.data.data;
    } catch (error) {
        console.log("ADD COURSE API ERROR",error);
        toast.error(error.response.data.message);
    }
    toast.dismiss(toastId);
    return result;
}

export const updateSection = async (data,token) =>{
    let result = null;
    try {
        const response = await apiconnector("POST",UPDATE_SECTION_API,data,{
            Authorization:`Bearer ${token}`
        })

        if(!response.data.success){
            throw new Error(response.data.message);
        }

        toast.success("Section Edited Successfully");
        result = response.data.data;
    } catch (error) {
        console.log("EDIT SECTION API ERROR....",error);
        toast.error(error.response.data.message);
    }
    return result;
}

export const createSection = async (data,token) =>{
    let result = null;
    try {
        const response = await apiconnector("POST",CREATE_SECTION_API,data,{
            Authorization:`Bearer ${token}`
        })

        if(!response.data.success){
            throw new Error(response.data.message);
        }
        toast.success("Section Created Successfully");
        result = response.data.data;
    } catch (error) {
        console.log("CREATE SECTION API ERROR....",error);
        toast.error(error.response.data.message);
    }
    return result;
}

export const deleteSection = async (data,token) =>{
    let result = null;
    try {
        const response = await apiconnector("POST",DELETE_SECTION_API,data,{
            Authorization:`Bearer ${token}`
        });

        if(!response.data.success){
            throw new Error(response.data.message);
        }

        toast.success("SECTION DELETED SUCCESSFULLY");
        result = response.data.data;
    } catch (error) {
        console.log("DELETE SECTION API ERROR....",error);
        toast.error(error.response.data.message);
    }
    return result;
}

export const deleteSubSection = async (data,token) =>{
    let result = null;
    try {
        const response = await apiconnector("POST",DELETE_SUBSECTION_API,data,{
            Authorization:`Bearer ${token}`
        })

        if(!response.data.success){
            throw new Error(response.data.message);
        }

        result = response.data.data;
        toast.success("LECTURE DELETED SUCCESSFULLY");
    } catch (error) {
        console.log("DELETE SUBSECTION API ERROR....",error);
        toast.error(error.response.data.message);
    }
    return result;
}

export const createSubSection = async (data,token) =>{
    let result = null;
    const toastId = toast.loading("Loading...");
    try {
        const response = await apiconnector("POST",CREATE_SUBSECTION_API,data,{
            "Content-Type" : "multipart/form-data",
            Authorization: `Bearer ${token}`
        })

        if(!response.data.success){
            throw new Error(response.data.message);
        }
        toast.success("Lecture Added Successfully");
        result = response.data.data;
    } catch (error) {
        console.log("CREATE SUBSECTION API ERROR...",error);
        toast.error(error.response.data.message);
    }
    toast.dismiss(toastId);
    return result;
}

export const updateSubSection = async (data,token) =>{
    let result = null;
    const toastId = toast.loading("Loading...");
    try {
        const response = await apiconnector("POST",UPDATE_SUBSECTION_API,data,{
            "Content-type": "multipart/form-data",
            Authorization:`Bearer ${token}`,
        })

        if(!response.data.success){
            throw new Error(response.data.message);
        }
        toast.success("Lecure Updated Successfully");
        result = response.data.data;
    } catch (error) {
        console.log("UPDATED SUB SECTION API ERROR....",error);
        toast.error(error.response.data.message);
    }
    toast.dismiss(toastId);
    return result;
}

export const fetchInstructorCourses = async (token) =>{
    let result = [];

    try {
        const response = await apiconnector("GET",GET_ALL_INSTRUCTOR_COURSES_API,null,{
            Authorization:`Bearer ${token}`
        })

        if(!response.data.success){
            throw new Error(response.data.message);
        }
        result = response.data.data;
    } catch (error) {
        console.log("INSTRUCTOR COURSE API ERROR",error);
        toast.error(error.response.data.message);
    }
    return result;
}

export const deleteCourse = async (data,token) =>{
    try {
        const response = await apiconnector("DELETE",DELETE_COURSE_API,data,{
            Authorization:`Bearer ${token}`
        });

        if(!response.data.success){
            throw new Error(response.data.message);
        }

        toast.success("Course Deleted Successfully");
    } catch (error) {
        console.log("COURSE DELETE API ERROR...",error);
        toast.error(error.response.data.message);
    }
}
 
export const getFullCourseDetail = async (courseId,token) =>{
    let result = [];
    try {
        const response = await apiconnector("POST",GET_FULL_COURSE_DETAILS_AUTHENTICATED,{ courseId },{
            Authorization: `Bearer ${token}`,
        })

        if(!response.data.success){
            throw new Error(response.data.message);
        }

        result = response.data.data;

    } catch (error) {
        console.log("GET FULL COURSE DETAIL API ERROR",error);
        toast.error(error.response.data.message);
    }
    return result;
}

export const fetchCourseDetails = async (courseId) =>{
    let result = null;
    try {
        const response = await apiconnector("POST",COURSE_DETAILS_API,{courseId});
        if(!response.data.success){
            throw new Error(response.data.message);
        }

        toast.success("Course Details Found");
        result = response.data;
    } catch (error) {
        toast.error(error.response.data.message);
        console.log("COURSE DETAILS API ERROR",error);
    }
    return result;
}

export const createRating = async (data,token) =>{
    const toastId = toast.loading("Loading...");
    try {
        const response = await apiconnector("POST",CREATE_RATING_API,data,{
            Authorization:`Bearer ${token}`
        })

        if(!response.data.success){
            throw new Error(response.data.message);
        }

        toast.success("Review Saved Successfully");
    } catch (error) {
        console.log("CREATE RATING API ERROR",error);
        toast.error(error.response.data.message);
    }
    toast.dismiss(toastId);
}

export const markLectureAsComplete = async (data,token) =>{
    try {
        const response = await apiconnector("POST",LECTURE_COMPLETION_API,data,{
            Authorization:`Bearer ${token}`
        })

        if(!response.data.success){
            throw new Error(response.data.message);
        }

        toast.success("Successfully marked the lecture");
    } catch (error) {
        console.log("LECTURE COMPLETION API ERROR..",error);
        toast.error(error.response.data.message);
    }
}