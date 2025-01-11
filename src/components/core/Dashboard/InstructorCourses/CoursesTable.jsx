import React from 'react'
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import { FaCircleCheck, FaRegClock } from "react-icons/fa6";
import { MdEdit } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import {COURSE_STATUS} from "../../../../utils/constants"
import ConfirmModal from "../../../common/ConfirmModal"
import { useState } from 'react';
import { deleteCourse, fetchInstructorCourses } from '../../../../services/operations/CourseDetailsAPI';
import { useSelector } from 'react-redux';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import { HiClock } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';
import { formatDate } from '../../../../services/formatDate';

function CoursesTable({courses,setCourses}) {
    const [loading,setLoading] = useState(false);
    const [confirmationModal,setConfirmationModal] = useState(null);
    // const {course} = useSelector((state) =>state.course);
    const {token} = useSelector((state) =>state.auth);
    const TRUNCATE_LENGTH = 30;
    const navigate = useNavigate()
    const handleDeleteCourse = async (courseId) =>{
        setLoading(true);

        await deleteCourse({courseId : courseId},token);

        const result = await fetchInstructorCourses(token);

        if(result){
            setCourses(result);
        }
        setConfirmationModal(null);
        setLoading(false);
    }

    

    return (
        <>
            <Table className='rounded-xl border border-richblack-700 text-richblack-100'>
                <Thead>
                    <Tr className='flex gap-x-10 rounded-t-md border-b border-b-richblack-700 px-6 py-2'>
                        <Th className='flex-1 text-left text-sm font-medium uppercase text-richblack-100'>
                            Course
                        </Th>
                        <Th className='text-left text-sm font-medium uppercase text-richblack-100'>
                            Duration
                        </Th>
                        <Th className='text-left text-sm font-medium uppercase text-richblack-100'>
                            Price
                        </Th>
                        <Th className='text-left text-sm font-medium uppercase text-richblack-100'>
                            Actions
                        </Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {
                        courses.length == 0 ? 
                        (
                            <Tr>
                                <Td className="py-10 text-center text-2xl font-medium text-richblack-100">No Courses Found</Td>
                            </Tr>
                        ) :
                        (
                            courses.map((course) => {
                                return (
                                    <Tr className="flex gap-x-10 border-b border-richblack-800 px-6 py-8" key={course._id}>
                                        <Td className='flex-1 flex items-center gap-x-4'>
                                            <img src={course.thumbnail} alt="CourseThumbnail" className="h-[148px] w-[220px] rounded-lg object-cover"/>
                                            <div className='flex flex-col justify-between gap-y-2'>
                                                <p className='text-lg font-semibold text-richblack-5'>{course.courseName}</p>
                                                <p className='text-xs text-richblack-300'>
                                                    {
                                                        course.courseDescription.split(" ").length > TRUNCATE_LENGTH ? 
                                                        course.courseDescription.split(" ").splice(0,TRUNCATE_LENGTH).join(" ") + "..." : course.courseDescription
                                                    }
                                                </p>
                                                <p className='text-[12px] text-white'>Created: {formatDate(course.createAt)}</p>
                                                {
                                                    course.status === COURSE_STATUS.PUBLISHED ? 
                                                    (
                                                        <p className='flex w-fit flex-row items-center gap-2 rounded-full bg-richblack-700 text-[12px] px-2 py-[2px] text-pink-100'>

                                                            <FaCircleCheck/>
                                                            
                                                            <p>Published</p>
                                                        </p>
                                                    ) : 
                                                    (
                                                        <p className='flex w-fit flex-row items-center gap-2 rounded-full bg-richblack-700 text-[12px] px-2 py-[2px] text-yellow-100'>
                                                            <HiClock size={14}/>                                                   
                                                            <p>Drafted</p>
                                                        </p>
                                                    )
                                                }
                                            </div>
                                        </Td>
                                        <Td className='text-sm font-medium text-richblack-100'>
                                            <p>20h 10m</p>
                                        </Td>
                                        <Td className='text-sm font-medium text-richblack-100'>
                                            <p>&#8377;{course.price}</p>
                                        </Td>
                                        <Td className='text-sm font-medium text-richblack-100'>
                                            <div>
                                                <button className="px-2 transition-all duration-200 hover:scale-110 hover:text-caribbeangreen-300"
                                                onClick={() => navigate(`/dashboard/edit-course/${course._id}`)}> 
                                                    <MdEdit size={20}/>
                                                </button>
                                                <button
                                                onClick={() => setConfirmationModal({
                                                    text1:"Do you want to delete this course?",
                                                    text2:"All the data related to this course will be deleted.",
                                                    btn1Text: !loading ? "Delete": "Deleting...",
                                                    btn2Text:"Cancel",
                                                    btn1Handler:!loading ? () => handleDeleteCourse(course.createdAt) : () =>{},
                                                    btn2Handler:!loading ? () => setConfirmationModal(null) : () =>{},
                                                })}
                                                className="px-1 transition-all duration-200 hover:scale-110 hover:text-[#ff0000]">
                                                    <RiDeleteBin6Line size={20}/>
                                                </button>
                                            </div>
                                        </Td>
                                    </Tr>
                                )
                            })
                        )
                    }
                </Tbody>
            </Table>
            {confirmationModal && <ConfirmModal modalData={confirmationModal} />}
        </>
    )
}

export default CoursesTable;