import react, { useEffect, useState } from "react";
import IconBtn from "../../../common/IconBtn";
import { useDispatch, useSelector } from "react-redux";
import { ACCOUNT_TYPE } from "../../../../utils/constants";
import toast from "react-hot-toast";
import { buyCourse } from "../../../../services/operations/studentFeaturesAPI";
import { useNavigate } from "react-router-dom";

const RenderTotalAmount = () =>{
    const {total,cart} = useSelector((state) => state.cart);
    const {token} = useSelector((state) =>state.auth);
    const {user} = useSelector((state)=>state.profile);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleBuyCourse = () =>{
        const courses = cart.map((course) => course._id);
        if(user && user.accountType === ACCOUNT_TYPE.INSTRUCTOR){
            toast.error("You are an Instructor, You can't buy a course");
            return;
        }
        if(token){
            buyCourse(token,courses,user,navigate,dispatch);
            return;
        }
    }
    return(
        <div className="border border-richblack-700 bg-richblack-800 rounded-md max-h-[150px] md:w-[50%] lg:w-[30%] p-5 flex flex-col gap-y-3">
            <p className="text-md text-richblack-300">Total:</p>
            <p className="text-yellow-25 font-semibold text-xl">Rs {parseInt(total)}</p>

            <div className="bg-yellow-50 text-richblack-900 py-[8px] px-[12px] rounded-md text-center cursor-pointer">
                <IconBtn
                text="Buy Now"
                onClick={handleBuyCourse}/>
            </div>
        </div>
    )
}

export default RenderTotalAmount;