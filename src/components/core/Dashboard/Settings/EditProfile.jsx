import react, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { updateProfile } from "../../../../services/operations/settingsAPI";
import IconBtn from "../../../common/IconBtn";
import { useNavigate } from "react-router-dom";

const genders = ["Male", "Female", "Non-Binary", "Prefer not to say", "Other"]


const EditProfile = () =>{
    const {user} = useSelector((state) =>state.profile);
    const {token} = useSelector((state) =>state.auth);
    const navigate = useNavigate();
    const [loading,setLoading] = useState(false);
    const dispatch = useDispatch();
    const {
        register,
        handleSubmit,
        formState:{errors}
    } = useForm();
    
    const submitEditProfileForm = async (data) =>{
        try {
            dispatch(updateProfile(token,data));

        } catch (error) {
            console.log("ERROR MESSAGE",error)
        }
    }
    return (
       <>
       <form onSubmit={handleSubmit(submitEditProfileForm)} className="flex flex-col">
            <div className="my-10 flex flex-col gap-y-5 bg-richblack-800 p-8 px-12 justify-between rounded-md border-[1px] border-richblack-700 text-richblack-5 ">
                <div>
                    <p className="text-xl font-semibold mb-3">Profile Information</p>
                </div>
                <div className="flex flex-col lg:flex-row gap-5">
                    <label className="w-full">
                        <p className="text-richblack-5  text-sm">First Name</p>
                        <input 
                        name="firstName"
                        placeholder="Enter first name"
                        type="text"
                        defaultValue={user?.firstName}
                        {...register("firstName",{required:true})}
                        className="font-medium bg-richblack-700 rounded-[0.5rem] mt-1 w-full p-[12px] shadow-[0px_2px] shadow-richblack-600"
                        />
                        {
                            errors.firstName && <span>
                                Please Enter Your First Name
                            </span>
                        }
                    </label>
                    <label className="w-full">
                        <p className="text-richblack-5  text-sm">Last Name</p>
                        <input 
                        name="lastName"
                        placeholder="Enter Last name"
                        type="text"
                        defaultValue={user?.lastName}
                        {...register("lastName",{required:true})}
                        className="font-medium bg-richblack-700 rounded-[0.5rem] mt-1 w-full p-[12px] shadow-[0px_2px] shadow-richblack-600"
                        >
                            {
                                errors.lastName && <span>
                                    Please Enter Your Last Name
                                </span>
                            }
                        </input>
                    </label>
                </div>
                <div className="flex flex-col lg:flex-row gap-5">
                    <label className="w-full">
                        <p className="text-richblack-5  text-sm">Date Of Birth</p>
                        <input 
                        name="dateOfBirth"
                        placeholder="Enter date of birth"
                        type="date"
                        defaultValue={user?.additionalDetails?.dateOfBirth ? new Date(user.additionalDetails.dateOfBirth).toISOString().split('T')[0] : ""}
                        {...register("dateOfBirth",
                            {
                                required:{value:true,message:"Please enter your date of birth"},
                                max: {
                                    value: new Date().toISOString().split('T')[0],
                                    message: "Date of Birth cannot be in the future.",
                                }
                            }
                        )}
                        className="font-medium bg-richblack-700 rounded-[0.5rem] mt-1 w-full p-[12px] shadow-[0px_2px] shadow-richblack-600"
                        />
                        {
                            errors.dateOfBirth && <span>
                                Please Enter Birth Date
                            </span>
                        }

                    </label>
                    <label className="w-full">
                        <p className="text-richblack-5  text-sm">Gender</p>
                        <select 
                        name="gender"
                        placeholder="Enter Last name"
                        
                        defaultValue={user?.additionalDetails?.gender}
                        {...register("gender",{required:true})}
                        className="font-medium bg-richblack-700 rounded-[0.5rem] mt-1 w-full p-[12px] shadow-[0px_2px] shadow-richblack-600"
                        >
                        {
                            genders.map((gender,index) =>{
                                return (
                                    <option key={index}>
                                        {gender}
                                    </option>
                                )
                            })
                        }
                        </select>
                    </label>
                </div>
                <div className="flex flex-col lg:flex-row gap-5">
                    <label className="w-full">
                        <p className="text-richblack-5  text-sm">Contact Number</p>
                        <input 
                        name="contactNumber"
                        placeholder="Enter Contact Number"
                        type="tel"
                        defaultValue={user?.additionalDetails?.contactNumber}
                        {...register("contactNumber",
                            {
                                required:{value:true , message:"Please enter Contact Number"},
                                maxLength:{value:10,message:"Invalid Contact Number"},
                                minLength:{value:8,message:"Invalid Contact Number"},
                            })
                        }
                        className="font-medium bg-richblack-700 rounded-[0.5rem] mt-1 w-full p-[12px] shadow-[0px_2px] shadow-richblack-600"
                        />
                        {
                            errors.contactNumber && <span className="-mt-1 text-[12px] text-yellow-100">
                                Please Enter Your Contact Number
                            </span>
                        }
                    </label>
                    <label className="w-full">
                        <p className="text-richblack-5  text-sm">About</p>
                        <input 
                        name="about"
                        placeholder="Enter Bio Details"
                        type="text"
                        defaultValue={user?.additionalDetails?.about}
                        {...register("about",{required:true})}
                        className="font-medium bg-richblack-700 rounded-[0.5rem] mt-1 w-full p-[12px] shadow-[0px_2px] shadow-richblack-600"
                        />
                        {
                            errors.about && <span className="-mt-1 text-[12px] text-yellow-100">
                                Please Enter Bio
                            </span>
                        }
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

export default EditProfile;