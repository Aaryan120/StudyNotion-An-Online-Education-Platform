import { apiconnector } from "../apiconnector";
import { profileEndpoints } from "../apis";
import { setUser,setLoading } from "../../slices/profileSlice";
import toast from "react-hot-toast";
const {
    GET_INSTRUCTOR_DATA_API,
    GET_USER_DETAILS_API,
    GET_USER_ENROLLED_COURSES_API,
} = profileEndpoints



export const getUserEnrolledCourses = async (token) =>{
    // const toastId = toast.loading("Loading...");
    let result = [];
    try {
        const response = await apiconnector("GET",GET_USER_ENROLLED_COURSES_API,null,{
            Authorization: `Bearer ${token}`
        });

        if(!response.data.success){
            throw new Error(response.data.message);
        }
        result = response.data.data;
    } catch (error) {
        console.log("GET ENROLLED COURSES API ERROR", error);
        toast.error(error.response.data.message);
    }
    return result;
}

export const getInstructorData = async (token) =>{
    let result = null;
    try {
        const response = await apiconnector("GET",GET_INSTRUCTOR_DATA_API,null,{
            Authorization:`Bearer ${token}`
        })

        if(!response.data.success){
            throw new Error(response.data.message);
        }
        toast.success("Instructor Data Fetched Successfully");
        result = response.data.data;
    } catch (error) {
        console.log("GET INSTRUCTOR DASHBOARD API ERROR",error);
        toast.error(error.response.data.message);
    }
    return result;
}