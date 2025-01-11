import react from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import IconBtn from "../../common/IconBtn";
import { LiaEditSolid } from "react-icons/lia";

const MyProfile = () =>{
    const {user} = useSelector((state) =>state.profile);
    const navigate = useNavigate();
    return (
        <>
            <div className="flex flex-col mb-4">
                <div className="flex flex-row justify-between items-start">
                    <h1 className="mb-14 text-richblack-5 text-3xl font-medium">My Profile</h1> 
                    <div className="flex items-center bg-yellow-50 rounded-md border-1 md:hidden py-2 px-5 text-black gap-1 cursor-pointer">
                        <IconBtn
                        text="Edit"
                        onClick = {() => navigate("/dashboard/settings")}                       
                        />
                        <LiaEditSolid/>
                    </div>
                </div>
                
                {/* Section 1 */}
                <div className="flex flex-row bg-richblack-800 p-8 px-12 justify-between items-center rounded-md border-[1px] border-richblack-700 text-richblack-5 ">
                    <div className="flex flex-row items-center gap-2 md:gap-5">
                        <img src={user?.imageUrl} alt={`profile-${user.firstName}`}
                        className="aspect-square w-[70px] rounded-full object-cover" />
                        <div className="space-y-1">
                            <p className="font-semibold text-xl">{user?.firstName + " " + user?.lastName}</p>
                            <p className="text-richblack-300 text-[16px]">{user?.email}</p>
                        </div>
                    </div>
                    <div className="hidden md:flex items-center bg-yellow-50 rounded-md border-1 py-2 px-5 text-black gap-1 cursor-pointer">
                        <IconBtn
                        text="Edit"
                        onClick = {() => navigate("/dashboard/settings")}                       
                        />
                        <LiaEditSolid/>
                    </div>
                </div>
                
                {/* Section 2 */}
                <div className="my-10 flex flex-col gap-y-10 bg-richblack-800 p-8 px-12 justify-between rounded-md border-[1px] border-richblack-700 text-richblack-5 ">
                    <div className="flex flex-row bg-richblack-800 items-center justify-between  ">
                        <div className="flex flex-row items-center w-full">
                            <p className="font-semibold text-xl">About</p>
                        </div>
                        <div className="hidden md:flex items-center bg-yellow-50 rounded-md border-1 py-2 px-5 text-black gap-1 cursor-pointer">
                            <IconBtn
                            text="Edit"
                            onClick = {() => navigate("/dashboard/settings")}
                            />
                            <LiaEditSolid/>
                        </div>
                    </div>
                    <div className={`${user?.additionalDetails?.about ? "text-richblack-5" : "text-richblack-300"}`}>
                        <p>{user?.additionalDetails?.about ?? "Write Something About Yourself"}</p>
                    </div>
                </div>
                {/* Section 3 */}
                <div className=" flex flex-col gap-y-10 bg-richblack-800 p-8 px-12 justify-between rounded-md border-[1px] border-richblack-700 text-richblack-5 ">
                    <div className="flex flex-row bg-richblack-800 items-center justify-between  ">
                        <div className="flex flex-row items-center w-full">
                            <p className="font-semibold text-xl">Personal Details</p>
                        </div>
                        <div className="hidden md:flex items-center bg-yellow-50 rounded-md border-1 py-2 px-5 text-black gap-1 cursor-pointer">
                            <IconBtn
                            text="Edit"
                            onClick = {() => navigate("/dashboard/settings")}
                            />
                            <LiaEditSolid/>
                        </div>
                    </div>
                    <div className="flex max-w-[500px] md:flex-row flex-col gap-y-5 justify-between">
                        <div className="flex flex-col gap-y-5">
                            <div>
                                <p className="mb-2 text-sm text-richblack-300">First Name</p>
                                <p className="text-sm font-medium text-richblack-5">{user?.firstName}</p>
                            </div>
                            <div>
                                <p className="mb-2 text-sm text-richblack-300">Email</p>
                                <p className="text-sm font-medium text-richblack-5">{user?.email}</p>
                            </div>
                            <div>
                                <p className="mb-2 text-sm text-richblack-300">Gender</p>
                                <p className="text-sm font-medium text-richblack-5">{user?.additionalDetails?.gender ?? "Add Gender"}</p>
                            </div>
                        </div>
                        <div className="flex flex-col gap-y-5">
                            <div>
                                <p className="mb-2 text-sm text-richblack-300">Last Name</p>
                                <p className="text-sm font-medium text-richblack-5">{user?.lastName}</p>
                            </div>
                            <div>
                                <p className="mb-2 text-sm text-richblack-300">Contact Number</p>
                                <p className="text-sm font-medium text-richblack-5">{user?.additionalDetails?.contactNumber ?? "Add Contact Number"}</p>
                            </div>
                            <div>
                                <p className="mb-2 text-sm text-richblack-300">Date Of Birth</p>
                                <p className="text-sm font-medium text-richblack-5">{user?.additionalDetails?.dateOfBirth ? new Date(user.additionalDetails.dateOfBirth).toISOString().split('T')[0] : "Add Date Of Birth"}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default MyProfile;