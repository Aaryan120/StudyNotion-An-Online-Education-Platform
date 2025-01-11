//import the required schemas
const Profile = require("../models/Profile");
const User = require("../models/User");
const Course = require("../models/Course");
const uploadFileToCloudinary = require("../utils/imageUploader");
const {convertSecondsToDuration} = require("../utils/secToDuration");
const CourseProgress = require("../models/CourseProgress");


//update profile
exports.updateProfile = async(req,res) =>{
    try {
        //fetch the details 
        const {firstName="",lastName="",gender = "",contactNumber = "",dateOfBirth="",about=""} = req.body;
        //get user id
        const userID = req.user.id;

        //find profile
        const userDetails = await User.findById({_id : userID});
        const profileID = userDetails.additionalDetails;

        //update the db
        await Profile.findByIdAndUpdate(
            {_id : profileID},
            {
                $set:{
                    gender:gender,
                    contactNumber:contactNumber,
                    about:about,
                    dateOfBirth:dateOfBirth,
                }
            },
            {new:true}
        );


        const updatedUserDetails = await User.findByIdAndUpdate({_id : userID},
            {
                $set:{
                    firstName:firstName,
                    lastName:lastName,
                }
            },
            {new:true}
        ).populate("additionalDetails").exec();
        //return response
        return res.status(200).json({
            success:true,
            message:"Profile updated successfully",
            data:updatedUserDetails,
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Some error occured while updating profile,Please try again",
        });
    }
}

//delete account
//explore how can we schedule this deletion operation
exports.deleteAccount = async(req,res) =>{
    try {
        //fetch the userID and profile id
        const userID = req.user.id;
        //validate user id
        if(!userID){
            return res.status(404).json({
                success:false,
                message:"Could not find the user,Please try again"
            })
        }
        //get profile id
        const userDetails = await User.findById({_id: userID});
        const profileID = userDetails.additionalDetails;
        //update the enrolled count in courses
        // get the array of all courses enrolled in
        const courses = userDetails.courses;
        //delete the student from student enrolled array in course schema
        //pull the student id from the student enrolled array
        for(const courseId of courses){
            await Course.findByIdAndUpdate(
                {_id: courseId},
                {
                    $pull:{
                        studentEnrolled: userID,
                    }
                },
                {new: true}
            );
        }
        //delete the account from user schema and profile schema
        //first delete the profile
        await Profile.findByIdAndDelete({_id: profileID});
        //delete the user
        await User.findByIdAndDelete({_id: userID});
        
        
        //return response
        return res.status(200).json({
            success:true,
            message:"Account deleted successfully",
        });
    } catch (error) {
        return res.status(400).json({
            success:false,
            message:"Could not delete the account,Please try again"
        })
    }
}

//get all user details
exports.getAllUserDetails = async(req,res) =>{
    try {
        //fetch the user id
        const userID = req.user.id
        //validate the user
        if(!userID){
            return res.status(400).json({
                success:false,
                message:"User not found",
            })
        }
        //fetch all the details of the user
        const userDetails = await User.findById({_id : userID}).populate("additionalDetails").exec();
        //return response
        return res.status(200).json({
            success:true,
            message:"User details found successfully",
            userDetails
        })

    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Could not fetch the details of user,Please try again",
        });        
    }
}

// update display picture (handler function) (NEW HANDLER FUNCTION)
exports.updateDisplayPicture = async (req,res) =>{
    try {
        // fetch the data and user id
        const imageFile = req.files.displayPicture
        const userID = req.user.id
        // validate the data
        if(!imageFile){
            return res.status(404),json({
                success:false,
                message:"Please provide an image",
            })
        }
        // upload image to cloudinary
        const image = await uploadFileToCloudinary(
            imageFile,
            process.env.FOLDER_NAME,
            1000,
            1000
        );
        // update the image for the user
        const updatedProfile = await User.findByIdAndUpdate(
            {_id: userID},
            {
                imageUrl:image.secure_url,
            },
            {new:true},
        );
        // return response
         
        return res.status(200).json({
            success:true,
            message:"Profile Picture Updated Successfully",
            data:updatedProfile,
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Profile Picture Update Failed, Please Try Again Later",
        })
    }
}

// Get Enrolled Courses (NEW HANDLER FUNCTION)
exports.getEnrolledCourses = async (req,res) =>{
    try {
        // Fetch the user id
        const userID = req.user.id;
        // Get all the enrolled courses
        let userDetails = await User.findById({_id : userID})
                                        .populate({
                                            path: "courses",
                                            populate :{
                                                path:"courseContent",
                                                populate:{
                                                    path:"subSection",
                                                },
                                            },
                                        }).exec();
        
                                        
        userDetails = userDetails.toObject()
        var SubsectionLength = 0
        for (var i = 0; i < userDetails.courses.length; i++) {
            let totalDurationInSeconds = 0
            SubsectionLength = 0
            for (var j = 0; j < userDetails.courses[i].courseContent.length; j++) {
            totalDurationInSeconds += userDetails.courses[i].courseContent[j].subSection.reduce((acc, curr) => acc + parseInt(curr.timeDuration), 0)
            userDetails.courses[i].totalDuration = convertSecondsToDuration(totalDurationInSeconds)
            SubsectionLength +=
                userDetails.courses[i].courseContent[j].subSection.length
            }
            let courseProgressCount = await CourseProgress.findOne({
            courseID: userDetails.courses[i]._id,
            userID: userID,
            })
            courseProgressCount = courseProgressCount?.completedVideos.length
            if (SubsectionLength === 0) {
            userDetails.courses[i].progressPercentage = 100
            } else {
            // To make it up to 2 decimal point
            const multiplier = Math.pow(10, 2)
            userDetails.courses[i].progressPercentage =
                Math.round(
                (courseProgressCount / SubsectionLength) * 100 * multiplier
                ) / multiplier
            }
        }
        if(!userDetails){
            return res.status(400).json({
                success:false,
                message:`Could Not Find user with id : ${userID}`,
            })
        }
        // return response
        return res.status(200).json({
            success:true,
            message:"All Enrolled Courses Fetched Successfully",
            data: userDetails.courses,

        });
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Some error occured while fetching the course details",
        })
    }
}

exports.instructorDashboard = async (req,res) =>{
    try {
        const instructorId = req.user.id;
        const courseDetails = await Course.find({instructor: instructorId});

        const courseData = courseDetails.map((course) =>{
            const totalStudentsEnrolled = course.studentEnrolled.length;
            const totalRevenueGenerated = course.price * totalStudentsEnrolled;


            const courseDataWithStats = {
                _id : course._id,
                courseName: course.courseName,
                courseDescription: course.courseDescription,
                totalStudentsEnrolled,
                totalRevenueGenerated,
            } 

            return courseDataWithStats;
        })


        return res.status(200).json({
            success:true,
            message:"Instructor details fetched",
            data : courseData,
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Instructor details fetching failed",
        })
    }
}