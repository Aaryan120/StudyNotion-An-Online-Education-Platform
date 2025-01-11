import react from "react";
import { useDispatch, useSelector } from "react-redux";
import IconBtn from "../../../common/IconBtn";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useRef } from "react";
import { updateDisplayPicture } from "../../../../services/operations/settingsAPI";
import { useEffect } from "react";
import { FiUpload } from "react-icons/fi";
const ChangeProfilePicture = () =>{
    const {user} = useSelector((state) => state.profile);
    const {token} = useSelector((state) =>state.auth);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [previewSource,setPreviewSource] = useState(null);
    const [loading,setLoading] = useState(false);
    const [imageFile,setImageFile] = useState(null);


    const fileInputRef = useRef(null);

    const handleClick = () =>{
        fileInputRef.current.click()
    }

    const handleFileChange = (event) =>{
        const file = event.target.files[0];
        if(file){
            setImageFile(file);
            previewFile(file)
        }
    }

    const previewFile = (file) => {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onloadend = () => {
          setPreviewSource(reader.result)
        }
    }

    const handleFileUpload = () =>{
        try{
            setLoading(true);
            const formData = new FormData();
            formData.append("displayPicture",imageFile);
            dispatch(updateDisplayPicture(token,formData)).then(() =>{
                setLoading(false);
            })
        }
        catch(error){
            console.log("ERROR MESSAGE - ",error)
        }
    }
    useEffect(() =>{
        if(imageFile){
            previewFile(imageFile);
        }
    },[imageFile])
    return (
        <div className="flex flex-col">
            <div className="flex flex-row bg-richblack-800 p-8 md:p-8 md:px-12 justify-between items-center rounded-md border-[1px] border-richblack-700 text-richblack-5 ">
                    <div className="flex flex-row items-center gap-x-4">
                        <img src={previewSource || user?.imageUrl} alt={`profile-${user?.firstName}`}
                        className="aspect-square w-[70px] rounded-full object-cover" />
                        <div className="space-y-2">
                            <p className="font-semibold text-xl">Change Profile Picture</p>
                            <div className="flex flex-row gap-3">
                                <input
                                type="file"
                                ref={fileInputRef}
                                onChange={handleFileChange}
                                className="hidden"
                                accept="image/png,image/gif,image/jpeg"
                                />
                                <button
                                onClick={handleClick}
                                disabled={loading}
                                className="cursor-pointer rounded-md bg-richblack-700 py-2 px-5 font-semibold text-richblack-5">
                                    Select
                                </button>
                                <div className="flex flex-row items-center gap-2 py-2 px-5 bg-yellow-50 rounded-md text-black cursor-pointer">
                                    <IconBtn
                                        text={loading ? "Uploading..." : "Upload"}
                                        onClick={handleFileUpload}>
                                    </IconBtn>
                                    {!loading && <FiUpload className="text-lg text-richblack-900"/>}
                                </div>
                                
                            </div>
                        </div>
                    </div>
                </div>
        </div>
    )
}

export default ChangeProfilePicture;