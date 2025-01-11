import toast from "react-hot-toast";
import { apiconnector } from "../apiconnector";
import rzpLogo from "../../assets/Logo/rzp_logo.png"
import { setPaymentLoading } from "../../slices/courseSlice";
import { resetCart } from "../../slices/cartSlice"; 
const { studentEndpoints } = require("../apis");

const {
    COURSE_PAYMENT_API,
    COURSE_VERIFY_API,
    SEND_PAYMENT_SUCCESS_EMAIL_API
} = studentEndpoints


function loadScript(src){
    return new Promise((resolve) =>{
        const script =  document.createElement("script");
        script.src = src;

        script.onload = () =>{
            resolve(true);
        }

        script.onerror = () =>{
            resolve(false);
        }
        document.body.appendChild(script);
    })
}

export async function buyCourse(token,courses,userDetails,navigate,dispatch){
    const toastId = toast.loading("Loading...");
    try {
        // Load the script
        const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");

        if(!res){
            toast.error("RazorPay SDK failed to load");
            return;
        }

        // Initiate the order
        const orderResponse = await apiconnector("POST",COURSE_PAYMENT_API,{courses},{
            Authorization:`Bearer ${token}`,
        })


        if(!orderResponse.data.success){
            throw new Error(orderResponse.data.message);
        }


        const options = {
            key: process.env.RAZORPAY_KEY,
            currency: orderResponse.data.data.currency,
            amount:orderResponse.data.data.amount,
            order_id:orderResponse.data.data.id,
            name:"StudyNotion",
            description:"Thank You for Purchasing the Course",
            image:rzpLogo,
            prefill:{
                name:`${userDetails.firstName} ${userDetails.lastName}`,
                email:userDetails.email
            },
            handler:function(response){
                // Send Successfull payment mail
                sendPaymentSuccessEmail(response,orderResponse.data.data.amount,token);
                // Verify Payment
                verifyPayment({...response,courses},token,navigate,dispatch);
            }
        }

        // Open the payment modal(important)
        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
        paymentObject.on("Payment Failed",function(response){
            toast.error("Payment Failed,Please Try again later");
            console.log(response.error);
        })
    } catch (error) {
        console.log("PAYMENT API ERROR",error);
        toast.error(error.response.data.message);
    }
    toast.dismiss(toastId);
}

async function sendPaymentSuccessEmail(response,amount,token){
    try {
        await apiconnector("POST",SEND_PAYMENT_SUCCESS_EMAIL_API,{
            orderId: response.razorpay_order_id,
            paymentId:response.razorpay_payment_id,
            amount
        },{
            Authorization:`Bearer ${token}`,
        })
    } catch (error) {
        console.log("PAYMENT SUCCESS EMAIL ERROR",error);
    }
}


// Verify Payment
async function verifyPayment(bodyData,token,navigate,dispatch){
    const toastId = toast.loading("Verifying Payment...");
    dispatch(setPaymentLoading(true));
    try {
        const response = await apiconnector("POST",COURSE_VERIFY_API,bodyData,{
            Authorization:`Bearer ${token}`
        })

        if(!response.data.success){
            throw new Error(response.data.message);
        }

        toast.success("Payment Successfull, You are added to the course");
        navigate("/dashboard/enrolled-courses");
        dispatch(resetCart());
    } catch (error) {
        console.log("PAYMENT VERIFY ERROR",error);
        toast.error(error.response.data.message);
    }
    toast.dismiss(toastId);
    dispatch(setPaymentLoading(false));
}