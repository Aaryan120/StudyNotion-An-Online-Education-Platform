import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart } from '../../../slices/cartSlice';
import { GiCheckMark } from "react-icons/gi";
import { FaShareSquare } from "react-icons/fa";
import clipboardCopy from 'clipboard-copy';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { ACCOUNT_TYPE } from '../../../utils/constants';
const CourseDetailsCard = ({course,setConfirmationModal,handleBuyCourse}) => {
    const {user} = useSelector((state) =>state.profile);
    const {token} = useSelector((state) =>state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const copy = require('clipboard-copy')



    const handleShare = () =>{
        copy(window.location.href);
        toast.success("Link Copied To The Clipboard");
    }

    const handleAddToCart = () =>{
        if(user && user.accountType === ACCOUNT_TYPE.INSTRUCTOR){
          toast.error("You are an Instructor, You can't buy a course");
          return;
        }
        if(token){
          dispatch(addToCart(course));
          return;
        }
        setConfirmationModal({
          text1:"You are not logged in!",
          text2:"Please login to Add to Cart.",
          btn1Text:"Login",
          btn2Text:"Cancel",
          btn1Handler:() => navigate("/login"),
          btn2Handler:() => setConfirmationModal(null),
        })
    }


    const {
        _id:course_id,
        thumbnail,
        price,
        instructions,
    } = course;
    return (
        <>
            <div className=' p-5 flex flex-col gap-4 bg-richblack-700 text-richblack-5 rounded-lg '>
                <img src={thumbnail} alt="CourseImage" className='max-h-[300px] min-h-[180px] w-[400px] rounded-2xl overflow-hidden object-cover md:max-w-full'/>
                <div className='px-4'>
                    <p className='text-3xl font-semibold mt-4'>Rs. {price}</p>
                </div>
                <div className='p-3 flex flex-col gap-4'>
                    <button 
                    className='rounded-md w-full bg-yellow-50 text-richblack-900 px-5 py-3 '
                    onClick={user && course.studentEnrolled.includes(user._id) ? (() => navigate("/dashboard/enrolled-courses")) : handleBuyCourse}>
                        {
                            user && course.studentEnrolled.includes(user._id) ? ("Go to Course") : ("Buy Now")
                        }
                    </button>
                    {
                        (
                            (!user || !course.studentEnrolled.includes(user._id)) && 
                            <button 
                            className='rounded-md w-full bg-richblack-800 text-richblack-5 px-5 py-3 '
                            onClick={() => handleAddToCart()}>
                                Add To Cart
                            </button>
                        )
                    }
                    
                </div>
                <div className='text-center text-richblack-100 -mt-3'>
                    <p>30-Day Money-Back Guarantee</p>
                </div>
                <div>
                    <p className='text-xl font-semibold text-richblack-5 mb-2'>This Course Includes :</p>
                    <div className='flex flex-col gap-3'>
                        {
                            instructions?.map((item,index) =>{
                                return (
                                    <div key={index} className='flex items-center gap-x-2 text-caribbeangreen-100'>
                                        <GiCheckMark/>
                                        <p>{item}</p>
                                    </div>
                                )
                            })
                        }
                    </div>
                    
                </div>
                <div className='flex items-center justify-center gap-x-2 mt-2  text-yellow-50'>
                    <button className='cursor-pointer flex items-center gap-x-2'
                    onClick={() => handleShare()}>
                        <FaShareSquare />
                        <p>Share</p>
                    </button>
                    
                </div>
            </div>
        </>
    )
}

export default CourseDetailsCard;
