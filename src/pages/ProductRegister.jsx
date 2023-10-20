import React, { useEffect, useRef, useState } from "react";
import PageTitle from "../component/common/PageTitle";
import ProductForm from "../userForm/ProductForm";
import "../userCss/userCss.css";
import axios from 'axios';

const ProductRegister = () => {

    const submit = values => {
        console.log("submit" , values["name"]);

        axios.post('/product/insert', {
            name : values["name"]
            , co2eq : values["co2eq"]
            , companyId : 3
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

    const { state, handleChange, handleSubmit } = ProductForm(submit);
    return (
        <>
            <PageTitle />
            <div className="p-[1.875rem]">
                <div className="bg-white ">
                    <ul>
                        <li className="mb-2 pb-2 flex flex-col">
                            <p className="text-text-dark text-xl font-extrabold leading-none">Product Info Register</p>
                        </li>
                    </ul>
                </div>
                <form onSubmit={handleSubmit} noValidate>
                <div className="card h-auto mb-5">
                    <div className="p-4 flex items-center justify-between">
                        <div>
                            <ProductInput
                                state={state}
                                handleChange={handleChange}
                                name="product name"
                                label="Product Name"
                            />
                        </div>
                    </div>
                    <div className="p-4 flex items-center justify-between">
                        <div>
                            <ProductInput
                                    state={state}
                                    handleChange={handleChange}
                                    name="co2eq"
                                    label="CO2EQ"
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

export default ProductRegister;

const ProductInput = ({ name , label, state, handleChange}) => {
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