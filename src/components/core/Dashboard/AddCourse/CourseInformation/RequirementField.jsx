import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';

function RequirementField({name,label,register,setValue,getValues,errors,placeholder}) {
    const [requirement,setRequirements] = useState("");
    const [requirementList,setRequirementList] = useState([]);
    const {editCourse,course} = useSelector((state) =>state.course);
    const handleAddRequirement = () =>{
        if(requirement){
            setRequirementList([...requirementList,requirement]);
            setRequirements("");
        }
    }

    const handleRemoveRequirement = (index) =>{
        const updatedList = [...requirementList]
        updatedList.splice(index,1);
        setRequirementList(updatedList);
    }


    useEffect(() => {
        if (editCourse) {
          setRequirementList(course?.instructions)
        }
        register(name, { required: true, validate: (value) => value.length > 0 })
      }, [])
    

    useEffect(() =>{
        setValue(name,requirementList);
    },[requirementList])
    return (
        <div>
            <div>
                <label className="w-full">
                    <p className="text-sm text-richblack-5">{label}<sup className='text-pink-200'>*</sup></p>
                    <input 
                    name={name}
                    placeholder={placeholder}
                    type="text"
                    value={requirement}
                    onChange={(event) => setRequirements(event.target.value)}
                    className="font-medium  bg-richblack-500 rounded-[0.5rem] mt-[3px] w-full p-[12px] shadow-[0px_2px] shadow-richblack-300 focus:outline-none " />
                    {
                        errors.email && <span>
                            Please enter Requirements
                        </span>
                    }                   
                </label>
                <button 
                type='button'
                onClick={handleAddRequirement}
                className='text-yellow-50 mt-2 pl-1'>
                    Add
                </button>
            </div>
            <div>
                {
                    requirementList.length > 0 && (
                        <ul className="mt-2 list-inside list-disc">
                            {
                                requirementList.map((element,index) =>{
                                    return (
                                        <li className='flex gap-x-2 items-center' key={index}>
                                            <span>{element }</span>
                                            <button 
                                            type='button'
                                            className='text-xs text-pure-greys-300 '
                                            onClick={() => handleRemoveRequirement(index)}
                                            >
                                                clear
                                            </button>
                                        </li>
                                    )
                                })
                            }
                        </ul>
                    )
                }
                {errors[name] && (
                <span className="ml-2 text-xs tracking-wide text-pink-200">
                    {label} is required
                    </span>
                )}
            </div>
            
        </div>
    )
}

export default RequirementField;