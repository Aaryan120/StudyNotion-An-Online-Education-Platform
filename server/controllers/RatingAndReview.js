const ratingAndReview = require("../models/RatingAndReview");
const Course = require("../models/Course");
const { default: mongoose } = require("mongoose");

// Create Rating (handler function)
exports.createRating = async (req,res) =>{
    try {
        // Fetch the user ID
        const userID = req.user.id; 
        // Fetch the data
        const {courseID,rating,review} = req.body;
        // Validate the data
        if(
            !courseID ||
            !userID ||
            !rating || 
            !review
        ){
            return res.status(400).json({
                success:false,
                message:"All fields are required",
            })
        }
        // Check if user is enrolled in the course
        const isEnrolled = await Course.findOne({_id:courseID,"studentEnrolled" : userID});
        if(!isEnrolled){
            return res.status(404).json({
                success:false,
                message:"User is not enrolled in the course",
            })
        }
        // Check if user has already reviewed the course
        const alreadyReviewed = await ratingAndReview.findOne({"user" : userID,"course":courseID});
        if(alreadyReviewed){
            return res.status(403).json({
                success:false,
                message:"User has already reviewed the course",
            })
        }
        // Create rating
        const ratingDetails = await ratingAndReview.create({
            user : userID,
            rating,
            review,
            course:courseID,
        })
        // Insert the ratingID in course
        const updatedCourse = await Course.findByIdAndUpdate(
            {_id:courseID},
            {
                $push:{
                    ratingAndReviews:ratingDetails._id,
                }
            },
            {new:true},
        );
        // return response
        return res.status(200).json({
            success:true,
            message:"Rating and reviewing was successful",
            ratingDetails,
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Some error occured,Please try again later",
        })
    }
}


// Get average rating (handler function)
exports.getAverageRating = async (req,res) =>{
    try {
        // Fetch course ID
        const {courseID} = req.body;
        if(!courseID){
            return res.status(404).json({
                success:false,
                message: `Could not find the course with ${courseID}`,
            });
        }
        // Calculate the average rating
        const result = await ratingAndReview.aggregate([
            {
                $match:{
                    course: new mongoose.Types.ObjectId(courseID),
                }
            },
            {
                $group:{
                    _id:null,
                    averageRating:{ $avg : "$rating"},
                }
            }
        ])
        // return response
        if(averageRating.length > 0){
            return res.status(200).json({
                success:true,
                message:"Average Rating calculated successfully",
                averageRating: result[0].averageRating,
            })
        }
        else{
            return res.status(404).json({
                success:false,
                message:"Average rating is 0, No ratings given till now",
                averageRating:0,
            })
        }        
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Could not get the average rating",
        })
    }
}


// Get all rating (handler function)
exports.getAllRating = async (req,res) =>{
    try {
        // Get all the rating and Populate the user field and course field
        const allRatingDetails = await ratingAndReview.find({})
                                                    .sort({rating: -1})
                                                    .populate({
                                                        path:"user",
                                                        select:"firstName lastName email imageUrl",
                                                    })
                                                    .populate({
                                                        path:"course",
                                                        select:"courseName",
                                                    })
                                                   .exec();
        // return response
        return res.status(200).json({
            success:true,
            message:"All reviews fetched successfully",
            data: allRatingDetails,
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Could not get the average rating",
        })
    }
}

// Get rating on the basis of course (done)
// exports.getCourseRating = async (req,res) =>{
//     try {
//         // fetch the courseID
//         const {courseID} = req.body;
//         // Get all the rating and Populate the user field and course field
//         const allRatingDetails = await ratingAndReview.find({course:courseID})
//                                                     .sort({rating: -1})
//                                                     .populate({
//                                                         path:"user",
//                                                         select:"firstName lastName email image",
//                                                     })
//                                                     .populate({
//                                                         path:"course",
//                                                         select:"courseName",
//                                                     })
//                                                    .exec();
//         // return response
//         return res.status(200).json({
//             success:true,
//             message:"All reviews fetched successfully",
//             allRatingDetails,
//         })
//     } catch (error) {
//         return res.status(500).json({
//             success:false,
//             message:"Could not get the average rating",
//         })
//     }
// }