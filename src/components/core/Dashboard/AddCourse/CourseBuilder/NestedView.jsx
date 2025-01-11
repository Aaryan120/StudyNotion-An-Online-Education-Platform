import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RxDropdownMenu } from "react-icons/rx";
import { MdEdit } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { BiSolidDownArrow } from "react-icons/bi";
import { deleteSection, deleteSubSection } from '../../../../../services/operations/CourseDetailsAPI';
import { setCourse } from '../../../../../slices/courseSlice';
import ConfirmModal from '../../../../common/ConfirmModal';
import { FaPlus } from "react-icons/fa6";
import SubSectionModal from './SubSectionModal';




function NestedView({handleEditSectionName}) {
    const {course} = useSelector((state) =>state.course);
    const {token} = useSelector((state) =>state.auth);
    const [confirmationModal,setConfirmationModal] = useState(null);
    const [addSubSectionName,setAddSubSectionName] = useState(null);
    const [editSubSectionName,setEditSubSectionName] = useState(null);
    const [viewSubSectionName,setViewSubSectionName] = useState(null);
    const dispatch = useDispatch(); 


    const handleDeleteSection = async(sectionId) =>{
        const result = await deleteSection({
            sectionID: sectionId,
            courseId:course._id,
        },token)

        if(result){
            dispatch(setCourse(result));
        }
        setConfirmationModal(null);
    }


    const handleSubSectionDelete = async(subSectionId,sectionId) =>{
        const result = await deleteSubSection({
            subSectionID :subSectionId,
            sectionID:sectionId,
        },token);

        if(result){
            const updatedSection = course?.courseContent.map((section) => section._id === sectionId ? result : section);
            const updatedCourse = {...course,courseContent: updatedSection }
            dispatch(setCourse(updatedCourse));
        }

        setConfirmationModal(null);
    }
    return (
        <>
        <div className='relative px-5 py-3 bg-richblack-500 rounded-md border-[1px] border-richblack-300'>
            {
                course?.courseContent.map((section) =>{
                    return (
                        <details key={section._id} className='py-1' open>

                            <summary className='flex items-center gap-x-2 justify-between text-white font-medium text-md border-b-[1px] border-richblack-300 py-3'>
                                <div className='flex items-center gap-x-2'>
                                    <RxDropdownMenu className='text-richblack-100 text-xl'/>
                                    <p>{section.sectionName}</p>
                                </div>
                                <div className='flex items-center gap-x-2'>
                                    <button 
                                    onClick={() =>handleEditSectionName(section._id,section.sectionName)}>
                                        <MdEdit />
                                    </button>
                                    <button
                                    onClick={() =>{
                                        setConfirmationModal({
                                            text1:"Delete this section",
                                            text2:"All lectures in this section will be deleted",
                                            btn1Text:"Delete",
                                            btn2Text:"Cancel",
                                            btn1Handler: () => handleDeleteSection(section._id),
                                            btn2Handler: () => setConfirmationModal(null),
                                        })
                                    }}>
                                        <RiDeleteBin6Line />
                                    </button>
                                    <span>|</span>
                                    <BiSolidDownArrow className='text-xs cursor-pointer'/>
                                </div>
                                
                            </summary>
                            <div >
                                {
                                    section?.subSection.map((subSection) =>{
                                        return (
                                            <div key={subSection._id} className='flex items-center pl-2 border-b-[1px] border-richblack-300 pb-2 justify-between mt-2'>
                                                <div className='flex items-center gap-x-2 cursor-pointer'
                                                onClick={() => setViewSubSectionName(subSection)}>
                                                    <RxDropdownMenu className='text-richblack-100 text-xl'/>
                                                    <p>{subSection.title}</p>
                                                </div>
                                                <div className='flex items-center gap-x-2'>
                                                    <button 
                                                    onClick = {() => setEditSubSectionName({
                                                        ...subSection,
                                                        sectionId: section._id
                                                    })}
                                                    >
                                                        <MdEdit />
                                                    </button>
                                                    <button
                                                    onClick={() =>{
                                                        setConfirmationModal({
                                                            text1:"Delete this Lecture",
                                                            text2:"Selected Lecture will be deleted",
                                                            btn1Text:"Delete",
                                                            btn2Text:"Cancel",
                                                            btn1Handler: () => handleSubSectionDelete(subSection._id,section._id),
                                                            btn2Handler: () => setConfirmationModal(null),
                                                        })
                                                    }}>
                                                        <RiDeleteBin6Line />
                                                    </button>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                                <div className='mt-2'>
                                <button className='text-yellow-50 font-md flex items-center gap-x-3'
                                onClick={() => setAddSubSectionName(section._id)}
                                >
                                    <FaPlus />
                                    Add Lecture
                                </button>
                                </div>
                            </div>
                            
                        </details>
                    )
                })
            }
            
        </div>
        {
            addSubSectionName ?
            (<SubSectionModal 
                modalData={addSubSectionName}
                setModalData={setAddSubSectionName}
                add={true}
            />):
            viewSubSectionName ?
            (<SubSectionModal
                modalData={viewSubSectionName}
                setModalData={setViewSubSectionName}
                view={true}
            />):
            editSubSectionName ? 
            (<SubSectionModal
                modalData={editSubSectionName}
                setModalData={setEditSubSectionName}
                edit={true}
            />) :
            (<div></div>)
        }
        {confirmationModal && <ConfirmModal modalData={confirmationModal}/>}
        </>
        
    )
}

export default NestedView