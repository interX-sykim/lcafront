import React, { useEffect } from "react";
import PageTitle from "../component/common/PageTitle";
import MemberForm from "../userForm/MemberForm";
import "../userCss/userCss.css";
import axios from 'axios';

const MemberRegister = () => {
    const submit = values => {
        console.log("submit" , values);


        axios.post('/member/insert', {
            name : values["name"]
            ,pwd : values["password"]
            ,id : values["id"]
            ,email : values["email"]
        })
        .then((response) => {
            if(response.data["rsltCode"] === "F")
                alert(response.data["rsltMsg"]);
            else if(response.data["rsltCode"] === "S")
                alert(response.data["rsltMsg"]);
        })
        .catch((error) => {
            alert("등록실패")
        });
    };

    const { state, handleChange, handleSubmit } = MemberForm(submit);
    return (
        <>
            <PageTitle />
            <div className="p-[1.875rem]">
                <div className="bg-white ">
                    <ul>
                        <li className="mb-2 pb-2 flex flex-col">
                            <p className="text-text-dark text-xl font-extrabold leading-none">Member Info Register</p>
                        </li>
                    </ul>
                </div>
                <form onSubmit={handleSubmit} noValidate>
                <div className="card h-auto mb-5">
                    <div className="p-4 flex items-center justify-between">
                        <div>
                            <MemberInput
                                state={state}
                                handleChange={handleChange}
                                name="id"
                                label="ID"
                            />
                        </div>
                    </div>
                    <div className="p-4 flex items-center justify-between">
                        <div>
                            <MemberInput
                                state={state}
                                handleChange={handleChange}
                                name="password"
                                label="Password"
                            />
                        </div>
                    </div>
                    <div className="p-4 flex items-center justify-between">
                        <div>
                            <MemberInput
                                state={state}
                                handleChange={handleChange}
                                name="name"
                                label="Name"
                            />
                        </div>
                    </div>
                    <div className="p-4 flex items-center justify-between">
                        <div>
                            <MemberInput
                                state={state}
                                handleChange={handleChange}
                                name="email"
                                label="Email"
                            />
                        </div>
                    </div>
                    <div className="p-4 flex items-center justify-between">
                        <div className='form-actions'>
                            <button type="submit" className="submit-btn">Register</button>
                        </div>
                    </div>
                </div>
                </form>
            </div>
        </>
    );
};

export default MemberRegister;

const MemberInput = ({ name , label, state, handleChange}) => {
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