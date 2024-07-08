import React, { useRef } from 'react'
import {useNavigate} from "react-router-dom"
import {login} from "./userApi"

const Login = () => {
    const emailInput=useRef(null);
     let navigate=useNavigate();

    const handleSubmit=(event)=>{
        event.preventDefault();
    //   if( login(emailInput.current.value)) 
         navigate("/notifications")
        // .then(
        //     navigate("/notifications")
        // ).
        // catch(err=>alert("מייל לא תקין"))
       

    }


    return ( 
    <form  onSubmit={handleSubmit}>
     <input type="email" placeholder='כתובת מייל' ref={emailInput}/>
     <input type="submit" value="login" />
     
    </form> );
}
 
export default Login;