import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import machine from "../content/images/img-machine.jpg";
import PieChart from "../component/common/PieChart";

import { ResponsiveLine } from '@nivo/line';

import ComponentModifyModal from '../component/modals/ComponentModifyModal';

import {useParams} from "react-router"
import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios'

const ProductDetail = ({route}) => {
    const state = useLocation().state
    const [elecPowerLogList, setElecPowerLogList] = useState([]);
    const [renderCnt, setRenderCnt] = useState(0);
    const [productList , setProductList] = useState([]);

    const params = useParams();

    const navigate = useNavigate();
    sessionStorage.setItem("productId", params.productId)
    
    const scrollRef = useRef();

    useEffect(() => {

        axios.post('/product/list', {
            id : params.productId
            ,companyId : sessionStorage.getItem("companyId")
        })
        .then((response) => {
            if(response.data["rsltCode"] === "F") setProductList([])
            else setProductList(response.data["rsltList"][0]);
        })
        .catch((error) => {
            console.log(error);
            setProductList([]);
        });

        axios.post("/resource/list", {
            id: 3
        })
        .then((res) => {
            setElecPowerLogList(res.data)
        })
        .catch((error) => {
            setElecPowerLogList([])
            console.log(error)
        })

    }, []);

    const data = []
    for (var i=0; i < elecPowerLogList.length; i++) {
        data.push({x:elecPowerLogList[i]["timestamp"], y:elecPowerLogList[i]["quantity"]})
    }
    console.log(elecPowerLogList.length)
    const lineChart = [{
        "id": "Power",
        "color": "hsl(205, 70%, 50%)",
        "data": data
    }]
    

    function goLogOut(){
        sessionStorage.removeItem('accessToken');
        sessionStorage.removeItem('refreshToken');
        sessionStorage.removeItem('memberId');
        sessionStorage.removeItem('companyId');

        document.location.href = "/dxai/";
    }

    return (
        <>
            <div className="card h-[3.75rem] px-5 flex items-center cursor-pointer select-none" onClick={() => navigate('/')}>
                <i className="icon-chevron_left w-[2.125rem] h-[2.125rem] text-2xl flex items-center justify-center text-default cursor-pointer select-none mr-2"></i>
                <p className="text-base font-bold">Product</p>
                <p className="text-sm text-text-dark font-bold">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<button onClick={() => {goLogOut()}}><b><font color="RED">LOGOUT</font></b></button></p>
            </div>
            <ComponentModifyModal></ComponentModifyModal>
            <div className="p-[1.875rem]">
                <div className="bg-white w-full h-[15.438rem] py-7 px-[1.875rem] mb-5 shadow-ix rounded flex justify-between">
                    <ul>
                        <li className="mb-2 pb-2 flex flex-col">
                            <span className="text-default text-sm mb-1 leading-none">Product</span>
                            <p className="text-text-dark text-xl font-extrabold leading-none">{productList["name"]}</p>
                        </li>
                        <li className="mb-2 flex flex-col">
                            <span className="text-default text-sm leading-none">Company</span>
                            <p className="text-text-default text-15 leading-6 h-6">{productList["companyName"]}</p>
                        </li>
                        <li className="mb-2 flex flex-col">
                            <span className="text-default text-sm leading-none">Product ID</span>
                            <p className="text-text-default text-15 leading-6 h-6">{productList["id"]}</p>
                        </li>
                        <li className="flex flex-col">
                            <span className="text-default text-sm leading-none">Last Update</span>
                            <p className="text-text-default text-15 leading-6 h-6">{productList["lastUpdate"]}</p>
                        </li>
                    </ul>
                    <div className="flex">
                        <div className="h-full px-10 min-w-[18.75rem] flex flex-col items-center justify-center border-l border-border-light">
                            <p className="text-primary font-bold text-xl leading-none mb-1">CO2eq</p>
                            <p className="text-text-dark text-[3.75rem] font-extrabold leading-none mb-1">{productList["co2eq"]}</p>
                            <p className="text-default text-xl">kg/ea</p>
                        </div>
                        <div className="h-full w-[18.75rem] flex flex-col items-center justify-center">
                            <img src={machine} alt="machine"/>
                        </div>
                    </div>
                </div>
                <div className="card h-[25rem] py-5 overflow-hidden mb-5">
                    {/* <PieChart/> */}
                    <ResponsiveLine 
                        data={lineChart}
                    />
                </div>
                <div className="card h-auto mb-5">
                    <div className="h-11 p-4 flex items-center justify-between">
                        <p className="text-base font-bold text-text-dark pl-[0.875rem]">Super Tier Request</p>
                        <div>
                        </div>
                    </div>
               </div>
                <div className="card h-auto mb-5">
                    <div className="p-4 flex items-center justify-between">
                        <p className="text-base font-bold text-text-dark pl-[0.875rem]">Product Component</p>
                        <div className='h-11 flex items-center justify-between'>
                            <button className='block' onClick={() => {
                                document.getElementById("componentAddModal").classList.remove("hidden");
                            }}>add component</button> 
                        </div>
                    </div>
                </div>
                <div className="flex gap-5">
                    <div className="w-[calc(50%_-_0.625rem)]">
                        <div className="card h-auto">
                            <div className="p-4 flex items-center justify-between">
                                <p className="text-base font-bold text-text-dark pl-[0.875rem]">Product Resource</p>
                                <div className='h-11 flex items-center justify-between'>
                                    <button className='block' onClick={() => {
                                        document.getElementById("resourceAddModal").classList.remove("hidden");
                                    }}>add resource</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="w-[calc(50%_-_0.625rem)]">
                        <div className="card h-auto">
                            <div className="p-4 flex items-center justify-between">
                                <p className="text-base font-bold text-text-dark pl-[0.875rem]">Manufacturing Process</p>
                                <div className='h-11 flex items-center justify-between'>
                                    <button className='block' onClick={() => {
                                        document.getElementById("processAddModal").classList.remove("hidden");
                                    }}>add process</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProductDetail;