const Section = require("../models/Section");
const SubSection = require("../models/Sub-Section");
const uploadFileToCloudinary = require("../utils/imageUploader")
require("dotenv").config();
//create sub section handler
exports.createSubSection = async(req,res) =>{
    try {
        //fetch the data from req body

        const {title,description,sectionID} = req.body;
        const video = req.files.videoFile;
        //validate the data
        if(
            !title || 
            !description || 
            !sectionID || 
            !video
        ){
            return res.status(404).json({
                succcess:false,
                message:"All fields are required",
            })
        }
        //upload the video to cloudinary
        const videoURL = await uploadFileToCloudinary(video,process.env.FOLDER_NAME);

        //create entry in subsection schema
        const subSectionDetails = await SubSection.create({
            title,
            timeDuration:`${videoURL.duration}`,
            description,
            videoURL: videoURL.secure_url,
        })

        //insert in section
        const newSection = await Section.findByIdAndUpdate(
            {_id : sectionID},
            {
                $push:{
                    subSection: subSectionDetails._id,
                }
            },
            {new:true}
        ).populate({
            path:"subSection",
        });

        // again we will be using populate but not in multilevel so we can directly write just the name without mentioning path

        //return response
        return res.status(200).json({
            success:true,
            message:"Sub section created successfully",
            data:newSection
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Some error occured while creating sub section,Please try again",
        })
    }
};


// HW: update the subsection handler(done)
exports.updateSubSection = async(req,res) =>{
    try {
        //fetch the data of subsection
        const {title,description,subSectionID,sectionID} = req.body;

        const subSection = await SubSection.findById({_id:subSectionID});
        
        if(title !== undefined){
            subSection.title = title;
        }

        if(description !== undefined){
            subSection.description = description;
        }

        if(req.files && req.files.videoFile !== undefined){

            const video = req.files.videoFile;
            const uploadDetails = await uploadFileToCloudinary(video,process.env.FOLDER_NAME);
            subSection.videoURL = uploadDetails.secure_url;
            subSection.timeDuration = uploadDetails.duration;
        }   

        await subSection.save();

        const updatedSection = await Section.findById(sectionID).populate("subSection").exec();

        //return response
        return res.status(200).json({
            success:true,
            message:"Subsection edited successfully",
            data:updatedSection,
        });
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Sub-section could not be updated,Please try again later",
        });
    }
}

// HW: delete subsection handler(done)
exports.deleteSubSection = async (req,res) =>{
    try {
        //fetch the subsection id
        const {subSectionID,sectionID} = req.body;
        // validate the subsection id  
        if(!subSectionID){
            return res.status(400).json({
                success:false,
                message:"Invalid Sub-Section ID",
            });
        }
        // use CRUD operation to delete subsection
        const subSection = await SubSection.findByIdAndDelete({_id : subSectionID});
        if(!subSection){
            return res.status(404).json({
                success:false,
                message:"SubSection not found"
            })
        }

        const updatedSection = await Section.findById(sectionID).populate("subSection")

        // return response
        return res.status(200).json({
            success:true,
            message:"Sub-Section deleted successfully",
            data:updatedSection,
        });
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Could not delete Sub-Section, Please try again later",
        });
    }
}