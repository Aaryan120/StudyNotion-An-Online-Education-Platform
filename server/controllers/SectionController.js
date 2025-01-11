//import the required fields
const Course = require("../models/Course")
const Section = require("../models/Section");
const SubSection = require("../models/Sub-Section");


//create section handler
exports.createSection = async(req,res) =>{
    try {
        //fetch the details from the body
        const {sectionName,courseId} = req.body;
        //validate the data
        if(!sectionName || !courseId){
            return res.status(400).json({
                success:false,
                message:"All fields are required"
            })
        }

        //create an entry in db
        const sectionDetails = await Section.create({sectionName});

        //insert into courseContent field in course model
        const updatedCourseDetails = await Course.findByIdAndUpdate(
            courseId,
            {
                $push:{
                    courseContent: sectionDetails._id,
                }
            },
            {new:true}
        ).populate({
            path:"courseContent",
            populate:{path: "subSection"}
        }).exec();
        // the above implementation can be done by using populate across multiple levels
        // path indicates which field we want to populate


        //return response
        return res.status(200).json({
            success:true,
            message:"Section created successfully",
            data:updatedCourseDetails
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Some error occured while creating course,Please try again",
        });
    }
}

//update section handler
exports.updateSection = async(req,res) =>{
    try {
        //fetch the details and sectionID from the body
        const {sectionName,sectionID,courseId} = req.body;

        //validate the details
        if(!sectionName || !sectionID){
            return res.status(400).json({
                success:false,
                message:"All fields are required",
            })
        }
        //fetch the Section object and update
        const sectionObj = await Section.findByIdAndUpdate(
            sectionID,
            {
                sectionName,
            },
            {new:true},
        );

        const course = await Course.findById(courseId).populate({
            path:"courseContent",
            populate:{
                path:"subSection",
            }
        }).exec();
        //return response
        return res.status(200).json({
            success:true,
            message:"Section updated successfully",
            data:course,
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Could not update the section,Please try again",
        })        
    }
}


//delete section handler
exports.deleteSection = async(req,res) =>{ 
    try {
        //fetch the details
        const {sectionID,courseId} = req.body;
        await Course.findByIdAndUpdate(courseId,
            {
                $pull:{
                    courseContent:sectionID,
                }
            }
        )
        //find the section
        const section = await Section.findById({_id : sectionID});
        
        if(!section){
            return res.status(404).json({
                successs:false,
                message:"Section not found"
            })
        }
        await SubSection.deleteMany({
            _id: {$in: section.subSection}
        })

        await Section.findByIdAndDelete(sectionID);

        const course = await Course.findById(courseId).populate({
            path:"courseContent",
            populate:{
                path:"subSection"
            }
        }).exec();
        //return response
        return res.status(200).json({
            success:true,
            message:"Section delete successfully",
            data:course
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Could not delete the section,Please try again"
        })        
    }
}
