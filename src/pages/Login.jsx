import React, { useEffect, useState } from "react";
import LoginForm from "../userForm/loginForm";
import "../userCss/userCss.css";
import axios from 'axios';

const Login = () => {

    useEffect(() => {
        console.log("accessToken:::::::::::::" + sessionStorage.getItem("accessToken"));
        if(sessionStorage.getItem("accessToken") != null && sessionStorage.getItem("companyId")){
            document.location.href = "/dxai/"+sessionStorage.getItem("companyId");
            return ;
        }
    }, []);

    console.log("login access page :::" + localStorage.getItem("accessToken"));
    function successLoginProcess(response){

        console.log(response.data["rsltList"][0]["companyId"]);

        sessionStorage.setItem("accessToken", response.data["rsltList"][0]["jwtTokenDTO"]["accessToken"]);
        sessionStorage.setItem("refreshToken",response.data["rsltList"][0]["jwtTokenDTO"]["refreshToken"]);

        sessionStorage.setItem("memberId", response.data["rsltList"][0]["memberId"]);
        sessionStorage.setItem("companyId", response.data["rsltList"][0]["companyId"]);

        document.location.href = "/dxai/"+response.data["rsltList"][0]["companyId"];
    }
   const submit = values => {
        console.log("id" , values["id"]);
        console.log("password" , values["password"]);

        axios.post('/member/login', {
            id : values["id"] 
            , pwd : values["password"]
        })
        .then((response) => {
            //console.log(response);

            if(response.data["rsltCode"] == "S"){
                successLoginProcess(response);
            }else{
                alert("로그인실패" + response.data["rsltMsg"]);
            }
        })
        .catch((error) => {
            alert("로그인실패" + error)
        });
      
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