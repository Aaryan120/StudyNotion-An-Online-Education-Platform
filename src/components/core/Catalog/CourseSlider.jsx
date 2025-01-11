import React from 'react'
import {Swiper,SwiperSlide} from 'swiper/react'
import "swiper/css"
import "swiper/css/bundle"
import {FreeMode, Pagination, Autoplay, Navigation} from "swiper/modules"

import Course_card from './Course_card'

function CourseSlider({Courses}) {
  return (
    <>
        {
            Courses?.length ? 
            (
                <Swiper 
                slidesPerView={1}
                loop={true}
                spaceBetween={200}
                pagination={true}
                modules={[Autoplay,Pagination,Navigation]}
                className='mySwiper'
                autoplay={{
                    delay:2000,
                    disableOnInteraction:false,
                }}
                navigation={true}
                breakpoints={{
                    1024:{slidesPerView:3,}
                }}>
                    {
                        Courses?.map((course,index) =>{
                            return(
                                <SwiperSlide key={index}>
                                    <Course_card course={course} Height = {"h-[250px]"}/>
                                </SwiperSlide>
                            )
                            
                        })
                    }
                </Swiper>
            ) : 
            (
                <p className='text-xl text-richblack-5'>No Courses Found</p>
            )
        }
    </>
  )
}
 
export default CourseSlider