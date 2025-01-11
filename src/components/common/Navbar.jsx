import React, { useEffect, useRef, useState } from "react";
import logo from "../../assets/Logo/Logo-Full-Light.png"
import { NavbarLinks } from "../../data/navbar-links";
import { Link, matchPath, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { AiOutlineMenu, AiOutlineShoppingCart } from "react-icons/ai";
import ProfileDropDown from "../core/Auth/ProfileDropDown";
import { apiconnector } from "../../services/apiconnector";
import { categories } from "../../services/apis";
import { FaAngleDown } from "react-icons/fa6";
import { ACCOUNT_TYPE } from "../../utils/constants";
import useOnClickOutside from "../../hooks/useOnClickOutside";


const Navbar = () =>{
    const [loading,setLoading] = useState(false);
    const [showHandler,setShowHandler] = useState(false);

    const {token} = useSelector((state) => state.auth);
    const {user} = useSelector((state) => state.profile);
    const {totalItems} = useSelector((state) => state.cart);
    const [subLinks,setSubLinks] = useState([]);
    const ref = useRef(null)
    useOnClickOutside(ref,() => setShowHandler(false));

    useEffect(() =>{
        const fetchSubLinks = async ()=>{
            setLoading(true);
            try {
                const result = await apiconnector("GET",categories.CATEGORIES_API);
                setSubLinks(result.data.data);
            } catch (error) {
            }
            setLoading(false);
        }
        fetchSubLinks();
    },[])
    const location = useLocation();
    const matchRoute = (route) =>{
        return matchPath({path:route},location.pathname);
    }
    const CategoryName = location.pathname.split("/").at(-1);

    return(
        <div className={`flex h-14 items-center justify-center border-b-[1px] border-b-richblack-700 ${
            location.pathname !== "/" ? "bg-richblack-800" : ""
          } transition-all duration-200`}>
            <div className="w-11/12 max-w-maxContent flex flex-row items-center justify-between">
                <Link to={"/"}>
                    <img src={logo} alt="StudyNotionLogo" width={160} height={32} loading="lazy"/>
                </Link>
                <nav className="hidden md:block">
                    <ul className="flex gap-x-6 text-richblack-25">
                        {
                            NavbarLinks.map((element,index) =>(
                                <li  key={index}>
                                    {element.title === "Catalog" ? 
                                    <div className={`group relative flex cursor-pointer items-center gap-1 ${
                                        matchRoute("/catalog/:catalogName")
                                          ? "text-yellow-25"
                                          : "text-richblack-25"
                                      }`}>
                                        <p>{element.title}
                                        </p>
                                        <FaAngleDown/>
                                        <div className="invisible absolute left-[50%] top-[50%] z-[1000] flex w-[200px] translate-x-[-50%] translate-y-[3em] flex-col rounded-lg bg-richblack-5 p-4 text-richblack-900 opacity-0 transition-all duration-150 group-hover:visible group-hover:translate-y-[1.65em] group-hover:opacity-100 lg:w-[300px]">
                                        <div className="absolute left-[50%] top-0 -z-10 h-6 w-6 translate-x-[80%] translate-y-[-40%] rotate-45 select-none rounded bg-richblack-5"></div>
                                        {
                                            loading ? (
                                                <p className="text-center">Loading...</p>
                                            ) : (subLinks && subLinks.length) ? (
                                                <>
                                                    {
                                                        subLinks.filter((subLink) => subLink?.course?.length > 0).map(
                                                            (subLink,index) =>{
                                                                return (
                                                                    <Link
                                                                    key={index}
                                                                    to={`/catalog/${subLink.categoryName.split(" ").join("-").toLowerCase()}`}
                                                                    className="rounded-lg bg-transparent py-4 pl-4 hover:bg-richblack-50">
                                                                        <p>{subLink.categoryName}</p>
                                                                    </Link>
                                                                )
                                                            }
                                                        )
                                                    }
                                                </>
                                            ) :
                                            (   
                                               <p className="text-center">No Courses Found</p> 
                                            )
                                        }
                                        
                                        </div>
                                    </div> : 
                                    <Link to={element?.path}>
                                        <p className={`
                                            ${matchRoute(element?.path) ?
                                            "text-yellow-50" :
                                            "text-richblack-25"}`}>{element.title}
                                        </p>
                                    </Link>
                                    } 
                                </li>  
                            ))
                        }
                    </ul>
                </nav>


                {/* Login signup dashboard */}
                <div className="gap-x-4 items-center hidden md:flex">
                    {
                        user !== null && user?.accountType !== ACCOUNT_TYPE.INSTRUCTOR && (
                            <Link to={"/dashboard/cart"} className="relative text-richblack-100 text-2xl pb-1">
                                <AiOutlineShoppingCart/>
                                {
                                    totalItems > 0 ? <span className="absolute -bottom-2 -right-2 grid h-5 w-5 place-items-center overflow-hidden rounded-full bg-richblack-600 text-center text-xs font-bold text-yellow-100">{totalItems}</span> : ""
                                }
                            </Link>
                        )
                    }
                    {
                        token === null && (
                            <Link to={"/login"} >
                                <button className="rounded-[8px] border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100">
                                    Log in
                                </button>
                            </Link>
                        )
                    }
                    {
                        token === null && (
                            <Link to={"/signup"}>
                                <button className="rounded-[8px] border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100">
                                    Sign up
                                </button>
                            </Link>
                        )
                    }
                    {
                        token !== null && <ProfileDropDown/>
                    }
                </div>
                <button className="mr-4 relative md:hidden" ref={ref}>
                    <AiOutlineMenu fontSize={24} fill="#AFB2BF" onClick={() =>setShowHandler(!showHandler)}/>
                    {
                    showHandler && (
                        <div className="absolute z-50 top-0 -right-[30px] text-richblack-5 flex flex-col items-center gap-y-5 glass2 p-5 transition-all duration-200">
                            <div className="flex flex-col gap-y-4 w-fit relative">
                            {
                                token === null && (
                                    <Link to={"/login"} onClick={() =>setShowHandler(!showHandler)} >
                                        <button className="rounded-[8px] border bg-yellow-50 border-yellow-50 px-[18px] py-[8px] text-black">
                                            Log in
                                        </button>
                                    </Link>
                                )
                            }
                            {
                                token === null && (
                                    <Link to={"/signup"} onClick={() =>setShowHandler(!showHandler)}>
                                        <button className="rounded-[8px] border bg-yellow-50 border-yellow-50 px-[12px] py-[8px] text-black">
                                            Sign up
                                        </button>
                                    </Link>
                                )
                            }
                            {
                                token !== null &&
                                    <div className="flex flex-col gap-y-4 justify-between h-fit items-center">
                                        <p>Account</p>
                                        <ProfileDropDown/> 
                                    </div>
                            }
                            </div>
                            <div className=" mt-4 mb-4 bg-richblack-25 w-[150px] h-[2px]"></div>
                            <div>
                                <h1 className="text-xl font-semibold text-yellow-50">Courses</h1>
                                {
                                    loading ? 
                                    (
                                        <p className="text-center">Loading...</p>
                                    )  :
                                    (
                                        (subLinks && subLinks.length > 0 ) ? (
                                            <>
                                                {
                                                    subLinks.filter((subLink) => subLink?.course?.length > 0).map(
                                                        (subLink,index) =>{
                                                            return (
                                                                <Link
                                                                key={index}
                                                                to={`/catalog/${subLink.categoryName.split(" ").join("-").toLowerCase()}`}
                                                                className=" bg-transparent ml-2">
                                                                    <p className={`${CategoryName === subLink.categoryName.split(" ").join("-").toLowerCase() ? "text-yellow-50" : ""}`}>{subLink.categoryName}</p>
                                                                </Link>
                                                            )
                                                        }
                                                    )
                                                }
                                            </>
                                                ) :
                                                (   
                                                <p className="text-center">No Courses Found</p> 
                                                )
                                    )
                                }
                            </div>
                            <div className=" mt-4 mb-4 bg-richblack-25 w-[150px] h-[2px]"></div>
                            <div>
                                <ul className="flex flex-col gap-y-4 text-richblack-25">
                                    {
                                        NavbarLinks.map((element,index) =>{
                                            return (                                                
                                                (element.title === "Home" || element.title === "Catalog") ? (
                                                    null
                                                ) : (
                                                    <li key={index} onClick={() =>setShowHandler(!showHandler)}>
                                                        <Link to={element?.path}>
                                                            <p className={`
                                                                ${matchRoute(element?.path) ?
                                                                "text-yellow-50" :
                                                                "text-richblack-25"}`}>{element.title}
                                                            </p>
                                                        </Link>
                                                    </li>
                                                )                                                
                                            )
                                        })
                                    }
                                </ul>
                            </div>
                        </div>
                    )
                    }
                </button>
                
            </div>
            
        </div>
    )
}

export default Navbar;