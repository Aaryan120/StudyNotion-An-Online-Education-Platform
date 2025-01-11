import React, { useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import { apiconnector } from '../services/apiconnector';
import { categories } from '../services/apis';
import { getCatalogPageData } from '../services/operations/pageAndComponentData';
import Course_card from '../components/core/Catalog/Course_card';
import CourseSlider from '../components/core/Catalog/CourseSlider';
import toast from 'react-hot-toast';
import Footer from '../components/common/Footer';


function Catalog() {
    const location = useLocation();
    const [catalogPageData,setCatalogPagedata] = useState(null);
    const [categoryId,setCategoryId] = useState("");
    const catalogName = location.pathname.split('/').at(-1);
    const [active,setActive] = useState(1);
    const [loading,setLoading] = useState(false);
    useEffect(() =>{
        const getCategories = async () =>{
            setLoading(true);
            const result = await apiconnector("GET",categories.CATEGORIES_API,null);

            const categoryId = result.data.data.filter((category) => category.categoryName.split(" ").join("-").toLowerCase() === catalogName)[0]._id;

            setCategoryId(categoryId);
            setLoading(false);
        }
        getCategories();
    },[catalogName]);

    useEffect(() =>{

        const getCategoryDetails = async () =>{
            setLoading(true);
            try {
                const categoryPageDetails = await getCatalogPageData(categoryId);
                setCatalogPagedata(categoryPageDetails);
            } catch (error) {
                toast.error("Error Fetching Category Page Details")
            }
            setLoading(false);
        }
        if(categoryId){
            getCategoryDetails();
        }
    },[categoryId])

    if(loading || !catalogPageData){
        return (
            <div className='h-100vh w-100vw flex items-center justify-center my-auto'>
                <div className='spinner'></div>
            </div>
        )
    }
    return (
        <div className='text-white'>
            <div className='bg-richblack-800'>
                <div className='mx-auto w-11/12 max-w-maxContent pb-16 pt-20 flex flex-col gap-y-5'>
                    <p className='text-richblack-300 text-sm font-medium'>
                        {`Home / Catalog / `}
                        <span className='text-yellow-50'>{catalogPageData?.selectedCategoryCourse?.categoryName}</span>
                    </p>
                    <p className=' text-3xl font-medium'>{catalogPageData?.selectedCategoryCourse?.categoryName}</p>
                    <p className='text-richblack-200 text-md font-medium'>{catalogPageData?.selectedCategoryCourse?.categoryDescription}</p>
                </div>
            </div>
            

            <div className='mt-10 mx-auto max-w-maxContentTab w-11/12 lg:max-w-maxContent'>
                {/* Section1 */}
                <div>
                    <div className='text-4xl font-semibold'>Courses to get you started</div>
                    <div className="my-4 flex border-b border-b-richblack-600 text-sm">
                        <p
                        onClick={() =>setActive(1)}
                        className={`${active == 1 ? "text-yellow-25 border-b-yellow-25 border-b-[1px]" : "text-richblack-50"} px-4 py-2 cursor-pointer`}>
                            Most Popular
                        </p>
                        <p
                        onClick={() =>setActive(2)}
                        className={`${active == 2 ? "text-yellow-25 border-b-yellow-25 border-b-[1px]" : "text-richblack-50"} px-4 py-2 cursor-pointer `}>New</p>
                    </div>
                    <div className='py-8'>
                        <CourseSlider Courses={catalogPageData?.selectedCategoryCourse?.course}/>
                    </div>
                </div>

                {/* Section2 */}
                <div className='mt-10'>
                    <p className='text-4xl font-semibold'>Top Courses in {catalogPageData?.selectedCategoryCourse?.categoryName}</p>
                    <div className='py-8'>
                        <CourseSlider Courses={catalogPageData?.differentCategory?.course}/>
                    </div>
                </div>

                {/* Section 3 */}
                <div>
                    <p className='text-4xl font-semibold'>Frequently Bought </p>
                    <div className='py-8'>
                        <div className='grid grid-cols-1 gap-6 lg:grid-cols-2'>
                            {
                                catalogPageData?.mostSellingCourses.slice(0,4).map((course,index) =>{
                                    return (
                                        <Course_card course={course} key={index} Height={`h-[400px]`}/>
                                    )
                                    
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    )
}

export default Catalog