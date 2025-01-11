import React from "react";
import SigninImage from "../assets/Images/signup.webp";
import Template from "../components/core/Auth/Template";
const Signin = () =>{
    return(
        <div>
            <Template
            title = {"Join the millions learning to code with StudyNotion for free"}
            description1 = {"Build skills for today, tomorrow, and beyond."}
            description2 = {"Education to future-proof your career."}
            image={SigninImage}
            formType="Signup"
            />
        </div>
    )
}

export default Signin;