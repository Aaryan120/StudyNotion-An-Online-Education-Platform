// Import express and create instance of router
const express = require("express");
const router = express.Router();


// Course controllers import
const {
    createCourse,
    getAllCourses,
    getCourseDetail,
    editCourse,
    getFullCourseDetail,
    getInstructorCourses,
    deleteCourse
} = require("../controllers/CourseController");

// Category controllers import
const {
    createCategory,
    showAllCategories,
    categoryPageDetails
} = require("../controllers/CategoryController");


// Section controllers import
const {
    createSection,
    deleteSection,
    updateSection
} = require("../controllers/SectionController");

// Sub-section controllers import
const {
    createSubSection,
    deleteSubSection,
    updateSubSection
} = require("../controllers/SubSectionController")

// Rating controllers import
const {
    createRating,
    getAverageRating,
    getAllRating,
    // getCourseRating
} = require("../controllers/RatingAndReview")

// Course Progress Controllers import
const {
    updateCourseProgress
} = require("../controllers/courseProgress");

// Import The Middlewares
const {
    auth,
    isStudent,
    isInstructor,
    isAdmin
} = require("../middlewares/auth");

// ********************************************************************************************************
//                                      Course routes
// ********************************************************************************************************

// Course can only be create by instructor
router.post("/createCourse",auth,isInstructor,createCourse);

// Editing Course 
router.post("/editCourse",auth,isInstructor,editCourse);

// Add sections to the course
router.post("/addSection",auth,isInstructor,createSection);

// Update section
router.post("/updateSection",auth,isInstructor,updateSection);

// Delete section
router.post("/deleteSection",auth,isInstructor,deleteSection);

// Add subsection to the section
router.post("/addSubSection",auth,isInstructor,createSubSection);

// update subsections
router.post("/updateSubSection",auth,isInstructor,updateSubSection);

// Delete section
router.post("/deleteSubSection",auth,isInstructor,deleteSubSection);

// Get all Registered courses
router.get("/getAllCourses",getAllCourses);

// Get Details for a specific Course
router.post("/getCourseDetails",getCourseDetail);

// Get Full Course Details
router.post("/getFullCourseDetails",auth,getFullCourseDetail);

// Get instructor courses
router.get("/getInstructorCourses",auth,isInstructor,getInstructorCourses);

// Delete a Course
router.delete("/deleteCourse",deleteCourse);


// ********************************************************************************************************
//                                      Category routes (Only by Admin)
// ********************************************************************************************************

// Create category
router.post("/createCategory",auth,isAdmin,createCategory);

// Show All Categories
router.get("/showAllCategories",showAllCategories);

// Category page details
router.post("/getCategoryPageDetails",categoryPageDetails);


// ********************************************************************************************************
//                                      Rating and Review
// ********************************************************************************************************


router.post("/createRating", auth, isStudent, createRating)

router.get("/getAverageRating", getAverageRating)

router.get("/getReviews", getAllRating)


// ********************************************************************************************************
//                                      Course Progress
// ********************************************************************************************************

router.post("/updateCourseProgress",auth,isStudent,updateCourseProgress)

module.exports = router