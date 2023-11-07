import React, { useEffect, useRef, useState } from "react";
import PageTitle from "../component/common/PageTitle";
import ProductForm from "../userForm/ProductForm";
import "../userCss/userCss.css";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const ProductRegister = () => {
    const [codeList, setCodeList] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        axios.post("/common/list", {
            codeId : "unit"
        })
        .then((response) => {
            setCodeList(response.data["rsltList"])
            console.log(codeList)
        })
        .catch((error) => {
            console.log(error);
        });
    }, [])

    const submit = values => {
        console.log("submit" , values);

        axios.post('/product/insert', {
            name : values["product name"]
            , co2eq : values["co2eq"]
            , companyId : sessionStorage.getItem("companyId")
            , unitCd: document.getElementById("grid-state").value
            , createdId : sessionStorage.getItem("memberId")
            , modifiedId : sessionStorage.getItem("memberId")
        })
        .then((response) => {
            if(response.data["rsltCode"] === "F")
                alert(response.data["rsltMsg"]);
            else if(response.data["rsltCode"] === "S")
                alert(response.data["rsltMsg"]);
            navigate("/")
        })
        .catch((error) => {
            alert("등록실패")
        });
    };

    const renderCodeList = codeList.map((code) => {
        return (
            <option value={code.codeCd}>{code.codeName}</option>
    )})

    function goProduct(){
        document.location.href = "/dxai/" + sessionStorage.getItem("companyId");
    }

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
                                type="text"
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
                                    type="text"
                            />
                        </div>
                    </div>
                    <div class="w-80 px-4 p-4 mb-6 md:mb-0">
                        <label for="grid-state">
                            Unit
                        </label>
                        <div class="relative">
                            <select class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state">
                            {renderCodeList}
                            </select>
                            <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                            <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                            </div>
                        </div>
                    </div>
                    <div className="p-4 flex items-center justify-between">
                        <div className='flex form-actions'>
                            <button type="submit" className="submit-btn">Register</button>&nbsp;<button onClick={() => {goProduct()}} className="submit-btn">Cancle</button>
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