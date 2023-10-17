import React, { useEffect } from "react";
import PageTitle from "../component/common/PageTitle";
import CompanyForm from "../userForm/companyForm";
import "../userCss/userCss.css";
import axios from 'axios';

const CompanyRegister = () => {
    const submit = values => {
        console.log("submit" , values["name"]);


        axios.post('/company/insert', {
            name : values["name"]
            , website : values["website"]
            ,logImageUrl : values["logoImageUrl"]
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

    const { state, handleChange, handleSubmit } = CompanyForm(submit);
    return (
        <>
            <PageTitle />
            <div className="p-[1.875rem]">
                <div className="bg-white ">
                    <ul>
                        <li className="mb-2 pb-2 flex flex-col">
                            <p className="text-text-dark text-xl font-extrabold leading-none">Company Info Register</p>
                        </li>
                    </ul>
                </div>
                <form onSubmit={handleSubmit} noValidate>
                <div className="card h-auto mb-5">
                    <div className="p-4 flex items-center justify-between">
                        <div>
                            <CompanyInput
                                state={state}
                                handleChange={handleChange}
                                name="name"
                                label="Name"
                            />
                        </div>
                    </div>
                    <div className="p-4 flex items-center justify-between">
                        <div>
                            <CompanyInput
                                state={state}
                                handleChange={handleChange}
                                name="website"
                                label="Website"
                            />
                        </div>
                    </div>
                    <div className="p-4 flex items-center justify-between">
                        <div>
                            <CompanyInput
                                state={state}
                                handleChange={handleChange}
                                name="logoImageUrl"
                                label="LogoImageUrl"
                            />
                        </div>
                    </div>
                    <div className="p-4 flex items-center justify-between">
                        <div>
                            <CompanyInput
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

export default CompanyRegister;

const CompanyInput = ({ name , label, state, handleChange}) => {
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