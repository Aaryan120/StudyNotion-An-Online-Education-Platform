const CourseProgress = require("../models/CourseProgress");
const SubSection = require("../models/Sub-Section");

exports.updateCourseProgress = async (req,res) =>{
    const {courseId,subSectionId} = req.body;
    const userId = req.user.id;

    try {
        const subSectionDetails = await SubSection.findById({_id:subSectionId});

        if(!subSectionDetails){
            return res.status(404).json({
                success:false,
                message:"Could not find the sub-section"
            })
        }

        let courseProgress = await CourseProgress.findOne({
            courseID:courseId,
            userID:userId,
        })
        
        if(!courseProgress){
            return res.status(404).json({
                success:false,
                message:"Course progress does not exist"
            })
        }else{
            // check for re-completing video
            if(courseProgress.completedVideos.includes(subSectionId)){
                return res.status(400).json({
                    success:false,
                    message:"Subsection already completed",
                })
            }


            courseProgress.completedVideos.push(subSectionId);
        }
        await courseProgress.save();
        return res.status(200).json({
            success:true,
            message:"Successfully updated the progress"
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"INTERNAL SERVER ERROR"
        })
    }
}