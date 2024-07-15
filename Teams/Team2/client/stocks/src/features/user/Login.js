import React, { useRef } from 'react'
import {useNavigate} from "react-router-dom"
import {login} from "./userApi"
import { useDispatch } from 'react-redux'
import { saveUser } from './userSlice'

const Login = () => {
    let dispatch=useDispatch();
    const emailInput=useRef(null);
     let navigate=useNavigate();

    const handleSubmit=(event)=>{
        event.preventDefault();
    //   if( login(emailInput.current.value)) 
       
    dispatch(saveUser(emailInput.current.value)); 
     navigate("/notifications")
        // .then(
        //     navigate("/notifications")
        // ).
        // catch(err=>alert("מייל לא תקין"))
       

    }


    return ( 
    <form  onSubmit={handleSubmit}>
     <input type="text" placeholder='כתובת מייל' ref={emailInput}/>
     <input type="submit" value="login" />
     
    </form> );
}
 
export default Login;