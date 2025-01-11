//razor pay instance
const {instance} = require("../config/razorpay");
const Course = require("../models/Course");
const User = require("../models/User");
const mailSender = require("../utils/mailSender");
const {courseEnrollmentEmail} = require("../mail/templates/courseEnrollmentEmail");
const crypto = require("crypto")
const {paymentSuccessEmail} = require("../mail/templates/paymentSuccessEmail");
const CourseProgress = require("../models/CourseProgress");

// Writing payment capture and verification for multiple items
// Initiate the razorpay order
exports.capturePayment = async (req,res) =>{
    const {courses} = req.body;
    const userId = req.user.id;


    if(courses.length === 0){
        return res.status(404).json({
            success:false,
            message:"Please provide Course ID",
        })
    }

    let totalAmount = 0;

    for (const course_id of courses){
        let course;
        try {
            course = await Course.findById(course_id);

            if(!course){
                return res.status(404).json({
                    success:false,
                    message:"Course Not Found",
                })
            }

            // Validate whether the user is already present in the course
            const userDetails = await User.findById(userId);
            const userCourses = userDetails.courses;
            if(userCourses.includes(course_id)){
                return res.status(401).json({
                    success:false,
                    message:`Course with Id: ${course_id} already bought`
                })
            }
            totalAmount += course.price;
        } catch (error) {
            return res.status(500).json({
                success:false,
                message:"Internal Server Error",
            })
        }
    }

    const options = {
        amount: totalAmount*100,
        currency:"INR",
        receipt: Math.random(Date.now()).toString(),
    }

    try {
        const paymentResponse = await instance.orders.create(options);
        res.json({
            success:true,
            message:"Payment captures successfully",
            data:paymentResponse,
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Could not initiate order",
        })
    }
}



// verify the payment
exports.verifyPayment = async (req,res) =>{
    const razorpay_order_id = req.body?.razorpay_order_id
    const razorpay_payment_id = req.body?.razorpay_payment_id
    const razorpay_signature = req.body?.razorpay_signature
    const courses = req.body?.courses


    const userId = req.user.id

    if (
        !razorpay_order_id ||
        !razorpay_payment_id ||
        !razorpay_signature ||
        !courses ||
        !userId
    ) {
    return res.status(500).json({
        success: false, 
        message: "Payment Failed" })
    }

    let body = razorpay_order_id + "|"  + razorpay_payment_id

    const expectedSignature = crypto
    .createHmac("sha256",process.env.RAZORPAY_SECRET)
    .update(body.toString())
    .digest("hex")

    if(expectedSignature === razorpay_signature){
        await enrollStudents(courses,userId,res)
        return res.status(200).json({
            success:true,
            message:"Payment verified",
        })
    }
}

const enrollStudents = async (courses,userId,res) =>{
    if(!courses || !userId){
        return res.status.json({
            success:false,
            message:"Please provide course id and user id",
        })
    }

    for(const courseId of courses){
        try {
            const enrolledCourse = await Course.findOneAndUpdate(
                {_id:courseId},
                {
                    $push:{
                        studentEnrolled:userId,
                    }
                },
                {new:true},
            )

            if(!enrolledCourse){
                return res.status(500).json({
                    success:false,
                    message:"Course not found",
                })
            }

            const courseProgress = await CourseProgress.create({
                courseID: courseId,
                completedVideos:[],
                userID:userId,
            })

            const enrolledStudent = await User.findByIdAndUpdate(
                userId,
                {
                    $push:{
                        courses:courseId,
                        courseProgress:courseProgress._id,
                    }
                },
                {new:true},
            )
            
            // send an email notification to the enrolled student
            const emailResponse = await mailSender(
                enrolledStudent.email,
                `Successfully Enrolled into ${enrolledCourse.courseName}`,
                courseEnrollmentEmail(enrolledCourse.courseName,
                    `${enrolledStudent.firstName} ${enrolledStudent.lastName}`
                )
            )
        } catch (error) {
            return res.status(400).json({
                success:false,
                message:error.message,
            })
        }
    }
}


exports.sendPaymentSuccessEmail = async (req,res) =>{
    const {orderId,paymentId,amount} = req.body

    const userId = req.user.id;

    if(
        !orderId || 
        !paymentId || 
        !amount || 
        !userId
    ){
        return res.status(400).json({
            success:false,
            message:"Please provide all the details",
        })
    }


    try {
        const enrolledStudent = await User.findById(userId);

        await mailSender(
            enrolledStudent.email,
            `Payment Received`,
            paymentSuccessEmail(
                `${enrolledStudent.firstName} ${enrolledStudent.lastName}`,
                amount / 100,
                orderId,
                paymentId,
            )
        )
    } catch (error) {
        return res.status(400).json({
            success:false,
            message:"Could not send email",
        })
    }
}


// //capture payment and initiate the razor pay order
// exports.capturePayment = async(req,res) =>{
//     try {
//         //fetch the course id and the user id
//         const {courses} = req.body;
//         const userID = req.user.id;
//         //validate the data
//         if(courses.length === 0){
//             return res.json({success:false,message:"Please Provide Course ID"});
//         }
        
