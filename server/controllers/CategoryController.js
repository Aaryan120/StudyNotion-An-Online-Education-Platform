//import the tags model
const Category = require("../models/Category");
// const Course = require("../models/Course");
function getRandomInt(max) {
    return Math.floor(Math.random() * max)
  }

//create tag handler function
exports.createCategory = async(req,res) =>{
    try {
        //fetch the data from req body
        const {name,description} = req.body;
        
        //validation of the data  
        if(!name || !description){
            return res.status(400).json({
                success:false,
                message:"All fields are required",
            });
        }
        
        //create entry in db
        const categoryDetails = await Category.create({
            categoryName:name,
            categoryDescription: description,
        });


        //return response
        return res.status(200).json({
            success:true,
            message:"Category created successfully",
        });

    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Some error occured while creating the Category, Please try again",
        });
    }
}

//show all categories handler function
exports.showAllCategories = async(req,res) =>{
    try {
        //fetch all categories from the db 
        const allCategories = await Category.find({},{categoryName:true,categoryDescription:true,course:true});

        //return response with all categories
        res.status(200).json({
            success:true,
            message:"All categories returned successfully",
            data : allCategories,
        });
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Some error occured while fetching all categories,Please try again",
        })
    }
}

// Category page details
exports.categoryPageDetails = async (req,res) =>{
    try {
        // Fetch the data 
        const {categoryID} = req.body;
        // get course for the category
        const selectedCategoryCourse = await Category.findById({_id : categoryID})
                                                    .populate({
                                                                path:"course",
                                                                populate:{path:"instructor"}
                                                            })
                                                    .exec();
        if(!selectedCategoryCourse){
            return res.status(404).json({
                success:false,
                message:`No course found for the category ${categoryID}`
            });
        }

        if(selectedCategoryCourse.course.length === 0){
            return res.status(404).json({
                success:false,
                message:"No course found for the selected category",
            })
        }
        // get course for different category
        const categoriesExceptSelected = await Category.find(
                                                        {
                                                            _id : {$ne : categoryID}
                                                        }
                                                    ).populate({
                                                        path:"course",
                                                        populate:{path:"instructor"}
                                                    })
                                                    .exec();

        let differentCategory = await Category.findOne(
            categoriesExceptSelected[getRandomInt(categoriesExceptSelected.length)]._id
        ).populate({
            path:"course",
            populate:{path:"instructor"},
            match:{status: "Published"},
        }).exec();


        // Get top-selling courses across all categories (HW done)
        const allCategories = await Category.find()
        .populate({
            path: "course",
            match: { status: "Published" },
            populate: {
            path: "instructor",
        },
        })
        .exec()
        const allCourses = allCategories.flatMap((category) => category.course)
        const mostSellingCourses = allCourses
        .sort((a, b) => b.sold - a.sold)
        .slice(0, 10)
            
        // if(!allCourses)
        return res.status(200).json({
            
            success:true,
            message:"Course found for the specified Category",
            data:{
                selectedCategoryCourse,
                differentCategory,
                mostSellingCourses
            }
            
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Some Error Occured While Finding The Relevant Category Course",
        })
    }
}
