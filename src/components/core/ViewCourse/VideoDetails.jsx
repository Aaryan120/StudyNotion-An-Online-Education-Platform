import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { BigPlayButton, Player } from 'video-react';
import { updateCompletedLectures } from '../../../slices/viewCourseSlice';
import 'video-react/dist/video-react.css'; 
import { AiFillPlayCircle } from 'react-icons/ai';
import IconBtn from '../../common/IconBtn';
import { markLectureAsComplete } from '../../../services/operations/CourseDetailsAPI';
import { MdOutlineReplay } from "react-icons/md";
import { MdSkipNext } from "react-icons/md";
import { MdSkipPrevious } from "react-icons/md";

function VideoDetails() {
  const {courseId,sectionId,subSectionId} = useParams()
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {courseSectionData,courseEntireData,completedLectures,totalNumberOfLectures} = useSelector((state)=>state.viewCourse);
  const playerRef = useRef();
  const {token} = useSelector((state) =>state.auth);
  const location = useLocation();
  const [videoData,setVideoData] = useState([]);
  const [videoEnded,setVideoEnded] = useState(false);
  const [loading,setLoading] = useState(false);
  const [previewSource,setPreviewSource] = useState("");
  useEffect(() =>{
    const setVideoSpecificDetails = async ()=>{
      setLoading(true);
      if(!courseSectionData?.length){
        return;
      }
      if(!courseId || !sectionId || !subSectionId){
        return;
      }
      else{
        const filteredData = courseSectionData?.filter((section) => section._id === sectionId);
        if(!filteredData.length){
          setLoading(false);
          return;
        }
        const filteredVideoData = filteredData[0]?.subSection.filter((subSection) => subSection._id === subSectionId);

        if(!filteredVideoData?.length){
          setLoading(false)
          return;
        }
        setVideoData(filteredVideoData[0]);
        setPreviewSource(courseEntireData?.thumbnail)
        setVideoEnded(false);
      }
      setLoading(false);
    }
    setVideoSpecificDetails();
  },[courseEntireData,courseSectionData,location.pathname,completedLectures])

  const isFirstVideo = () =>{
    const currentSectionIndex = courseSectionData.findIndex((data) =>data._id === sectionId);
    const subSectionIndex = courseSectionData[currentSectionIndex].subSection.findIndex((data) =>data._id === subSectionId);
    if(currentSectionIndex === 0 && subSectionIndex === 0){
      return true;
    }
    else{
      return false;
    }
    
  }

  const isLastVideo = () =>{
    const currentSectionIndex = courseSectionData.findIndex((data) =>data._id === sectionId);
    const subSectionIndex = courseSectionData[currentSectionIndex].subSection.findIndex((data) =>data._id === subSectionId);
    if(
      currentSectionIndex === courseSectionData.length - 1 &&
      subSectionIndex === courseSectionData[currentSectionIndex].subSection.length - 1){
      return true;
    }else{
      return false;
    }
    
  }
  const goToNext = () =>{
    const currentSectionIndex = courseSectionData.findIndex((data) =>data._id === sectionId);
    const subSectionIndex = courseSectionData[currentSectionIndex]?.subSection.findIndex((data) =>data._id === subSectionId);
    const numberOfSubSections = courseSectionData[currentSectionIndex].subSection.length;
    if(subSectionIndex !== numberOfSubSections - 1){
      const nextSubSectionId = courseSectionData[currentSectionIndex].subSection[subSectionIndex + 1]._id;
      navigate(`/view-course/${courseId}/section/${sectionId}/sub-section/${nextSubSectionId}`)
    }
    else{
      const nextSectionId = courseSectionData[currentSectionIndex+1]._id;
      const nextSubSectionId = courseSectionData[currentSectionIndex+1]?.subSection[0]._id;
      navigate(`/view-course/${courseId}/section/${nextSectionId}/sub-section/${nextSubSectionId}`);
    }
  }
  const goToPrev = () =>{
    const currentSectionIndex = courseSectionData.findIndex((data) =>data._id === sectionId);
    const subSectionIndex = courseSectionData[currentSectionIndex].subSection.findIndex((data) =>data._id === subSectionId);
    if(subSectionIndex !== 0){
      const prevSubSectionId = courseSectionData[currentSectionIndex].subSection[subSectionIndex - 1]._id;
      navigate(`/view-course/${courseId}/section/${sectionId}/sub-section/${prevSubSectionId}`)
    }
    else{
      const prevSectionId = courseSectionData[currentSectionIndex-1]._id;
      const numberOfSubSections = courseSectionData[currentSectionIndex-1].subSection.length;
      const prevSubSectionId = courseSectionData[currentSectionIndex-1]?.subSection[numberOfSubSections-1]._id;
      navigate(`/view-course/${courseId}/section/${prevSectionId}/sub-section/${prevSubSectionId}`);
    }
  }

  const handleLectureCompletion = async () =>{
    setLoading(true);

    const res =await markLectureAsComplete({courseId: courseId, subSectionId:subSectionId},token);
    if(res){
      dispatch(updateCompletedLectures(subSectionId))
      setVideoEnded(true);
    }

    setLoading(false);
  }

  if(loading){
    return (
      <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
        <div className='spinner'></div>
      </div>
    )
  }
  return (
    <div>
      {
        !videoData ?
        (
          <img src={previewSource} alt="courseThumbnail" className='h-full w-full rounded-md object-cover'/>
        ) : 
        (
          <div className='w-full relative'>
              <Player 
              ref={playerRef}
              aspectRatio='16:9'
              playsInline
              onEnded={() => setVideoEnded(true)}
              src={videoData?.videoURL}
              >
                <BigPlayButton position="center" />
                {
                  videoEnded && (
                    <div
                    style={{
                      backgroundImage:
                        "linear-gradient(to top, rgb(0, 0, 0), rgba(0,0,0,0.7), rgba(0,0,0,0.5), rgba(0,0,0,0.1)",
                    }}
                    className="full absolute inset-0 z-[100] grid h-full place-content-center font-inter">
                      {
                        !completedLectures.includes(subSectionId) && (
                          <div className="bg-richblack-100 px-5 py-1 mt-6 rounded-md flex text-xl max-w-max mx-auto text-black font-medium cursor-pointer ">
                            <IconBtn
                            disabled={loading}
                            onClick={() => handleLectureCompletion()}
                            text={!loading ? "Mark as completed" : "Loading..."}/>
                          </div>
                        )
                      }
                      <div className="bg-richblack-100 px-5 py-1 mt-6 top-[40%] rounded-full flex text-xl max-w-max mx-auto text-black font-medium cursor-pointer">
                        <IconBtn 
                      disabled={loading}
                      onClick={() =>{
                        if(playerRef?.current){
                          playerRef.current?.seek(0);
                          setVideoEnded(false);
                        }
                      }}>
                        <MdOutlineReplay/>
                      </IconBtn>
                      
                      </div>
                      
                      <div>
                        {
                          !isFirstVideo() && (
                            <button
                            onClick={goToPrev}
                            className="bg-richblack-100 px-5 py-1 absolute left-5 top-[40%] mt-6 rounded-full flex text-xl max-w-max mx-auto text-black font-medium cursor-pointer">
                              <MdSkipPrevious/>
                            </button>
                          )
                        }
                        {
                          !isLastVideo() &&(
                            <button 
                            onClick={goToNext}
                            className="bg-richblack-100 px-5 py-1 absolute right-5 top-[40%] mt-6 rounded-full flex text-xl max-w-max mx-auto text-black font-medium cursor-pointer">
                              <MdSkipNext/>
                            </button>
                          )
                        }
                        
                      </div>
                    </div>
                  )
                }
              </Player>
              <p className='text-xl font-semibold mt-4'>{videoData?.title}</p>
              <p className='text-md font-medium text-richblack-100/70 mt-2'>{videoData?.description}</p>
          </div>
        )
      }
    </div>
  )
}

export default VideoDetails