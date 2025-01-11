import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { fetchInstructorCourses } from '../../../../services/operations/CourseDetailsAPI';
import { getInstructorData } from '../../../../services/operations/profileAPI';
import { Link } from 'react-router-dom';
import InstructorChart from './InstructorChart';
function Instructor() {

  const {token} = useSelector((state) =>state.auth);
  const {user} = useSelector((state) =>state.profile);
  const [loading,setLoading] = useState(false);
  const [instructorData,setInstructorData] = useState(null);
  const [courses,setCourses] = useState([]);
  

  useEffect(() =>{
    const setAllData = async () =>{
      setLoading(true);
      const instructorData = await getInstructorData(token);
      const courseData = await fetchInstructorCourses(token);

      if(instructorData) setInstructorData(instructorData);
      if(courseData) setCourses(courseData);
      setLoading(false);
    }
    setAllData();
  },[]);


  const totalAmount = instructorData?.reduce((acc,curr) => acc + curr.totalRevenueGenerated,0);
  const totalStudent = instructorData?.reduce((acc,curr) => acc + curr.totalStudentsEnrolled,0);


  if(loading){
    return (
      <div className='h-100vh w-100vw flex items-center justify-center my-auto'>
        <div className='spinner'></div>
      </div>
    )
  }

  return (
    <div className='text-white'>

      <div className='space-y-2 mb-6'>
        <p className='text-3xl font-medium'>Hi {user?.firstName} 👋</p>
        <p className='text-richblack-300 text-sm'>Let's start something new</p>
      </div>

      {
        loading ? 
        (
          <div className='h-100vh w-100vw flex items-center justify-center my-auto'>
            <div className='spinner'></div>
          </div>
        ) :
        (
          courses.length > 0 ? 
          (
            <div>
              <div>
                <div className='flex md:flex-row flex-col gap-4'>
                  <InstructorChart courses={instructorData} />
                  <div className='flex flex-col flex-1 bg-richblack-700/80 p-7 gap-y-4 rounded-md'>
                    <p className='text-xl font-semibold'>Statistics</p>

                    <div>
                      <p className='text-lg font-medium text-richblack-300'>Total Courses</p>
                      <p className='text-2xl font-semibold'>{courses.length}</p>
                    </div>

                    <div>
                      <p className='text-lg font-medium text-richblack-300'>Total Students</p>
                      <p className='text-2xl font-semibold'>{totalStudent}</p>
                    </div>

                    <div>
                      <p className='text-lg font-medium text-richblack-300'>Total Revenue</p>
                      <p className='text-2xl font-semibold'>{totalAmount}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <div>
                  <div className='bg-richblack-700/80 mt-5 flex items-center justify-between p-5 rounded-t-md'>
                  <p className='text-xl font-semibold'>Your Courses</p>
                  <Link to={"/dashboard/my-courses"}>
                    <p className='cursor-pointer text-yellow-50'>View All</p>
                  </Link>
                </div>

                <div className='px-5 bg-richblack-700/80 rounded-b-md flex flex-col md:flex-row gap-5 mb-4'>
                  {
                    courses.slice(0,3).map((course) =>{
                      return (
                        <div className='mb-4' key={course._id}>
                            <img src={course.thumbnail} alt="courseImage" className='w-[320px] h-[200px] rounded-md object-cover '/>
                            <div className='mt-2 space-y-1'>
                              <p className='text-md font-[550]'>{course.courseName}</p>
                              <div className='flex gap-1 items-center text-richblack-300'>
                                <p>{course.studentEnrolled.length} Students</p>
                                <p> | </p>
                                <p>Rs {course.price}</p>
                              </div>
                            </div>
                        </div>
                      )
                    })
                  }
                </div>
                </div>
                
              </div>
            </div>
          ): 
          (
            <div>
              <p>You have not created any courses yet</p>
              <Link to={"/dashboard/add-course"}>
                Create a Course
              </Link>
            </div>
          )
        )
      }
    </div>
  )
}

export default Instructor