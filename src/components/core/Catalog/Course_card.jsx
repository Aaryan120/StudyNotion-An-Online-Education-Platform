import React from 'react'
import { Link } from 'react-router-dom'
import Ratingstars from "../../common/RatingStars"
import GetAvgRating from '../../../utils/avgRating';
import { useState } from 'react';
import { useEffect } from 'react';

function Course_card({course,Height}) {

    const [avgReviewCount,setAvgReviewCount] = useState(0);

    useEffect(() =>{
        const count = GetAvgRating(course?.ratingAndReviews)
        setAvgReviewCount(count)
    },[course])


    return (
        <div>
            <Link to={`/course/${course._id}`}>
                <div>
                    <div>
                        <img src={course?.thumbnail} alt='CourseImage' className={`${Height} w-full rounded-xl object-cover`}/>
                    </div>
                    <div className='flex flex-col gap-2 px-1 py-3'>
                        <p className='text-xl text-richblack-5'>{course?.courseName}</p>
                        <p className='text-richblack-50 text-sm'>{course?.instructor?.firstName} {course?.instructor?.lastName}</p>
                        <div className='flex gap-2 items-center '>
                            <span className='text-yellow-5'>{avgReviewCount || 0}</span>
                            <Ratingstars Review_Count={avgReviewCount}></Ratingstars>
                            <span className='text-richblack-400'>{course?.ratingAndReviews?.length} Ratings</span>
                        </div>
                        <p className='text-xl text-richblack-5'>Rs. {course?.price}</p>
                    </div>
                </div>
            </Link>
        </div>
  )
}

export default Course_card