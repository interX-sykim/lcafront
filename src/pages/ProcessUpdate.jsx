import React, { useEffect, useRef, useState } from "react";
import PageTitle from "../component/common/PageTitle";
import ProcessForm from "../userForm/ProcessForm";
import "../userCss/userCss.css";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useLocation } from "react-router-dom";

const ProcessUpdate = () => {
    const [codeList, setCodeList] = useState([]);
    const defaultState = useLocation().state

    const navigate = useNavigate();

    const submit = values => {
        console.log("submit" , defaultState);

        axios.post('/process/update', {
            id : defaultState.id,
            name : defaultState.name
            , co2eq : values["co2eq"]
            , updateRequested : "N"
            , modifiedId : sessionStorage.getItem("memberId")
        })
        .then((response) => {
            if(response.data["rsltCode"] === "F") {
                console.log(response.data)
                alert(response.data["rsltMsg"]);
            }
            else if(response.data["rsltCode"] === "S")
                alert(response.data["rsltMsg"]);
            navigate("/")
        })
        .catch((error) => {
            alert("수정실패")
        });
    };

    const { state, handleChange, handleSubmit } = ProcessForm(submit);
    state.input["process name"] = defaultState.name
    return (
        <>
            <PageTitle />
            <div className="p-[1.875rem]">
                <div className="bg-white ">
                    <ul>
                        <li className="mb-2 pb-2 flex flex-col">
                            <p className="text-text-dark text-xl font-extrabold leading-none">Process Info Register</p>
                        </li>
                    </ul>
                </div>
                <form onSubmit={handleSubmit} noValidate>
                <div className="card h-auto mb-5">
                    <div className="p-4 flex items-center justify-between">
                        <div>
                            <label>Process Name : {defaultState.name}</label>
                        </div>
                    </div>
                    <div className="p-4 flex items-center justify-between">
                        <div>
                            <ProcessInput
                                    state={state}
                                    handleChange={handleChange}
                                    name="co2eq"
                                    label="CO2EQ"
                                    type="text"
                                    value={defaultState.co2eq}
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

export default ProcessUpdate;

const ProcessInput = ({ name , label, state, handleChange, value}) => {
    return(
        <label>
            {label}
            <input 
                type={name}
                placeholder={value}
                name={name}
                value={state.input[name]}
                onChange={handleChange}
            />
            <span>{state.validationErrs[name]}</span>
        </label>
    )
}