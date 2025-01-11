import react from "react";
import { useDispatch, useSelector } from "react-redux";
import ReactStars from "react-stars";
import { FaStar } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import { removeFromCart } from "../../../../slices/cartSlice";
const RenderCartCourses = () =>{
    const {cart} = useSelector((state) => state.cart);
    const dispatch = useDispatch();
    return(
        <div className="lg:w-[70%]">
            {
                cart.map((course,index) =>{
                    return (
                        <>
                            <div className="flex flex-col md:flex-row md:justify-between mb-5 mt-5" key={index}>
                                <div className="flex flex-row  gap-6">
                                    <img src={course?.thumbnail} alt="courseThumbnail" className="size-40 aspect-square object-cover "/>
                                    <div className="flex flex-col justify-between my-2">
                                        <div className="space-y-1">
                                            <p className="text-xl text-richblack-5 font-semibold">{course.courseName}</p>
                                            <p className="text-md text-richblack-300">{course.category?.categoryName}</p>
                                        </div>
                                        
                                        <div className="flex items-center gap-x-3">
                                            <ReactStars
                                                count={5}
                                                size={20}
                                                edit={false}
                                                activeColor="#ffd700"
                                                emptyIcon={<FaStar/>}
                                                fullIcon={<FaStar/>}
                                            />
                                            <span className="text-richblack-300 text-md">{course?.ratingAndReviews?.length} Ratings</span>
                                        </div>  
                                    </div>
                                </div>
                                <div className="flex flex-row-reverse md:flex-col mt-4 items-center justify-between md:mt-0 gap-y-6">
                                    <button
                                    onClick={() => dispatch(removeFromCart(course._id))}
                                    className="flex gap-2 items-center bg-richblack-700 rounded-lg py-[8px] px-[12px] text-pink-300">
                                        <RiDeleteBin6Line/>
                                        <span>Remove</span>
                                    </button>
                                    <p className="text-yellow-25 text-lg font-semibold">Rs {course?.price}</p>
                                </div>
                            </div>
                            <div className="h-[0.1rem] w-full bg-richblack-300/50"></div>
                        </>
                        
                    )
                })
            }
        </div>
    )
}

export default RenderCartCourses;