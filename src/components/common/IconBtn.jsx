import react from "react";


const IconBtn = ({
    text,
    onClick,
    disabled,
    outline=false,
    customClasses,
    type,
    children
}) =>{
    return (
        <button
        disabled={disabled}
        onClick={onClick}
        type={type}
        >
            {
                children ?
                (
                    <>
                        <span>
                            {text}
                        </span>
                        {children}
                    </>
                ) : 
                (
                    text
                )
            }
        </button>
    )
}


export default IconBtn;