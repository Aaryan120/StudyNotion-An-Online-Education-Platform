import react from "react";
import ChangeProfilePicture from "./ChangeProfilePicture";
import EditProfile from "./EditProfile";
import ChangePassword from "./ChangePassword";
import DeleteAccount from "./DeleteAccount";


const Settings = () =>{
    return (
        <>
            <div className="flex flex-col">
                <h1 className="text-3xl font-medium text-richblack-5 mb-14">Edit Profile</h1>

                <ChangeProfilePicture/>

                <EditProfile/>

                <ChangePassword/>

                <DeleteAccount/>
            </div>
        </>
        
    )
}

export default Settings;