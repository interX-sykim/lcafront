import React, { useEffect, useState} from "react";
import PageTitle from "../component/common/PageTitle";
import MemberForm from "../userForm/MemberForm";
import "../userCss/userCss.css";
import axios from 'axios';

const MemberDetail = () => {
    const [memberList , setMemberList] = useState({
        id: '',
        email: '',
        pwd: '',
        name: '',
    });

    const { id, email, pwd, name } = memberList;

    useEffect(() => {
        axios.post('/member/list', {
            id : "yulim"
        })
        .then((response) => {
            console.log(response);
            setMemberList(response.data["rsltList"][0]);
        })
        .catch((error) => {
            console.log(error);
            setMemberList([]);
        });

    }, []);

    const submit = values => {
        console.log("submit" , values);


        axios.post('/member/update', {
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
                            <p className="text-text-dark text-xl font-extrabold leading-none">Member Info Modify</p>
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
                                value={id}
                                readonly={true}
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
                                value={pwd}
                                readonly={false}
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
                                value={name}
                                readonly={false}
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
                                value={email}
                                readonly={false}
                            />
                        </div>
                    </div>
                    <div className="p-4 flex items-center justify-between">
                        <div className='form-actions'>
                            <button type="submit" className="submit-btn">Modify</button>
                        </div>
                        <div className='form-actions'>
                            <button className="submit-btn">CALCLE</button>
                        </div>
                    </div>
                </div>
                </form>
            </div>
        </>
    );
};

export default MemberDetail;

const MemberInput = ({ name , label, value, readonly, state, handleChange}) => {
    return(
        <label>
            {label}
            <input 
                type={name}
                placeholder={name}
                name={name}
                value={value}
                readOnly={readonly}
                onChange={handleChange}
            />
            <span>{state.validationErrs[name]}</span>
        </label>
    )
}