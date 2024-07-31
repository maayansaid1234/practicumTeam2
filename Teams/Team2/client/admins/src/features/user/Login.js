import React, { useRef } from 'react';
import { useNavigate } from "react-router-dom";
import { login } from "./userApi";
import { useDispatch } from 'react-redux';
import { saveUser } from './userSlice';
import './login.css';

const Login = () => {
    let dispatch = useDispatch();
    const emailInput = useRef(null);
    let navigate = useNavigate();

    const handleSubmit = async (event) => {
        try {
            event.preventDefault();
            let res = await login({ "userMail": emailInput.current.value });
          

            dispatch(saveUser(emailInput.current.value));
            navigate("/notifications");
        } catch (err) {
            console.log(err);
            if (err.response && err.response.status=== 404)
                alert("Not found");
            else
                alert("Error");
        }
    }

    return (
        <div className="login-container">
            <form className="login-form" onSubmit={handleSubmit}>
                <h1 className="login-title">Welcome Back</h1>
                <input
                    type="email"
                    placeholder='Email Address'
                    ref={emailInput}
                    className="login-input"
                    required
                />
                <input
                    type="submit"
                    value="Login"
                    className="login-button"
                />
            </form>
        </div>
    );
}

export default Login;
