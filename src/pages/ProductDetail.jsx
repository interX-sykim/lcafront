import PieChart from "../component/common/PieChart";
import { useNavigate } from 'react-router-dom'

import { ResponsiveLine } from '@nivo/line';

import ComponentModifyModal from '../component/modals/ComponentModifyModal';

import {useParams} from "react-router"
import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios'
import Flow from "../processFlow/ProcessFlow";

const ProductDetail = () => {
    const [elecPowerLogList, setElecPowerLogList] = useState([]);
    const [renderCnt, setRenderCnt] = useState(0);
    const [product , setProduct] = useState([]);
    const [imgUrl, setImgUrl] = useState("");
    const [company, setCompany] = useState([])
    const [processList, setProcessList] = useState([])

    const { productId } = useParams();
    const scrollRef = useRef();

    const navigate = useNavigate();

    useEffect(() => {

        axios.get('/product/' + productId)
        .then((res) => {
            setProduct(res.data)
            setImgUrl("/aasx_images/" + res.data.name + ".png")

        })
        .catch((err) => {
            console.log(err)
        })

        axios.post("/resource/list", {
            id: productId
        })
        .then((res) => {
            setElecPowerLogList(res.data)
        })
        .catch((error) => {
            setElecPowerLogList([])
            console.log(error)
        })

        axios.get("/process")
        .then((response) => {
          setProcessList(response.data);
          renderCnt += 1
        })
        .catch((error) => {
          console.log(error);
        })

    }, []);

    const data = []
    for (var i=0; i < elecPowerLogList.length; i++) {
        data.push({x:elecPowerLogList[i]["timestamp"], y:elecPowerLogList[i]["quantity"]})
    }
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
            <div className="card h-[3.75rem] px-5 flex items-center cursor-pointer select-none" onClick={() => navigate('/Home')}>
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
                            <p className="text-text-dark text-xl font-extrabold leading-none">{product["name"]}</p>
                        </li>
                        <li className="mb-2 flex flex-col">
                            <span className="text-default text-sm leading-none">Company</span>
                            <p className="text-text-default text-15 leading-6 h-6">{company.name}</p>
                        </li>
                        <li className="mb-2 flex flex-col">
                            <span className="text-default text-sm leading-none">Product ID</span>
                            <p className="text-text-default text-15 leading-6 h-6">{product["id"]}</p>
                        </li>
                        <li className="flex flex-col">
                            <span className="text-default text-sm leading-none">Last Update</span>
                            <p className="text-text-default text-15 leading-6 h-6">{product["lastUpdate"]}</p>
                        </li>
                    </ul>
                    <div className="flex">
                        <div className="h-full px-10 min-w-[18.75rem] flex flex-col items-center justify-center border-l border-border-light">
                            <p className="text-primary font-bold text-xl leading-none mb-1">CO2eq</p>
                            <p className="text-text-dark text-[3.75rem] font-extrabold leading-none mb-1">{product["co2eq"]}</p>
                            <p className="text-default text-xl">kg/ea</p>
                        </div>
                        <div className="h-full w-[18.75rem] flex flex-col items-center justify-center">
                            <img src={imgUrl}  width="500px" height="600px"/>
                        </div>
                    </div>
                </div>
                <div className="card h-[25rem] py-5 overflow-hidden mb-5">
                    <p className="text-base font-bold text-text-dark pl-[0.875rem]">Electricity Resource Usage</p>
                    {/* <PieChart/> */}
                    <ResponsiveLine 
                        data={lineChart}
                        margin={{ top: 50, right: 50, bottom: 50, left: 110 }}

                        pointSize={10}
                        pointColor="black"
                        pointBorderWidth={2}
                        pointBorderColor={{ from: 'serieColor' }}
                        pointLabelYOffset={-12}
                        enableArea={true}
                        areaOpacity={0.65}
                        useMesh={true}
                        axisBottom={false}

                    />
                </div>
                <div className="card h-[25rem] py-5 overflow-hidden mb-5" style={{height:"800px"}}>
                    <p className="text-base font-bold text-text-dark pl-[0.875rem]" style={{marginBottom:'20px'}}>Process Flow</p>
                    <div style={{padding:"30px"}}>
                        <Flow processList={processList}/>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProductDetail;