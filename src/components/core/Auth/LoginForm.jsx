import React from "react";
import { IoEyeOffSharp,IoEyeSharp} from "react-icons/io5"
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useState } from "react";
import Tab from "../../common/Tab";
import { useDispatch } from "react-redux";
import { login } from "../../../services/operations/authAPI";

const LoginForm = ()=>{

    const dispatch = useDispatch()
    const [showPassword,setShowPassword] = useState(false);
    const navigate = useNavigate();
    const [formData,setFormData] = useState({
        email:"",
        password:"",
    })
    function changeHandler(event){
        setFormData((prevData) =>({
            ...prevData,
            [event.target.name] : event.target.value,
        }))
    }
    const handleOnSubmit = (e) =>{
        e.preventDefault();
        dispatch(login(formData.email,formData.password,navigate));
    }
    
    return(
        <div>

            <form onSubmit={handleOnSubmit} className="flex flex-col mt-6 w-full gap-y-4">
                <div>
                    <label className="w-full">
                        <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">Email Address <sup className="text-pink-200">*</sup></p>
                        <input
                        type="text"
                        name="email" 
                        value={formData.email}
                        onChange={changeHandler}    
                        className="font-medium bg-richblack-800 rounded-[0.5rem] mt-1 w-full p-[12px] shadow-[0px_2px] shadow-richblack-600 focus:outline-none"
                        placeholder="Enter email address"                
                        />
                    </label>
                </div>
                <div className="flex flex-row items-center gap-4">
                    <label className="w-full relative">
                        <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">Password <sup className="text-pink-200">*</sup></p>
                        <input 
                        required
                        placeholder="Enter Password"
                        value={formData.password}
                        onChange={changeHandler}
                        name="password"
                        className="font-medium bg-richblack-800 rounded-[0.5rem] mt-1 w-full p-[12px] shadow-[0px_2px] shadow-richblack-600 focus:outline-none"
                        type={showPassword ? "text" : "password"} />
                        <span onClick={() => setShowPassword(!showPassword)} className="absolute top-[46%] text-xl right-4">{showPassword ? <IoEyeSharp /> : <IoEyeOffSharp/>}</span>
                        <Link to="/forgot-password">
                            <p className="mt-[4px] ml-auto max-w-max text-xs text-blue-100">
                                Forgot Password
                            </p>
                        </Link>
                    </label>
                </div>
                <button type="submit" className="mt-6 rounded-[8px] bg-yellow-50 py-[8px] px-[12px] font-medium text-richblack-900">
                    Sign in
                </button>
            </form>
        </div>
    )
}


export default LoginForm;