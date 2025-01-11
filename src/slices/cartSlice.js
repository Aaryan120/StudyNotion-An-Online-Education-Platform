import { createSlice } from "@reduxjs/toolkit";
import {toast} from "react-hot-toast";

const initialState = {
    cart : localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : [],
    totalItems : localStorage.getItem("totalItems") ? JSON.parse(localStorage.getItem("totalItems")) : 0,
    total : localStorage.getItem("total") ? JSON.parse(localStorage.getItem("total")) : 0
}

const cartSlice = createSlice({
    name:"cart",
    initialState,
    reducers:{
        addToCart : (state,action) =>{
            const course = action.payload;
            const index = state.cart.findIndex((item) =>item._id === course._id)
            

            if(index >= 0){
                toast.error("Course already in cart")
                return;
            }

            state.cart.push(course);
            state.totalItems++;
            state.total += course.price;

            // Update to Local storage
            localStorage.setItem("cart",JSON.stringify(state.cart));
            localStorage.setItem("total",JSON.stringify(state.total));
            localStorage.setItem("totalItems",JSON.stringify(state.totalItems));

            toast.success("Course added to cart");
        },
        removeFromCart: (state,action) =>{
            const courseId = action.payload;
            const index = state.cart.findIndex((item) => item._id === courseId);

            if(index >= 0){
                state.totalItems--;
                state.total -= state.cart[index].price;
                state.cart.splice(index,1);

                // Update the local store
                localStorage.setItem("cart",JSON.stringify(state.cart));
                localStorage.setItem("total",JSON.stringify(state.total));
                localStorage.setItem("totalItems",JSON.stringify(state.totalItems));
                toast.success("Course removed from cart");
            }
        },
        resetCart: (state) =>{
            state.total = 0;
            state.totalItems = 0;
            state.cart = [];

            // Update the local store
            localStorage.removeItem("cart");
            localStorage.removeItem("total");
            localStorage.removeItem("totalItems");
            toast.success("Course removed from cart");
        }
    }
})

export const {addToCart,removeFromCart,resetCart} = cartSlice.actions
export default cartSlice.reducer
