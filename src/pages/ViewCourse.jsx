import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom';
import { getFullCourseDetail } from '../services/operations/CourseDetailsAPI';
import { setCompletedLectures, setCourseEntireData, setCourseSectionData, setTotalNumberOfLectures } from '../slices/viewCourseSlice';
import VideoDetailsSidebar from '../components/core/ViewCourse/VideoDetailsSidebar';
import { Outlet } from 'react-router-dom';
import CourseReviewModal from '../components/core/ViewCourse/CourseReviewModal';

const ViewCourse = () => {
    const {token} = useSelector((state) => state.auth);
    const {courseId} = useParams();
    const dispatch = useDispatch();
    useEffect(() =>{
        const getCompleteCourseDetails = async () =>{
            const result = await getFullCourseDetail(courseId,token);

            dispatch(setCourseEntireData(result?.courseDetails))
            dispatch(setCourseSectionData(result?.courseDetails?.courseContent));
            dispatch(setCompletedLectures(result?.completedVideos));
            let lectures = 0;
            result?.courseDetails?.courseContent?.forEach((item) =>{
                lectures += item.subSection.length;
            })
            dispatch(setTotalNumberOfLectures(lectures));
        }
        getCompleteCourseDetails();
        
    },[]);
    const [reviewModal,setReviewModal] = useState(false);
  return (
    <div>
        <div className="relative flex text-white">
            <VideoDetailsSidebar setReviewModal={setReviewModal}/>
            <div className=" flex-1 overflow-auto">
                <div className="mx-auto w-11/12 max-w-[1000px] py-10">
                    <Outlet/>
                </div>
            </div>
        </div>
        {
            reviewModal && <CourseReviewModal setReviewModal={setReviewModal} />
        }
    </div>
  )
}

export default ViewCourse;