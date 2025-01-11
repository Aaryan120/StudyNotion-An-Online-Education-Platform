//import the course model
const Course = require("../models/Course");
const Category = require("../models/Category");
const User = require("../models/User");
const uploadFileToCloudinary = require("../utils/imageUploader")
const {convertSecondsToDuration} = require("../utils/secToDuration");
const CourseProgress = require("../models/CourseProgress");
const Section = require("../models/Section");
const SubSection = require("../models/Sub-Section")
require("dotenv").config();



//create course handler function
exports.createCourse = async(req,res) =>{
    try {
        //fetch the details of a course
        const {
            courseName,
            courseDescription,
            whatYouWillLearn,
            price,
            category,
            tag: _tag,
            status,
            instructions:_instructions
        } = req.body;
        //image will be accessed by files
        const thumbnail = req.files.thumbnailImage;
        // Convert the tag and instructions from stringified Array to Array
        const tag = JSON.parse(_tag)
        const instructions = JSON.parse(_instructions)



        //validate the data
        if(
            !courseName ||
            !courseDescription || 
            !price || 
            !thumbnail || 
            !whatYouWillLearn || 
            !category || 
            !tag.length ||
            !instructions.length
        ){
            return res.status(400).json({
                success:false,
                message:"All fields are mandatory",
            })
        }
        if(!status || status === undefined){
            status = "Draft"
        }


        //check for instructor
        const userID = req.user.id;
        const instructorDetails = await User.findById(userID,{
            accountType:"Instructor",
        });
        
        if(!instructorDetails){
            return res.status(404).json({
                success:false,
                message:"Instructor Details not found",
            })
        }
        
        //validate the tags (if the tag is valid or not)
        const categoryDetails = await Category.findById(category);

        if(!categoryDetails){
            return res.status(401).json({
                success:false,
                message:"Category is not valid,Please choose a valid Category",
            });
        };

        //upload image to cloudinary

        const imageDetails = await uploadFileToCloudinary(thumbnail,process.env.FOLDER_NAME);



        //create a new entry in the db
        
        const newCourse = await Course.create({
            courseName,
            courseDescription,
            price,
            instructor:instructorDetails._id,
            whatYouWillLearn,
            category:categoryDetails._id,
            thumbnail:imageDetails.secure_url,
            tag,
            status:status,
            instructions,
        });

        //Add the new course to the user schema of the instructor
        await User.findByIdAndUpdate({_id:instructorDetails._id},
            {
                $push:{
                    courses:newCourse._id,
                }
            },
            {new:true},
        );

        // Add the new course to the categories
        await Category.findByIdAndUpdate({_id: category},
            {
                $push:{
                    course:newCourse._id
                }
            },
            {new:true},
        );

        //return response
        return res.status(200).json({
            success:true,
            message:"Course successfully created",
            data: newCourse,
        });

    } catch (error) {

        return res.status(500).json({
            success:false,
            message:"Some error occured while creating the course,Please try again",
        });
    }
}

exports.editCourse = async (req, res) => {
    try {

      const { courseId } = req.body
      const updates = req.body
      const course = await Course.findById(courseId)
  
      if (!course) {
        return res.status(404).json({ error: "Course not found" })
      }
  
      // If Thumbnail Image is found, update it
      if (req.files) {

        const thumbnail = req.files.thumbnailImage
        const thumbnailImage = await uploadFileToCloudinary(
          thumbnail,
          process.env.FOLDER_NAME
        )
        course.thumbnail = thumbnailImage.secure_url
      }
  
      // Update only the fields that are present in the request body
      for (const key in updates) {
        if (updates.hasOwnProperty(key)) {
          if (key === "tag" || key === "instructions") {
            course[key] = JSON.parse(updates[key])
          } else {
            course[key] = updates[key]
          }
        }
      }
  
      await course.save()
  
      const updatedCourse = await Course.findOne({
        _id: courseId,
      })
        .populate({
          path: "instructor",
          populate: {
            path: "additionalDetails",
          },
        })
        .populate("category")
        .populate("ratingAndReviews")
        .populate({
          path: "courseContent",
          populate: {
            path: "subSection",
          },
        })
        .exec()
  
      res.json({
        success: true,
        message: "Course updated successfully",
        data: updatedCourse,
      })
    } catch (error) {
    //   console.error(error)
      res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error.message,
      })
    }
  }


// Get all courses (handler function)
exports.getAllCourses = async(req,res) =>{
    try {
        //fetch details and use the find method
        const allCourses = await Course.find(
            {status:"Published"},
            {
                courseName:true,
                courseDescription:true,
                price:true,
                thumbnail:true,
                instructor:true,
                ratingAndReviews:true,
                studentEnrolled:true
            })
            .populate("instructor")
            .exec();

        //return res with all courses
        return res.status(200).json({
            success:true,
            message:"All courses fetched successfully",
            data: allCourses,
        });
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Could not get the courses,Please try again later"
        })
    }
}

