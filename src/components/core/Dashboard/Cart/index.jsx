import react from "react";
import { useSelector } from "react-redux";
import RenderCartCourses from "./RenderCartCourses";
import RenderTotalAmount from "./RenderTotalAmount";


const Cart = ()=>{
    const {totalItems} = useSelector((state) => state.cart);

    return(
        <div className="mb-4">
            <h1 className='mb-14 text-richblack-5 text-3xl font-medium'>My Wishlist</h1>

            <p className="text-2xl text-richblack-300 font-medium">{totalItems} Courses in Cart</p>
            <div className="h-[0.1rem] bg-richblack-300/50 mt-2 mb-4 w-full"></div>
            {
                totalItems > 0 ? 
                (
                    <div className="flex gap-6 flex-col lg:flex-row text-white">
                        <RenderCartCourses/>
                        <RenderTotalAmount/>
                    </div>
                ) :
                (
                    <p className="text-richblack-100 text-xl font-medium mx-auto w-full">Your Cart is Empty</p>
                )
            }
        </div>
    )
}

export default Cart