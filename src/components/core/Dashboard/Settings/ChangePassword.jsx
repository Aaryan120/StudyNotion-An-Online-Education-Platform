import react, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { changePassword } from "../../../../services/operations/settingsAPI";
import { IoEyeSharp,IoEyeOffSharp } from "react-icons/io5";
import IconBtn from "../../../common/IconBtn";
const ChangePassword = () =>{

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [showPassword,setShowPassword] = useState(false);
    const [showNewPassword,setShowNewPassword] = useState(false);
    const {
        register,
        handleSubmit,
        formState:{errors},
    } = useForm();
    const {token} = useSelector((state) => state.auth);
    const submitChangePassword = async (data) =>{
        try{
            dispatch(changePassword(token,data));
        }
        catch(error){
            console.log("ERROR",error)
        }
    }

    return (
        <>
            <form onSubmit={handleSubmit(submitChangePassword)} className="flex flex-col">
                <div className="my-10 flex flex-col gap-y-5 bg-richblack-800 p-8 px-12 justify-between rounded-md border-[1px] border-richblack-700 text-richblack-5 ">
                    <div>
                        <p className="text-xl font-semibold mb-3">Change Password</p>
                    </div>
                    <div className="flex flex-col lg:flex-row gap-5">
                        <label className="w-full relative">
                            <p className="text-richblack-5  text-sm">Current Password</p>
                            <input 
                            name="currentPassword"
                            placeholder="Enter Current Password"
                            type={showPassword ? "text" : "password"}                            
                            {...register("currentPassword",{required:true})}
                            className="font-medium bg-richblack-700 rounded-[0.5rem] mt-1 w-full p-[12px] shadow-[0px_2px] shadow-richblack-600"
                            >
                                {
                                    errors.currentPassword && <span>
                                        Please Enter Your Current Password
                                    </span>
                                }
                            </input>
                            <span onClick={() => setShowPassword(!showPassword)} className="absolute top-10 right-3">{showPassword ? <IoEyeSharp /> : <IoEyeOffSharp/>}</span>
                        </label>
                        <label className="w-full relative">
                            <p className="text-richblack-5  text-sm">New Password</p>
                            <input 
                            name="newPassword"
                            placeholder="Enter New Password"
                            type={showNewPassword ? "text" : "password"}
                            {...register("newPassword",{required:true})}
                            className="font-medium bg-richblack-700 rounded-[0.5rem] mt-1 w-full p-[12px] shadow-[0px_2px] shadow-richblack-600"
                            >
                                {
                                    errors.newPassword && <span>
                                        Please Enter Your New Password
                                    </span>
                                }
                            </input>
                            <span onClick={() => setShowNewPassword(!showNewPassword)} className="absolute top-10 right-3">{showNewPassword ? <IoEyeSharp /> : <IoEyeOffSharp/>}</span>
                        </label>
                    </div>
                    </div>
                    <div className="flex justify-end gap-2 text-richblack-5">
                        <button
                        className="bg-richblack-700 px-5 py-2 rounded-md"
                        onClick={() => navigate("/dashboard/my-profile")}
                        >Cancel</button>
                        <div className="bg-yellow-50 px-5 py-2 rounded-md text-black">
                            <IconBtn
                            text="Save"
                            type="submit"
                            />
                        </div>
                </div>
            </form>
        </>
    )
}

export default ChangePassword;