import React, { useEffect, useRef, useState } from "react";
import Badge from "../component/common/atom/Badge";
import Textbox from "../component/common/atom/Textbox";
import DataGrid from "../component/common/DataGrid";
import PageTitle from "../component/common/PageTitle";
import BetaElectronics from "../content/images/logo-beta_electronics.svg"
import { useParams, useNavigate } from 'react-router-dom'

import axios from 'axios';

const Home = () => {
    const [productList, setProductList] = useState([]);
    const [companyList , setCompanyList] = useState([]);
    const [processList, setProcessList] = useState([]);

    const navigate = useNavigate();
    
    let {id} = useParams();
    console.log(id);
    useEffect(() => {
        console.log("accessToken:::::::::::::" + localStorage.getItem("accessToken"));
        if(localStorage.getItem("accessToken") === null){
            document.location.href = "/dxai/login";
            return ;
        }

        axios.post('/company/list', {
            id : id
        })
        .then((response) => {
            if(response.data["rsltCode"] === "F") setCompanyList([])
            else setCompanyList(response.data["rsltList"][0]);
        })
        .catch((error) => {
            console.log(error);
            setCompanyList([]);
        });

        axios.post("/product/list", { 
            companyId : id
            ,strPageNum : 0
            ,pageSize : 10
        })
        .then((response) => {
            if(response.data["rsltCode"] === "F") setProductList([])
            else setProductList(response.data["rsltList"]);
        })
        .catch((error) => {
            console.log(error);
            setProductList([]);
        });

        axios.post("/process/list", { 
            companyId : 7
            ,strPageNum : 0
            ,pageSize : 10
        })
        .then((response) => {
            if(response.data["rsltCode"] === "F") setProcessList([])
            else setProcessList(response.data["rsltList"]);
        })
        .catch((error) => {
            setProcessList([]);
        });
    }, []);


    const gridHeader = [
        { key: "no", name: "NO", width: 61, cellClass: "text-center", headerCellClass: "text-center" },
        { key: "product", name: "Product"},
        { key: "product_ID", name: "Product ID" },
        { key: "CO2EQ", name: "CO2EQ ", cellClass: "text-right", headerCellClass: "text-right"  },
        { key: "last_update", name: "Last update", cellClass: "text-center", headerCellClass: "text-center"  },
        { 
            key: "sub", name: "Update", cellClass: "text-center", headerCellClass: "text-center",
            renderCell({ row }) {
                return <Badge value={(row.updateYn === "1")} isBoolean={(row.updateYn === "1")}  text="Update" dest="/Page200" navigateState={row.state} />;
            },
        },
    ];

    const rows = [];

    for (var i=0; i<productList.length; i++) {
        rows.push(
            {
                no: i+1,
                product: productList[i]["name"],
                product_ID: productList[i]["id"],
                CO2EQ: productList[i]["co2eq"],
                last_update: productList[i]['lastUpdate']?.substring(0, 10).replaceAll('-', '.'),
                updateYn: productList[i]["updateYn"],
                state: {
                    id: productList[i]["id"],
                    name: productList[i]["name"],
                    company: companyList["name"],
                    CO2EQ: productList[i]["co2eq"],
                    lastUpdate: productList[i]['lastUpdate']
                },
                type: "home",
                click: "/Page200"
            }
        )};
    if (rows.length > 0) {
        rows[0]["click"] = "/Page200"
    }

    const totalCount = productList.length;

    const PCgridHeader = [
        { key: "no", name: "NO", width: 61, cellClass: "text-center", headerCellClass: "text-center" },
        { key: "process", name: "Process"},
        { key: "process_ID", name: "Process ID" },
        { key: "equipment", name: "Equipment"},
        { key: "CO2EQ", name: "CO2EQ ", cellClass: "text-right", headerCellClass: "text-right"  },
        { key: "last_update", name: "Last update", cellClass: "text-center", headerCellClass: "text-center"  },
        { 
            key: "edit", name: "", width: 100, cellClass: "text-left",
            renderCell({ row }) {
                return  <button className='block' onClick={() => navigate("/ProcessUpdate", {state : {id: row.process_ID, name : row.process, co2eq : row.CO2EQ}})}>edit</button>
            }
        }
    ];
    
    const PCRows = []
    for (var i=0; i < processList.length; i++) {
        PCRows.push(
            {
                no: i+1,
                process: processList[i]["name"],
                process_ID: processList[i]["id"],
                equipment: processList[i]["equipmentName"],
                CO2EQ: processList[i]["co2eq"],
                last_update: processList[i]['lastUpdate']?.substring(0, 10).replaceAll('-', '.'),
            }
        )
    }

    const PCcount = processList.length;


    
    return (
        <>
            <PageTitle />
            <div className="px-[1.875rem] pb-[1.875rem]">
                <div className="card h-[12.5rem] py-7 px-[1.875rem] mb-5 flex justify-between">
                    <ul>
                        <li className="mb-2 pb-2 flex flex-col">
                            <span className="text-default text-sm mb-1 leading-none">Company</span>
                            <p className="text-text-dark text-xl font-extrabold leading-none">{companyList["name"]}</p>
                        </li>
                        <li className="mb-2 flex flex-col">
                            <span className="text-default text-sm leading-none">Web Site</span>
                            <p className="text-text-default text-15 leading-6">{companyList["website"]}</p>
                        </li>
                        <li className="flex flex-col">
                            <span className="text-default text-sm leading-none">Tier ID</span>
                            <p className="text-text-default text-15 leading-6">ID#34EF56A</p>
                        </li>
                    </ul>
                    <div className="flex">
                        <div className="h-full w-[18.75rem] pl-[1.875rem] flex flex-col items-center justify-center border-l border-border-light">
                            <img src={BetaElectronics} alt="beta electronics" className="w-[12.5rem]" />
                        </div>
                    </div>
                </div>
                <div className="card h-auto">
                    <div className="p-4 flex items-center justify-between">
                        <p className="text-base font-bold text-text-dark pl-[0.875rem]">Product</p>
                        <div className='flex items-center justify-between'>
                            <button className='block' onClick={() => navigate("/ProductRegister")}>register product</button>
                        </div>
                    </div>
                    <DataGrid header={gridHeader} rows={rows} totalCount={totalCount} />
                </div>
                <br></br>
                <div className="card h-auto mb-5">
                    <div className="p-4 flex items-center justify-between">
                        <p className="text-base font-bold text-text-dark pl-[0.875rem]">Process</p>
                        <div className='flex items-center justify-between'>
                            <button className='block' onClick={() => navigate("/ProcessRegister")}>register process</button>
                        </div>
                    </div>
                    <DataGrid header={PCgridHeader} rows={PCRows} totalCount={PCcount} />
                </div>
            </div>
        </>
    );
};

export default Home;