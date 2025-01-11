import react from "react"
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { apiconnector } from "../../services/apiconnector";
import { contactusEndpoint } from "../../services/apis";
import countryCode from "../../data/countrycode.json";
import toast from "react-hot-toast";
const ContactUsForm = () =>{
    const [loading,setLoading] = useState(false);
    const {
        register,
        handleSubmit,
        reset,
        formState: {errors,isSubmitSuccessful}
    } = useForm()

    useEffect ( () =>{
        if(isSubmitSuccessful){
            reset({
                firstName:"",
                lastName:"",
                email:"",
                phoneNumber:"",
                message:""
            })
        }
    },[reset,isSubmitSuccessful]);

    const submitContactForm = async (data) =>{
        const toastId = toast.loading("Sending...");
        try{
            setLoading(true);
            
            const response = await apiconnector("POST",contactusEndpoint.CONTACT_US_API,data);
            toast.success("Mail Sent Successfully")
            setLoading(false);
        }catch(error){
            console.log(error);
            toast.error(error.response.data.message)
            setLoading(false);
        }
        toast.dismiss(toastId);
    }
    return (
        <div className="w-[100%]">
            <form onSubmit={handleSubmit(submitContactForm)}
            className="flex flex-col gap-7">
                <div className="flex flex-col lg:flex-row gap-5">
                    <label className="w-full">
                        <p className="text-richblack-5  text-sm">First Name</p>
                        <input 
                        name="firstName"
                        placeholder="Enter first name"
                        type="text"
                        {...register("firstName",{required:true})}
                        className="font-medium bg-richblack-800 rounded-[0.5rem] mt-1 w-full p-[12px] shadow-[0px_2px] shadow-richblack-600 focus:outline-none" />
                        {
                            errors.firstName && <span>
                                Please enter your name
                            </span>
                        }
                    </label>
                    <label className="w-full">
                        <p className="text-sm text-richblack-5">Last Name</p>
                        <input 
                        name="lastName"
                        placeholder="Enter last name"
                        type="text"
                        {...register("lastName")}
                        className="font-medium bg-richblack-800 rounded-[0.5rem] mt-1 w-full p-[12px] shadow-[0px_2px] shadow-richblack-600 focus:outline-none" />
                        
                    </label>
                </div>
                <div>
                    <label className="w-full">
                        <p className="text-sm text-richblack-5">Email Address</p>
                        <input 
                        name="email"
                        placeholder="Enter email address"
                        type="text"
                        {...register("email",{required:true})}
                        className="font-medium bg-richblack-800 rounded-[0.5rem] mt-1 w-full p-[12px] shadow-[0px_2px] shadow-richblack-600 focus:outline-none" />
                        {
                            errors.email && <span>
                                Please enter your email address
                            </span>
                        }                   
                     </label>
                </div>
                <div className="flex flex-col gap-5">
                    <label className="w-full">
                        <p className="text-sm text-richblack-5">Phone Number</p>
                        <div className="flex flex-row gap-5">
                            <select 
                            name="countrycode"
                            className="font-medium bg-richblack-800 rounded-[0.5rem] mt-1 w-[100px] p-[12px] shadow-[0px_2px] shadow-richblack-600 focus:outline-none"
                            {...register("countryCode",{required:true})}
                            >
                                {
                                    countryCode.map((element,index) =>{
                                        return (
                                            <option 
                                            value={element.code}
                                            key={index}
                                            >
                                                {element.code} - {element.country}
                                            </option>
                                        )
                                    })

                                }
                            </select>
                            <input
                            type="number"
                            name="phoneNumber"
                            className="font-medium bg-richblack-800 rounded-[0.5rem] mt-1 w-full p-[12px] shadow-[0px_2px] shadow-richblack-600 focus:outline-none"
                            {...register("phoneNumber",
                                {
                                    required:{value:true,message:"Please enter your phone number"},
                                    maxLength:{value:10,message:"Invalid phone number"},
                                    minLength:{value:8,message:"Invalid phone number"},
                                }
                            )}
                            />
                        </div>
                        
                    </label>
                </div>
                <div>
                    <label className="w-full">
                        <p className="text-richblack-5 text-sm">Message</p>
                        <textarea 
                        name="message"
                        placeholder="Enter your message"
                        type="text" 
                        {...register("message",{required:true})}
                        cols="30"
                        rows="7" 
                        className="font-medium bg-richblack-800 rounded-[0.5rem] mt-1 w-full p-[12px] shadow-[0px_2px] shadow-richblack-600 focus:outline-none"/>
                        {
                            errors.message && <span>
                                Please enter your message
                            </span>
                        }
                    </label>
                </div>
                <button type="submit" className="mt-3 rounded-[8px] bg-yellow-50 py-[8px] px-[12px] font-medium text-richblack-900">
                    Send Message
                </button>
            </form>
        </div>
    )
}


export default ContactUsForm;