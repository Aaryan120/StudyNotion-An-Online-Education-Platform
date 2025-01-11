import react, { useRef } from "react";
import { useState } from "react";
import { CgProfile } from "react-icons/cg";
import { useSelector } from "react-redux";
import { VscDashboard } from "react-icons/vsc";
import { VscSignOut } from "react-icons/vsc";
import { AiOutlineCaretDown } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {logout} from "../../../services/operations/authAPI"
import useOnClickOutside from "../../../hooks/useOnClickOutside"

// const dropDownOptions = [
//     {
//         icon: <VscDashboard/>,
//         title:"Dashboard",
//         linkTo:"/dashboard"
//     },
//     {
//         icon: <VscSignOut/>,
//         title:"Log out",
//         linkTo:"" need to call the logout service
//     }
// ]

const ProfileDropDown = () =>{
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [dropDown,setDropDown] = useState(false);
    const {user} = useSelector((state) =>state.profile);
    const ref = useRef(null)
    useOnClickOutside(ref,() => setDropDown(false));
    if(!user) return null;
    return (
        <button onClick={() => setDropDown(!dropDown)} className="relative" ref={ref}>
            <div className="flex items-center gap-x-1 ">
                {
                    user?.imageUrl ? 
                    (
                        <img src={user?.imageUrl} alt="userImage" className="aspect-square rounded-full w-[30px] object-cover" />
                    ) : 
                    (
                        <div className="text-richblack-5 text-xl pb-1">
                            <CgProfile/>
                        </div>
                    )
                }
                <AiOutlineCaretDown className="text-md text-richblack-5 mb-1" />
            </div>
            {
                dropDown && (
                    <div
                    onClick={(event) => event.stopPropagation()}
                    className="absolute right-[-94%] top-[118%] md:right-[-20%]  z-[1000] divide-y-[1px] divide-richblack-700 overflow-hidden rounded-md border-[1px] border-richblack-700 bg-richblack-800 text-richblack-100"
                    >
                        <Link to={"/dashboard/my-profile"} onClick={()=>setDropDown(false)}>
                            <div className="flex items-center gap-x-2 w-full p-2 px-5">
                                <VscDashboard/>
                                Dashboard
                            </div> 
                        </Link>

                        <div onClick={() => {
                                dispatch(logout(navigate))
                                setDropDown(false)
                            }
                        }
                        className="flex items-center gap-x-2 w-full p-2 px-5"
                        >
                            <VscSignOut/>
                            Log out
                        </div>
                    </div>
                )
            }
        </button>
    )
}

export default ProfileDropDown;