//         let totalAmount = 0;

//         for(const courseID of courses){
//             let course
//             try {
//                 // Find the course by its ID
//                 course = await Course.findById(courseID);

//                 // If the course is not found
//                 if(!course){
//                     return res.status(404).json({
//                         success:false,
//                         message: "Could not find the course",
//                     })
//                 }

//                 //validate whether user already has the course or not
//                 const userDetails = await User.findById({_id:userID});
//                 const userCourseDetails = userDetails.courses;
//                 if(userCourseDetails.includes(courseID)){
//                     return res.status(400).json({
//                         success:false,
//                         message:"user already has the course",
//                     });
//                 }
//                 totalAmount += course.price;
//             } catch (error) {
//                 console.log(error);
//                 return res.status(500).json({
//                     success:false,
//                     message:"Some error occured while processing the course, Please try again later"
//                 })
//             }
//         }
        
//         const currency = "INR";
//         const options = {
//             amount : totalAmount*100,
//             currency : currency,
//             receipt : Math.random(Date.now()).toString(),
//             // notes: {
//             //     courseID,
//             //     userID,
//             // },
//         }
//         try {
//             // Initiate the payment using Razorpay
//             const paymentResponse = await instance.orders.create(options);
//             console.log(paymentResponse);
//             //return response
//             return res.status(200).json({
//                 success:true,
//                 message:"Payment done successfully",
//                 data:paymentResponse,
//             })
//         } catch (error) {
//             console.log(error);
//             return res.status(500).json({
//                 success:false,
//                 message:"Could not initiate order",
//             })
//         }
//     } catch (error) {
//         return res.status(404).json({
//             success:false,
//             message:"Could not process the payment,Please try again",
//         })
//     }
// };

// //verify signature for authorization
// exports.verifySignature = async(req,res) =>{

//     const razorpay_order_id = req.body?.razorpay_order_id
//     const razorpay_payment_id = req.body?.razorpay_payment_id
//     const razorpay_signature = req.body?.razorpay_signature
//     const courses = req.body?.courses


//     const userId = req.user.id

//     if (
//         !razorpay_order_id ||
//         !razorpay_payment_id ||
//         !razorpay_signature ||
//         !courses ||
//         !userId
//     ) {
//     return res.status(500).json({
//         success: false, 
//         message: "Payment Failed" })
//     }

//     let body = razorpay_order_id + "|"  + razorpay_payment_id

//     const expectedSignature = crypto
//     .createHmac("sha256",process.env.RAZORPAY_SECRET)
//     .update(body.toString())
//     .digest("hex")

//     if(expectedSignature === razorpay_signature){
//         await enrollStudents(courses,userId,res)
//         return res.status(200).json({
//             success:true,
//             message:"Payment verified",
//         })
//     }


//     // //fetch the signature from the request
//     // const signature = req.header["x-razorpay-signature"];

//     // const shasum = crypto.createHmac("sha256",process.env.RAZORPAY_SECRET);

//     // shasum.update(JSON.stringify(req.body)); 
//     // const digest = shasum.digest("hex");
//     // //match the signature
//     // if(signature === digest){
//     //     console.log("Payment is authorized");
        
//         // We will be getting the userID and courseID from the "note" 
//         // "Note" was passed when the order was created
//         // const {courseID,userID} = req.body.payload.payment.entity.notes;

//         // try {
//         //     // Add the course to the userID 
//         //     const userDetails = await User.findByIdAndUpdate(
//         //         userID,
//         //         {
//         //             $push:{
//         //                 courses:courseID,
//         //             }
//         //         },
//         //         {new:true},
//         //     );
            

//         //     if(!userDetails){
//         //         return res.status(500).json({
//         //             success:false,
//         //             message:"User not found",
//         //         });
//         //     }

//         //     console.log(userDetails);

//             // enroll the student in the course
//             // const courseDetails = await Course.findByIdAndUpdate(
//             //     courseID,
//             //     {
//             //         $push:{
//             //             studentEnrolled: userID,
//             //         }
//             //     },
//             //     {new:true},
//             // );

//             // if(!courseDetails){
//             //     return res.status(500).json({
//             //         success:false,
//             //         message:"Course not found",
//             //     });
//             // }

//             // console.log(courseDetails);


//             // Send confirmation mail

//     //         const emailResponse = await mailSender(userDetails.email,"Congratulations from LearnSphere",courseEnrollmentEmail);
//     //         console.log(emailResponse);

//     //         return res.status(200).json({
//     //             success:true,
//     //             message:"Signature Verified and Course added"
//     //         })
//     //     } catch (error) {
//     //         return res.status(500).json({
//     //             success:false,
//     //             message:error.message,
//     //         })
//     //     }
//     // }
//     // else{
//     //     return res.status(400).json({
//     //         success:false,
//     //         message:"Invalid Request",
//     //     })
//     // }
// }

