import React from "react";
import toast from "react-hot-toast";
import { IoEyeSharp,IoEyeOffSharp } from "react-icons/io5";
import { useState } from "react";
import Tab from "../../common/Tab";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { ACCOUNT_TYPE } from "../../../utils/constants";
import { setSignupData } from "../../../slices/authSlice";
import { sendOtp } from "../../../services/operations/authAPI";


const SignupForm = ()=>{
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [signUpFormData,setSignUpFormData] = useState({
        firstName:"",
        lastName:"",
        email:"",
        phoneNo:"",
        password:"",
        confirmPassword:"",
    })
    const [showPassword,setShowPassword] = useState(false);
    const [showConfirmPassword,setShowConfirmPassword] = useState(false);
    const [accountType,setAccountType] = useState(ACCOUNT_TYPE.STUDENT);
    const tabData = [
        {
          id: 1,
          tabName: "Student",
          type: ACCOUNT_TYPE.STUDENT,
        },
        {
          id: 2,
          tabName: "Instructor",
          type: ACCOUNT_TYPE.INSTRUCTOR,
        },
    ]
    function changeHandler(event){
        setSignUpFormData((prevData) =>({
            ...prevData,
            [event.target.name] : event.target.value
        }))
    }
    const handleOnSubmit = (event) =>{
        event.preventDefault();
        if(signUpFormData.password !== signUpFormData.confirmPassword){
            toast.error("Password and Confirm Passwords do not match")
            return
        }
        const signupData = {
            ...signUpFormData,
            accountType,
        }

        dispatch(setSignupData(signupData));

        dispatch(sendOtp(signUpFormData.email,navigate))

        setSignUpFormData({
            firstName:"",
            lastName:"",
            email:"",
            password:"",
            confirmPassword:"",
        })
        setAccountType(ACCOUNT_TYPE.STUDENT)
    }
    return(
        <div>
            {/* Account type tab */}

            <Tab tabData={tabData} accountType={accountType} setAccountType={setAccountType}></Tab>

            {/* Form */}
            <form onSubmit={handleOnSubmit} className="flex w-full gap-y-4 flex-col">
                <div className="flex gap-x-4 items-center">
                    <label className="w-full">
                        <p className="text-richblack-5  text-sm">First Name <sup className="text-pink-200">*</sup></p>
                        <input 
                        required
                        placeholder="Enter first name"
                        name="firstName"
                        value={signUpFormData.firstName}
                        onChange={changeHandler}
                        className="font-medium bg-richblack-800 rounded-[0.5rem] mt-1 w-full p-[12px] shadow-[0px_2px] shadow-richblack-600 focus:outline-none"
                        type="text" />
                    </label>

                    <label className="w-full">
                        <p className="text-richblack-5  text-sm">Last Name <sup className="text-pink-200">*</sup></p>
                        <input 
                        required
                        placeholder="Enter last name"
                        value={signUpFormData.lastName}
                        name="lastName"
                        onChange={changeHandler}
                        className="font-medium bg-richblack-800 rounded-[0.5rem] mt-1 w-full p-[12px] shadow-[0px_2px] shadow-richblack-600 focus:outline-none"
                        type="text" />
                    </label>
                </div>
                <div>
                    <label className="w-full">
                        <p className="text-richblack-5  text-sm">Email Address <sup className="text-pink-200">*</sup></p>
                        <input
                        type="text"
                        name="email" 
                        value={signUpFormData.email}
                        onChange={changeHandler}    
                        className="font-medium bg-richblack-800 rounded-[0.5rem] mt-1 w-full p-[12px] shadow-[0px_2px] shadow-richblack-600 focus:outline-none"
                        placeholder="Enter email address"                
                        />
                    </label>
                </div>
                <div className="flex flex-col md:flex-row items-center gap-4">
                    <label className="w-full relative">
                        <p className="text-richblack-5  text-sm">Create Password <sup className="text-pink-200">*</sup></p>
                        <input 
                        required
                        placeholder="Enter Password"
                        value={signUpFormData.password}
                        onChange={changeHandler}
                        name="password"
                        className="font-medium bg-richblack-800 rounded-[0.5rem] mt-1 w-full p-[12px] shadow-[0px_2px] shadow-richblack-600 focus:outline-none"
                        type={showPassword ? "text" : "password"} />
                        <span onClick={() => setShowPassword(!showPassword)} className="absolute top-10 right-3">{showPassword ? <IoEyeSharp /> : <IoEyeOffSharp/>}</span>
                    </label>

                    <label className="w-full relative">
                        <p className="text-richblack-5 text-sm">Confirm Password <sup className="text-pink-200">*</sup></p>
                        <input 
                        required
                        placeholder="Enter Password"
                        value={signUpFormData.confirmPassword}
                        onChange={changeHandler}
                        name="confirmPassword"
                        className="font-medium bg-richblack-800 rounded-[0.5rem] mt-1 w-full p-[12px] shadow-[0px_2px] shadow-richblack-600 focus:outline-none"
                        type={showConfirmPassword ? "text" : "password"} />
                        <span onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute top-10 right-3">{showConfirmPassword ? <IoEyeSharp /> : <IoEyeOffSharp/>}</span>
                    </label>
                </div>
                <button type="submit" className="mt-6 rounded-[8px] bg-yellow-50 py-[8px] px-[12px] font-medium text-richblack-900">
                    Create Account
                </button>
            </form>
        </div>
    )
}


export default SignupForm;