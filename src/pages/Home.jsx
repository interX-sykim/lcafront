import React, { useEffect, useRef, useState } from "react";
import Badge from "../component/common/atom/Badge";
import Textbox from "../component/common/atom/Textbox";
import DataGrid from "../component/common/DataGrid";
import PageTitle from "../component/common/PageTitle";
import BetaElectronics from "../content/images/logo-beta_electronics.svg"

import axios from 'axios';

const Home = () => {
    const [productList, setProductList] = useState([]);
    const [companyName, setCompanyName] = useState([]);
    const [companyWebsite, setCompanyWebsite] = useState([]);
    const [companyList , setCompanyList] = useState([]);
    
    useEffect(() => {
        axios.post('/company/list', {
            id : 3
        })
        .then((response) => {
            //console.log(response);
            setCompanyList(response.data["rsltList"][0]);
            //setProductList(response.data["productList"]);
            //setCompanyName(response.data["companyName"]);
            //setCompanyWebsite(response.data["companyWebsite"]);
        })
        .catch((error) => {
            console.log(error);
            setProductList([]);
        });

        axios.post("/product/list", { 
            companyId : 3
            ,strPageNum : 0
            ,pageSize : 10
        })
        .then((response) => {
            console.log(response);
            setProductList(response.data["rsltList"]);
        })
        .catch((error) => {
            console.log(error);
            setProductList([]);
        });
    }, []);


    const gridHeader = [
        { key: "no", name: "NO", width: 61, cellClass: "text-center", headerCellClass: "text-center" },
        { key: "product", name: "Product"},
        { key: "product_ID", name: "Product ID" },
        { key: "CO2EQ", name: "CO2EQ ", cellClass: "text-right", headerCellClass: "text-right"  },
        { key: "last_update", name: "Last update", cellClass: "text-center", headerCellClass: "text-center"  },
        { 
            key: "super", name: "Update request from SUPER", cellClass: "text-center", headerCellClass: "text-center",
            renderCell({ row }) {
                console.log(row);
                return <Badge text={row.super} mode={`${row.super === "YES" ? "primary" : ""}${row.super === "NO" ? "error": ""}${row.super === "DONE" ? "disabled": ""}`} />;
            },
        },
        { 
            key: "sub", name: "Update request to SUB", cellClass: "text-center", headerCellClass: "text-center",
            renderCell({ row }) {
                return <Badge text={row.sub} mode={`${row.sub === "YES" ? "primary" : ""}${row.sub === "NO" ? "error" : ""}${row.sub === "DONE" ? "disabled" : ""}`} />;
            },
        },
    ];

    const rows = [
        // { no: 3, product: "BP-201", product_ID: "23459090", CO2EQ: "3.45", last_update: "2022.12.31", super: "YES", sub: "NO", click: "/Page200" },
        // { no: 2, product: "BP-701", product_ID: "23458872", CO2EQ: "2.71", last_update: "2022.03.05", super: "DONE", sub: "DONE", click: false },
        // { no: 1, product: "BP-772", product_ID: "23459081", CO2EQ: "5.12", last_update: "2022.07.31", super: "DONE", sub: "DONE", click: false },
    ];

    for (var i=0; i<productList.length; i++) {
        rows.push(
            {
                no: i+1,
                product: productList[i]["name"],
                product_ID: productList[i]["id"],
                CO2EQ: productList[i]["co2eq"],
                last_update: productList[i]['lastUpdate'].substring(0, 10).replaceAll('-', '.'),
                super: productList[i]["superCompanyUpdateRequest"],
                sub: productList[i]["subCompanyUpdateRequest"],
                params: {
                    name: productList[i]["name"],
                    company: companyList["name"],
                    CO2EQ: productList[i]["co2eq"],
                    lastUpdate: productList[i]['lastUpdate'].substring(0, 10).replaceAll('-', '.')
                },
                click: "/Page200"
            }
        )};
    if (rows.length > 0) {
        rows[0]["click"] = "/Page200"
    }

    const totalCount = productList.length;

    
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
                        <div>
                            <Textbox isSearchbox={true} placeholder="search"/> 
                        </div>
                    </div>
                    <DataGrid header={gridHeader} rows={rows} totalCount={totalCount} />
                </div>
            </div>
        </>
    );
};

export default Home;