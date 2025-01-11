import react, { useState } from "react";
import { sidebarLinks } from "../../../data/dashboard-links";
import { logout } from "../../../services/operations/authAPI";
import { useDispatch, useSelector } from "react-redux";
import SidebarLink from "./SidebarLink";
import { useNavigate } from "react-router-dom";
import ConfirmModal from "../../common/ConfirmModal";
import { VscSignOut } from "react-icons/vsc";


const Sidebar = () =>{
    const {user,loading:profileLoading} = useSelector((state)=>state.profile);

    const {loading:authLoading} = useSelector((state)=>state.auth)
    const [confirmationModal,setConfirmationModal] = useState(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    if(profileLoading || authLoading){
        return (
            <div className="spinner">
            </div>
        )
    }
    return(
        <div>
            <div className="hidden lg:flex min-w-[222px] flex-col border-r-[1px] border-richblack-700 h-[100%] bg-richblack-800 py-10">
                <div className="flex flex-col pb-2 ">
                    {
                        sidebarLinks.map((element) =>{
                            if(element.type && user?.accountType !== element.type) return null;
                            return(
                                <SidebarLink key={element.id} element={element} iconName={element.icon}/>
                            )        
                        })
                    }
                </div>

                <div className="border border-richblack-700 w-full h-[1px]">
                </div>
                <div className="flex min-w-[222px] flex-col border-r-[1px] border-richblack-700 h-[calc(100vh-3.5rem)] bg-richblack-800 py-2">
                    <SidebarLink
                    element={{name:"Settings",path:"dashboard/settings"}}
                    iconName={"VscSettingsGear"}/>
                    
                    <button onClick={() => setConfirmationModal({
                        text1:"Are You Sure ?",
                        text2:"You will be logged out of your Account",
                        btn1Text:"Logout",
                        btn2Text:"Cancel",
                        btn1Handler: () => dispatch(logout(navigate)),
                        btn2Handler: () => setConfirmationModal(null),
                    })}>
                        <div className="flex items-center text-richblack-300 pl-8 mt-2 gap-2 text-sm">
                            <VscSignOut/>
                            Log Out
                        </div>
                    </button>
                </div>
            </div>

            {/* less than medium size sidebar */}
            <div className="lg:hidden fixed min-h-[50px] md:min-h-[30px] w-full bg-richblack-800 bottom-0 z-50 items-center justify-between px-2 py-1">
              <div className="flex flex-row items-center justify-between ">
                {
                    sidebarLinks.map((element) =>{
                        if(element.type && user?.accountType !== element.type) return null;
                        return(
                            <SidebarLink key={element.id} element={element} iconName={element.icon}/>
                        )        
                    })
                }
                <SidebarLink
                    element={{name:"Settings",path:"dashboard/settings"}}
                    iconName={"VscSettingsGear"}/>
              </div>
            </div>
           {confirmationModal && <ConfirmModal modalData={confirmationModal}/>} 
        </div>
    )
}

export default Sidebar;