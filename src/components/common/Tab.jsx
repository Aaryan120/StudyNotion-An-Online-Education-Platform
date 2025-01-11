import react from "react";

const Tab = ({tabData,accountType,setAccountType}) =>{
    return(
        <div className="flex bg-richblack-800 p-1 gap-x-1 my-6 rounded-full max-w-max ">
            {
                tabData.map((account,index) =>(
                    <button key={index} onClick={() => setAccountType(account.tabName)} className={`${accountType === account?.tabName ?
                    "text-richblack-5 bg-richblack-900":
                    "text-richblack-300 bg-richblack-800"
                    } py-2 px-5 rounded-full transition-all duration-200`}>
                        {account?.tabName}
                    </button>
                ))
            }
        </div>
    )
}

export default Tab;