import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { BsArrowLeftCircle } from "react-icons/bs";
import { AiOutlineDown } from 'react-icons/ai';

const VideoDetailsSidebar = ({setReviewModal}) => {
  const [activeStatus,setActiveStatus] = useState("");
  const [videoBarActive,setVideoBarActive] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const {sectionId,subSectionId} = useParams();
  const {
    courseSectionData,
    courseEntireData,
    completedLectures,
    totalNumberOfLectures,
  } = useSelector((state) => state.viewCourse);
  const [loading,setLoading] = useState(false);
  useEffect(() =>{
      const setActiveFlag = async () =>{
        setLoading(true);
        if(!courseSectionData.length){
          return;
        }
        const currentSectionIndex = courseSectionData.findIndex(
          (data) =>data._id === sectionId
        )
        const currentSubSectionIndex = courseSectionData?.[currentSectionIndex]?.subSection.findIndex(
          (data) => data._id === subSectionId
        )
        const activeSubSectionId = courseSectionData[currentSectionIndex]?.subSection?.[currentSubSectionIndex]?._id

        setActiveStatus(courseSectionData?.[currentSectionIndex]?._id);
        setVideoBarActive(activeSubSectionId);
        setLoading(false);
      }
      setActiveFlag();
  },[courseSectionData,courseEntireData,location.pathname,completedLectures])

  return (
      <div>
        <div className="flex min-w-[300px] flex-col border-r-[1px] border-richblack-700 h-screen bg-richblack-800 py-10 ">
          <div className='px-5'>
            <div className='flex justify-between items-center mb-4'>
              <button
              onClick={() => navigate("/dashboard/enrolled-courses")}
              className='text-richblack-300'>
                <BsArrowLeftCircle size={30}/>
              </button>
              <button
              onClick={() => setReviewModal(true)}
              className='text-richblack-900 bg-yellow-50 rounded-md py-[8px] px-[12px]'>
                Add Review
              </button>
            </div>
            <div className='space-y-2'>
              <p className='text-xl font-semibold'>{courseEntireData?.courseName}</p>
              <p className='text-richblack-300 text-sm'>{completedLectures?.length} / {totalNumberOfLectures} </p>
            </div>
            <div className='h-[1px] bg-richblack-300/50 mt-4'></div>
          </div>
          <div className='mt-4'>
            {
              courseSectionData?.map((section,index) =>{
                return (
                  <div
                  key={index} 
                  className='bg-richblack-700'
                  onClick={() => {
                    if(activeStatus === section._id){
                      setActiveStatus("");
                      return;
                    }
                    setActiveStatus(section?._id)
                  }}>
                    <div className='flex items-center justify-between p-4'>
                      <div>{section?.sectionName}</div>
                      <i className={`${activeStatus === section._id ? "rotate-180" : "rotate-0"}`}>
                          <AiOutlineDown size={14}/>
                      </i>
                    </div>
                    <div>
                      {
                        activeStatus === section._id && (
                          <div >
                            {
                              section?.subSection?.map((subSection,index) =>{
                                return(
                                  <div
                                  className={`px-6 py-5 space-x-3 items-center flex ${subSection?._id === videoBarActive ? "bg-yellow-50 text-black" : "bg-richblack-900"}`}
                                  onClick={() => {
                                    navigate(`/view-course/${courseEntireData?._id}/section/${section._id}/sub-section/${subSection._id}`)
                                    setVideoBarActive(subSection._id)
                                  }}
                                  key={index}>
                                    <input type="checkbox" 
                                    checked={completedLectures.includes(subSection._id)}
                                    onChange={() => {}}/>
                                    <span>
                                      {subSection.title}
                                    </span>
                                  </div>
                                )
                              })
                            }
                          </div>
                        )
                      }
                    </div>
                  </div>
                )
              })
            }
          </div>
          
        </div>
      </div>
  )
}

export default VideoDetailsSidebar;
