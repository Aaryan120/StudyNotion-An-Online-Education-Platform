import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { fetchCourseDetails } from '../services/operations/CourseDetailsAPI';
import GetAvgRating from '../utils/avgRating';
import toast from 'react-hot-toast';
import Error from './Error';
import { buyCourse } from '../services/operations/studentFeaturesAPI';
import ConfirmModal from '../components/common/ConfirmModal';
import RatingStars from '../components/common/RatingStars';
import { MdOutlineLanguage } from "react-icons/md";
import { IoMdInformationCircleOutline } from "react-icons/io";
import { formatDate } from '../services/formatDate';
import { addToCart } from '../slices/cartSlice';
import CourseDetailsCard from '../components/core/Course/CourseDetailsCard';
import { ACCOUNT_TYPE } from '../utils/constants';
import CourseAccordionBar from '../components/core/Course/CourseAccordionBar';
import Footer from '../components/common/Footer';



const CourseDetails = () =>{
  const {courseId} = useParams();
  const {token} = useSelector((state) =>state.auth);
  const {user,loading} = useSelector((state) =>state.profile);
  const {paymentLoading} = useSelector((state)=>state.course);
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const [courseData,setCourseData] = useState(null);
  const [avgReviewCount,setAvgReviewCount] =  useState(0);
  const [totalNumberOfLectures,setTotalNumberOfLectures] = useState(0);
  const [confirmationModal,setConfirmationModal] = useState(null);
  const [isActive,setIsActive] = useState([]);



  useEffect(() =>{
    const getCourseFullDetails = async () =>{
      try {
        const result = await fetchCourseDetails(courseId);
        setCourseData(result);
      } catch (error) {
        toast.error("Error Occured While Fetching Course Details");
        console.log(error);
      }
    }
    getCourseFullDetails();
  },[courseId]);
  
  useEffect(() =>{
    const count = GetAvgRating(courseData?.data?.courseDetails?.ratingAndReviews);
    setAvgReviewCount(count);
  },[courseData]);

  useEffect(() =>{
    let lectures = 0;
    courseData?.data?.courseDetails?.courseContent?.forEach((item) =>{
      lectures += item.subSection.length || 0;
    })
    setTotalNumberOfLectures(lectures);
  },[courseData])


  const handleBuyCourse = () =>{
    if(user && user.accountType === ACCOUNT_TYPE.INSTRUCTOR){
      toast.error("You are an Instructor, You can't buy a course");
      return;
    }
    if(token){
      buyCourse(token,[courseId],user,navigate,dispatch);
      return;
    }
    setConfirmationModal({
      text1:"You are not logged in!",
      text2:"Please login to Purchase Course.",
      btn1Text:"Login",
      btn2Text:"Cancel",
      btn1Handler:() => navigate("/login"),
      btn2Handler:() => setConfirmationModal(null),
    })
  }


  const handleAddToCart = () =>{
    if(user && user.accountType === ACCOUNT_TYPE.INSTRUCTOR){
      toast.error("You are an Instructor, You can't buy a course");
      return;
    }
    if(token){
      dispatch(addToCart(courseData?.data?.courseDetails));
      return;
    }
    setConfirmationModal({
      text1:"You are not logged in!",
      text2:"Please login to Add to Cart.",
      btn1Text:"Login",
      btn2Text:"Cancel",
      btn1Handler:() => navigate("/login"),
      btn2Handler:() => setConfirmationModal(null),
    })
  }

  const handleIsActive = (sectionId) =>{
    // if present then remove
    setIsActive(
      !isActive.includes(sectionId)
        ? isActive.concat([sectionId])
        : isActive.filter((e) => e != sectionId)
    )
    // else add

  }

  if(loading || paymentLoading || !courseData){
    return (
      <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
        <div className='spinner'></div>
      </div>
    )
  }



  const {
    _id:course_id,
    courseName,
    courseDescription,
    thumbnail,
    price,
    whatYouWillLearn,
    courseContent,
    ratingAndReviews,
    instructor,
    studentEnrolled,
    createAt,
  } = courseData?.data?.courseDetails;
  return(
    <div className='text-white'>

      {/* Section1-Details */}
      <div className='bg-richblack-800 relative w-full'>
        <div className='mx-auto w-11/12 box-content max-w-maxContentTab pb-6 lg:pb-24 pt-16 lg:pt-28 flex flex-col lg:max-w-maxContent '>
          <div className=' max-h-[30rem] block lg:hidden relative'>
            <div className="absolute bottom-0 left-0 h-full w-full shadow-[#161D29_0px_-64px_36px_-28px_inset]"></div>
            <img src={thumbnail} alt="CourseImage" className='flex lg:hidden aspect-auto w-full rounded-md'/>
          </div>
          <div className='flex flex-col mx-auto lg:mx-0 gap-y-3 my-8 lg:my-0'>
            <p className='text-5xl font-semibold'>{courseName}</p>
            <p className='text-lg font-medium text-richblack-300'>{courseDescription}</p>
            <div className='flex items-center flex-wrap gap-3 text-lg'>
              <p className='text-yellow-50'>{avgReviewCount}</p>
              <RatingStars Review_Count={avgReviewCount}/>
              <p>{`(${ratingAndReviews.length || 0} Reviews)`}</p>
              <p>{studentEnrolled.length || 0} Students Enrolled</p>
            </div>
            <p className='text-lg font-medium text-richblack-5'>Created By {instructor?.firstName} {instructor?.lastName}</p>
            <div className='flex gap-3 text-lg flex-wrap text-richblack-5'>
              <p className='flex items-center gap-x-2'><IoMdInformationCircleOutline/><span>Created At {formatDate(createAt)}</span></p>
              <p className='flex items-center gap-x-2'><MdOutlineLanguage/><span>English</span></p>
            </div>
          </div>
          
          <div className='mt-4 p-4 space-y-4 border-t border-b border-richblack-400 lg:hidden'>
            <p className='text-3xl font-semibold mb-4'>Rs. {price}</p>
            <button 
            className='rounded-md w-full bg-yellow-50 text-richblack-900 px-5 py-3 '
            onClick={(user && studentEnrolled.includes(user._id)) ? (() => navigate("/dashboard/enrolled-courses")) : (handleBuyCourse)}>
              {
                (user && studentEnrolled.includes(user._id)) ? ("Go to Course") : ("Buy Now")
              }
            </button>
            {
              (
                (!user || !studentEnrolled.includes(user._id)) && 
                <button 
                className='rounded-md w-full bg-richblack-800 text-richblack-5 px-5 py-3 '
                onClick={() => handleAddToCart()}>
                    Add To Cart
                </button>
              )
            }
          </div>
        </div>
        {/* Course Card */}
        <div className='hidden top-[60px] right-[10%] mx-auto min-h-[600px] w-1/3 max-w-[410px] translate-y-25 md:translate-y-0 lg:absolute lg:block rounded-lg tran'>
          <CourseDetailsCard
          course={courseData?.data?.courseDetails}
          setConfirmationModal={setConfirmationModal}
          handleBuyCourse={handleBuyCourse}
          />
        </div>
      </div>
      <div className="mx-auto pt-14 lg:pt-20 box-content px-4 text-start text-richblack-5 lg:w-[1260px]">
        <div className="mx-auto max-w-maxContentTab lg:mx-0 xl:max-w-[810px] ">
          {/* What you will learn section */}
          <div className='border border-richblack-700 p-8 flex flex-col gap-5 my-8'>
            <p className='text-3xl font-semibold'>What You'll Learn</p>
            <div>
              {
                whatYouWillLearn
              }
            </div>
          </div>

          {/* Course content section */}
          <div className='max-w-[830px]'>
            <div className='flex flex-col gap-3'>
              <p className='text-3xl font-semibold'>Course Content</p>
              <div className='flex flex-wrap justify-between gap-2'>
                <div className='flex gap-2 text-lg'>
                  <span>{courseContent.length || 0} {`section(s)`}</span>
                  <span>{totalNumberOfLectures} {`lecture(s)`}</span>
                  <span>{courseData?.data?.totalDuration|| 0} {`total length(s)`}</span>
                </div>
                <div>
                  <button className='text-yellow-25'
                  onClick={() =>setIsActive([])}>
                    Collapse all sections
                  </button>
                </div>
              </div>
            </div>
            {/* Section bar / accordion bar */}
            <div className='mt-2'>
              {courseContent.map((section,index) =>{
                return(
                  <CourseAccordionBar
                  section={section}
                  isActive={isActive}
                  handleIsActive={handleIsActive}
                  key={index}/>
                )
              })}
            </div>
          </div>
        </div>
        
        
      </div>

      <div>

      </div>
      <Footer/>
      {confirmationModal && <ConfirmModal modalData={confirmationModal}/>}
    </div>
  )
}

export default CourseDetails;