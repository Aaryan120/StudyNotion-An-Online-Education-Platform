import { endpoints, settingsEndpoints} from "../apis";
import { apiconnector } from "../apiconnector";
import { setLoading,setUser } from "../../slices/profileSlice";
import setToken from "../../slices/authSlice"
import { logout } from "./authAPI";
import toast from "react-hot-toast";
const {
    UPDATE_DISPLAY_PICTURE_API,
    UPDATE_PROFILE_API,
    DELETE_PROFILE_API,
    CHANGE_PASSWORD_API
} = settingsEndpoints;


export function updateDisplayPicture(token,formData){
    return async(dispatch) => {
        const toastId = toast.loading("Updating...")
        try {
            const response = await apiconnector("PUT",UPDATE_DISPLAY_PICTURE_API,formData,{
                "Content-type": "multipart/form-data",
                Authorization: `Bearer ${token}`,
            })

            if(!response.data.success){
                throw new Error(response.data.message);
            }
            toast.success("Display Picture Updated Successfully");
            const updatedUser = response.data.data;
            dispatch(setUser(updatedUser));
            localStorage.setItem("user",JSON.stringify(updatedUser))
        } catch (error) {
            console.log("UPDATE DISPLAY PICTURE API ERROR", error)
            toast.error(error.response.data.message);
        }
        toast.dismiss(toastId);
    }
}

export function updateProfile(token,formData){
    return async(dispatch) =>{
        const toastId = toast.loading("Updating...");
        try {
            const response = await apiconnector("PUT",UPDATE_PROFILE_API,formData,{
                Authorization: `Bearer ${token}`
            })

            if(!response.data.success){
                throw new Error(response.data.message);
            }
            dispatch(setUser(response.data.data));
            localStorage.setItem("user",JSON.stringify(response.data.data));
            toast.success("Profile Updated");
        } catch (error) {
            console.log("UPDATE PROFILE API ERROR",error);
            toast.error(error.response.data.message);
        }
        toast.dismiss(toastId);
    }
}

export function changePassword(token,data){
    
    return async () =>{
        const toastId = toast.loading("Updating...")
        try {
            const response = await apiconnector("POST",CHANGE_PASSWORD_API,data,{
                Authorization:`Bearer ${token}`
            })

            if(!response.data.success){
                throw new Error(response.data.message);
            }
            toast.success("Password Changed Successfully")
        } catch (error) {
            console.log("CHANGE PASSWORD API ERROR....",error);
            toast.error(error.response.data.message);
        }
        toast.dismiss(toastId);
    }
}

export function deleteAccount(token,navigate){
    return async (dispatch) =>{
        const toastId = toast.loading("Deleting Account")
        try {
            const response = await apiconnector("DELETE",DELETE_PROFILE_API,null,{
                Authorization:`Bearer ${token}`
            })

            if(!response.data.success){
                throw new Error(response.data.message);
            }

            toast.success("Account Deleted");
            dispatch(logout(navigate));
            // navigate("/");
        } catch (error) {
            console.log("DELETE PROFILE API ERROR....", error);
            toast.error(error.response.data.message)
        }
        toast.dismiss(toastId);
    }
}