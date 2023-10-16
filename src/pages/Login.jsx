import React, { useEffect } from "react";
import LoginForm from "../userForm/loginForm";
import "../userCss/userCss.css";
import axios from 'axios';

const Login = () => {
    const submit = values => {
        console.log("id" , values["id"]);
        console.log("password" , values["password"]);

/*
        axios.post('/user/login', {
            id : values["id"]
            , pwd : values["password"]
        })
        .then((response) => {
            if(response.data["rsltCode"] === "F")
                alert(response.data["rsltMsg"]);
            else if(response.data["rsltCode"] === "S")
                alert(response.data["rsltMsg"]);
        })
        .catch((error) => {
            alert("로그인실패")
        });
*/        
    };

    const { state, handleChange, handleSubmit } = LoginForm(submit);
    return (
        <>
            <div className="p-[1.875rem]">
                <div className="bg-white ">
                    <ul>
                        <li className="mb-2 pb-2 flex flex-col">
                            <p className="text-text-dark text-xl font-extrabold leading-none">LOGIN</p>
                        </li>
                    </ul>
                </div>
                <form onSubmit={handleSubmit} noValidate>
                <div className="card h-auto mb-5">
                    <div className="p-4 flex items-center justify-between">
                        <div>
                            <LoginInput
                                state={state}
                                handleChange={handleChange}
                                name="id"
                                label="ID"
                            />
                        </div>
                    </div>
                    <div className="p-4 flex items-center justify-between">
                        <div>
                            <LoginInput
                                state={state}
                                handleChange={handleChange}
                                name="password"
                                label="PASSWORD"
                            />
                        </div>
                    </div>
                    <div className="p-4 flex items-center justify-between">
                        <div className='form-actions'>
                            <button type="submit" className="submit-btn">Login</button>
                        </div>
                    </div>
                </div>
                </form>
            </div>
        </>
    );
};

export default Login;

const LoginInput = ({ name , label, state, handleChange}) => {
    return(
        <label>
            {label}
            <input 
                type={name}
                placeholder={name}
                name={name}
                value={state.input[name]}
                onChange={handleChange}
            />
            <span>{state.validationErrs[name]}</span>
        </label>
    )
}