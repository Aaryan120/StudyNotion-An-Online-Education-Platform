import React, { useEffect, useState } from 'react'
import {apiconnector} from "../../services/apiconnector"
import {ratingsEndpoints} from "../../services/apis"
import {Swiper,SwiperSlide} from 'swiper/react'
import "swiper/css"
import "swiper/css/bundle"
import {FreeMode, Pagination, Autoplay, Navigation} from "swiper/modules"
import ReactStars from 'react-stars'
import { FaStar } from 'react-icons/fa'



function ReviewSlider() {
    const [reviews,setReviews] = useState([]);
    const TRUNCATEWORDS = 15;
    useEffect(() =>{
        const setAllReviews = async () =>{
            const result = await apiconnector("GET",ratingsEndpoints.REVIEWS_DETAILS_API,null);
            setReviews(result.data.data);
        }
        setAllReviews();
    },[])
    return (
        <div>
            <div className='mt-10'>
                <Swiper
                slidesPerView={1}
                loop={true}
                spaceBetween={400}
                pagination={true}
                modules={[Autoplay,Pagination,Navigation]}
                className='mySwiper'
                autoplay={{
                    delay:2000,
                    disableOnInteraction:false,
                }}
                breakpoints={{
                    640:{
                        slidesPerView: 2,
                        spaceBetween:20,
                    },
                    1100:{
                        slidesPerView:4,
                        spaceBetween:24
                    }
                }}>
                    {
                        reviews.map((review,index) =>{
                            return (
                                <SwiperSlide key={index}>
                                    <div className='border border-richblack-700 bg-richblack-800 p-5 flex flex-col w-[300px] h-[200px] justify-between gap-2'>
                                        <div className='space-y-3'>
                                            <div className='flex gap-2 gap-x-4 items-center'>
                                                <img 
                                                src={`${review?.user?.imageUrl ? 
                                                    (review?.user?.imageUrl) : 
                                                    (`https://api.dicebear.com/5.x/initials/svg?seed=${review?.user.firstName} ${review?.user.lastName}`)}`} 
                                                alt="userImage"
                                                className='h-9 w-9 object-cover rounded-full' />
                                                <div className='flex flex-col '>
                                                    <p className='font-medium text-md'>{review?.user?.firstName} {review?.user?.lastName}</p>
                                                    <p className='text-sm font-normal text-richblack-500'>{review?.user?.email}</p>
                                                </div>
                                            </div>
                                            <div>
                                                <p>{review?.review.length > TRUNCATEWORDS ? `${review?.review.split(' ').slice(0,15).join(" ")}...` : review?.review}</p>
                                            </div>
                                        </div>
                                        
                                        <div className='flex items-center gap-x-2'>
                                            <p className='text-yellow-25'>{review?.rating.toFixed(1)}</p>
                                            <ReactStars
                                            count={5}
                                            value={review.rating}
                                            size={20}
                                            edit={false}
                                            activeColor="ffd700"
                                            emptyIcon={<FaStar/>}
                                            fullIcon={<FaStar/>}
                                            />
                                        </div>
                                        
                                    </div>
                                    
                                </SwiperSlide>
                            )
                        })
                    }
                </Swiper>
            </div>
        </div>
    )
}

export default ReviewSlider