import react from "react";
import IconBtn from "./IconBtn";

const ConfirmModal = (modalData) =>{
    return (
        <div className="fixed inset-0 z-[1000] !mt-0 grid place-items-center overflow-auto bg-white bg-opacity-10 backdrop-blur-sm">
            <div className="w-11/12 max-w-[350px] rounded-lg border border-richblack-400 bg-richblack-800 p-6">
                <p className="text-2xl font-semibold text-richblack-5">
                    {modalData?.modalData?.text1}
                </p>
                <p className="mt-3 mb-5 leading-6 text-richblack-200">
                    {modalData?.modalData?.text2}
                </p>
                <div className="flex items-center gap-x-4">
                    <div className="bg-yellow-50 px-5 py-2 rounded-md text-black font-semibold cursor-pointer">
                        <IconBtn 
                        text={modalData?.modalData?.btn1Text}
                        onClick={modalData?.modalData?.btn1Handler}/>
                    </div>
                    


                    <button onClick={modalData?.modalData?.btn2Handler}
                    className="cursor-pointer rounded-md bg-richblack-200 py-[8px] px-[20px] font-semibold text-richblack-900">
                        {modalData?.modalData?.btn2Text}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ConfirmModal;