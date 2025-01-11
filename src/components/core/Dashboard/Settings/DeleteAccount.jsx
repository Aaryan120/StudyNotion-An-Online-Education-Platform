import react from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import IconBtn from "../../../common/IconBtn";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteAccount } from "../../../../services/operations/settingsAPI";
import { FiTrash2 } from "react-icons/fi";

const DeleteAccount = () =>{
    const {token} = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const changeHandler = async () =>{
        try {
            dispatch(deleteAccount(token,navigate));
        } catch (error) {
            console.log("ERROR...",error);
        }
    }
    return (
        <div className="my-10 flex flex-row gap-x-5 bg-pink-900 p-8 px-12  rounded-md border-[1px] border-pink-700 text-richblack-5 "> 
                <div className="hidden md:flex gap-x-5">
                    <div className="flex aspect-square h-14 w-14 items-center justify-center rounded-full bg-pink-700">
                    <FiTrash2  className="text-3xl text-pink-200"/>
                    </div>
                    <div className="flex flex-col space-y-2">
                        <p className="text-lg font-semibold text-richblack-5">Delete Account</p>
                        <div className="w-3/5 text-pink-25 text-sm font-medium ">
                            <p>Would you like to delete account?</p>
                            <p>This account contains Paid Courses. Deleting your account will remove all the contain associated with it</p>
                        </div>
                        <button 
                        onClick={changeHandler}
                        className="w-fit cursor-pointer italic text-pink-300"
                        >
                            I want to delete my account
                        </button>
                    </div>
                </div>
                <div className="md:hidden ">
                    <div className="flex flex-row gap-x-5 items-center mb-4">
                        <div className="flex aspect-square h-14 w-14 items-center justify-center rounded-full bg-pink-700">
                        <FiTrash2  className="text-3xl text-pink-200"/>
                        </div>
                        <p className="text-xl font-bold text-richblack-5">Delete Account</p>
                    </div>
                    <div className="flex gap-y-2 flex-col">
                        <div className="text-pink-25 leading-6 text-sm font-medium ">
                            <p>Would you like to delete account?</p>
                            <p>This account contains Paid Courses. Deleting your account will remove all the contain associated with it</p>
                        </div>
                        <button 
                        onClick={changeHandler}
                        className="w-fit cursor-pointer italic text-pink-300"
                        >
                            I want to delete my account
                        </button>
                    </div>
                </div>
        </div>
    )
}

export default DeleteAccount;