// Get course details for a particular course (handler function) ((HW)done)
exports.getCourseDetail = async (req,res) =>{
    try {
        // Fetch the courseID from request body
        const {courseId} = req.body;
        // Validate the Data
        // if(!courseId){
        //     return res.status(400).json({
        //         success:false,
        //         message:"Could not find the course (Invalid Course ID)",
        //     });
        // }
        // Get the coure Details and populate
        const courseDetails = await Course.findById({_id : courseId})
                                                    .populate({
                                                        path: "instructor",
                                                        populate: {
                                                        path: "additionalDetails",
                                                        },
                                                    })
                                                    .populate("category")
                                                    .populate("ratingAndReviews")
                                                    .populate({
                                                        path: "courseContent",
                                                        populate: {
                                                        path: "subSection",
                                                        select: "-videoUrl",
                                                        },
                                                    })
                                                    .exec()
        if(!courseDetails){
            return res.status(400).json({
                success:false,
                message:`Could not find the course with ${courseId}`,
            })
        }

        let totalDurationInSeconds = 0;
        courseDetails.courseContent.forEach((content) =>{
            content.subSection.forEach((subSection) =>{
                const timeDurationInSeconds = parseInt(subSection.timeDuration)
                totalDurationInSeconds += timeDurationInSeconds
            })
        })
        const totalDuration = convertSecondsToDuration(totalDurationInSeconds);


        // Return response
        return res.status(200).json({
            success:true,
            message:"Course details fetched successfully",
            data:{
                courseDetails,
                totalDuration,
            }
        })
    } catch (error) {

        return res.status(500).json({
            success:false,
            message:"Could not get the course details, Please try again later",
        });
    }
}



// Get full course detail Handler
exports.getFullCourseDetail = async (req,res) =>{
    try {
        // fetch course id
        const {courseId} = req.body;
        // fetch user id for getting course progress
        const userId = req.user.id;

        const courseDetails = await Course.findOne({
            _id:courseId,
        }).populate({
            path: "instructor",
            populate: {
              path: "additionalDetails",
            },
          })
          .populate("category")
          .populate("ratingAndReviews")
          .populate({
            path: "courseContent",
            populate: {
              path: "subSection",
            },
          })
          .exec()
          

        let courseProgressCount = await CourseProgress.findOne({
            courseID:courseId,
            userID:userId,
        })

        if(!courseDetails){
            return res.status(404).json({
                success:false,
                message:"Could not find course"
            })
        }

        let totalDurationInSeconds = 0;

        courseDetails.courseContent.forEach((content) =>{
            content.subSection.forEach((subSection) =>{
                const timeDurationInSeconds = parseInt(subSection.timeDuration)
                totalDurationInSeconds += timeDurationInSeconds
            })
        })


        const totalDuration = convertSecondsToDuration(totalDurationInSeconds);


        return res.status(200).json({
            success:true,
            message:"Course Details Fetched Successfully",
            data:{
                courseDetails,
                totalDuration,
                completedVideos: courseProgressCount?.completedVideos ?
                courseProgressCount?.completedVideos :
                [],
            },
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:error.message,
        })
    }
}



// Get Instructor specific courses handler
exports.getInstructorCourses = async (req,res) =>{
    try {
        // fetch the data
        const instructorId = req.user.id;

        const instructorCourses = await Course.find({
            instructor: instructorId,
        }).sort({ createdAt: -1 })

        
        
        return res.status(200).json({
            success:true,
            message:"Instructor Courses Fetched Successfully",
            data: instructorCourses
        });
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Internal server error",
        })
    }
}

exports.deleteCourse = async (req,res) =>{
    try {
        // fetch the course id 
        const {courseId} = req.body;

        const courseDetails = await Course.findById(courseId);

        if(!courseDetails){
            return res.status(404).json({
                success:false,
                message:"Could not find the course",
            })
        }
        // Delete the students from the course
        const students = courseDetails.studentEnrolled;

        for(const student of students){
            await User.findByIdAndUpdate(
                {_id:student},
                {
                    $pull:{
                        courses: courseId,
                    }
                },
                {new:true},
            )
        }

        // Delete Course from coursecategory
        const category = courseDetails.category;
        await Category.findByIdAndUpdate(
            {_id:category},
            {
                $pull:{
                    course:courseId,
                }
            },
            {new:true},
        );
        // delete the sections and the sub sections
        const courseSections = courseDetails.courseContent;

        for(const sectionId of courseSections){
            const section = await Section.findById(sectionId);
            if(section){
                const subsections = section.subSection;
            
                for(const subSectionId of subsections){
                    await SubSection.findByIdAndDelete(subSectionId);
                }

            }
            
            await Section.findByIdAndDelete(sectionId);
        }

        // delete the course
        await Course.findByIdAndDelete({_id:courseId});


        return res.status(200).json({
            success:true,
            message:"Course Deleted Successfully",
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Course Deletion Failed",
        })
    }
}
