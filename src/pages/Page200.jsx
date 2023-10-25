import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import Badge from "../component/common/atom/Badge";
import Textbox from "../component/common/atom/Textbox";
import DataGrid from "../component/common/DataGrid";
import SankeyChart from "../component/common/SankeyChart";
import machine from "../content/images/img-machine.jpg";

import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios'

import { useTable } from "react-table";

const Page200 = ({route}) => {
    const state = useLocation().state
    const [superTierList, setSuperTierList] = useState([]);
    const [componentList, setComponentList] = useState([]);
    const [resourceList, setResourceList] = useState([]);
    const [processList, setProcessList] = useState([]);
    const [componentCadidateList, setComponentCandidateList] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        if (state != null) {
            axios.post('/product/component/List', {
                id : state.id
                ,strPageNum : 0
                ,pageSize : 10
            })
            .then((response) => {
                setComponentList(response.data["rsltList"]);
            })
            .catch((error) => {
                console.log(error);
                setComponentList([]);
            });
    
            axios.post("/resource/ListByProduct", { 
                id : state.id
            })
            .then((response) => {
                setResourceList(response.data["rsltList"]);
            })
            .catch((error) => {
                console.log(error);
                setResourceList([]);
            });
    
            axios.post("/process/ListByProduct", { 
                id : state.id
            })
            .then((response) => {
                setProcessList(response.data["rsltList"]);
            })
            .catch((error) => {
                console.log(error);
                setProcessList([]);
            });

            axios.post("/company/superTierList", { 
                id : state.id
            })
            .then((response) => {
                setSuperTierList(response.data["rsltList"]);
            })
            .catch((error) => {
                console.log(error);
                setSuperTierList([]);
            });

            axios.post("/product/component/candid/list", { 
                id : state.id
            })
            .then((response) => {
                setComponentCandidateList(response.data["rsltList"]);
            })
            .catch((error) => {
                console.log(error);
                setComponentCandidateList([]);
            });
        }
    }, []);

    const STRHeader = [
        { key: "no", name: "NO", width: 61, cellClass: "text-center", headerCellClass: "text-center" },
        { key: "buyer", name: "Buyer"},
        { key: "buyer_ID", name: "Buyer ID" },
        { key: "last_request", name: "Last request", cellClass: "text-center", headerCellClass: "text-center"  },
        { key: "TX_done", name: "TX done", cellClass: "text-center", headerCellClass: "text-center"  },
        { 
            key: "send", name: "Send", cellClass: "text-center", headerCellClass: "text-center",
            renderCell({ row }) {
                return <Badge value={row.send} isBoolean={true} text="Send" />;
            },
        },
    ];

    const STRRows = [
        // { no: 2, buyer: "알파에너지솔루션", buyer_ID: "ID#75AC872", last_request: "2023.08.15", TX_done: "NOT YET", send: false },
        // { no: 1, buyer: "미래베터리", buyer_ID: "ID#CK23541", last_request: "2023.07.12", TX_done: "DONE", send: false },
    ];

    for (var i=0; i<superTierList.length; i++) {
        STRRows.push(
            {
                no: i+1,
                buyer: superTierList[i].name,
                buyer_ID: "ID#75AC872",
                last_request: "2023-10-18",
                TX_done: "DONE", 
                send: false
            }
    )};

    if (STRRows.length > 0) {
        STRRows[0].TX_done = "NOT YET";
    }

    const STRTotalCount = STRRows.length;

    const PCHeader = [
        { key: "no", name: "NO", width: 61, cellClass: "text-center", headerCellClass: "text-center" },
        { key: "component", name: "Component" },
        { key: "component_ID", name: "Component ID" },
        { key: "supplier", name: "Supplier" },
        { key: "supplier_ID", name: "Supplier ID" },
        { key: "Qnty", name: "Qnty[unit/prd]", cellClass: "text-right", headerCellClass: "text-right" },
        { key: "CO2EQ", name: "CO2EQ[kg/prd]", cellClass: "text-right", headerCellClass: "text-right" },
        { key: "last_update", name: "Last update", cellClass: "text-center", headerCellClass: "text-center"  },
        { 
            key: "update", name: "Update", cellClass: "text-center", headerCellClass: "text-center",
            renderCell({ row }) {
                return <Badge value={row.update} isBoolean={true} text="Update" />;
            },
        },
    ]

    const PCRows = [
        // { no: 4, component: "ETL-304", component_ID: "27374005", supplier: "카이케미컬", supplier_ID: "ID#30AB117", Qnty: "4 Liter", CO2EQ: "2.40", last_update: "2023.08.19", update: false},
        // { no: 3, component: "INS-303", component_ID: "99851101", supplier: "제타화학", supplier_ID: "ID#11KF757", Qnty: "1 EA", CO2EQ: "1.40", last_update: "2023.08.20", update: false},
        // { no: 2, component: "CDE-302", component_ID: "12341234", supplier: "델타프로", supplier_ID: "ID#QR372AFK", Qnty: "1 KG", CO2EQ: "0.70", last_update: "NOT YET", update: true, click: "/Page300"},
        // { no: 1, component: "ADE-301", component_ID: "81124550", supplier: "델타프로", supplier_ID: "ID#QR372AFK", Qnty: "2 KG", CO2EQ: "1.50", last_update: "2023.08.21", update: false},
    ]

    for (var i=0; i < componentList.length; i++) {
        PCRows.push(
            {
                no: i+1,
                component: componentList[i].name,
                component_ID: componentList[i].id,
                supplier: componentList[i].supplierName,
                supplier_ID: "ID#30AB117",
                Qnty: componentList[i].qnty + " " + componentList[i].unit,
                CO2EQ: componentList[i].co2eq,
                last_update: componentList[i].lastUpdate?.substring(0, 10).replaceAll('-', '.') || "",
                update: false
            }
        )
    }

    if (PCRows.length > 1) {
        PCRows[1].last_update = "NOT YET"
        PCRows[1].update = true
        PCRows[1].click = "/Page300"
    }

    const PCTotalCount = PCRows.length;

    const PRHeader = [
        { key: "no", name: "NO", width: 61, cellClass: "text-center", headerCellClass: "text-center" },
        { key: "resource", name: "Resource" },
        { key: "Qnty", name: "Qnty[unit/prd]", cellClass: "text-right", headerCellClass: "text-right" },
        { key: "CO2EQ", name: "CO2EQ[kg/prd]", cellClass: "text-right", headerCellClass: "text-right" },
        { key: "last_update", name: "Last update", cellClass: "text-center", headerCellClass: "text-center"  },
        { 
            key: "update", name: "Update", cellClass: "text-center", headerCellClass: "text-center",
            renderCell({ row }) {
                return <Badge value={row.update} isBoolean={true} text="Update" />;
            },
        },
    ]

    const PRRows = [
        // { no: 2, resource: "Elec Power", Qnty: "1.2 KWh", CO2EQ: "0.22", last_update: "2023.08.19", update: false},
        // { no: 1, resource: "Water", Qnty: "2.3 Liter", CO2EQ: "0.33", last_update: "2023.08.19", update: false},
    ]

    for (var i=0; i < resourceList.length; i++) {
        PRRows.push(
            {
                no: i+1,
                resource: resourceList[i].name,
                Qnty: resourceList[i].qnty + " " + resourceList[i].unit,
                CO2EQ: resourceList[i].co2eq,
                last_update: resourceList[i].lastUpdate.substring(0, 10).replaceAll("-", ".") || "",
                update: false
            }
        )
    }

    const PRTotalCount = PRRows.length;

    const MPHeader = [
        { key: "no", name: "NO", width: 61, cellClass: "text-center", headerCellClass: "text-center" },
        { key: "process", name: "Process" },
        { key: "process_ID", name: "Process ID" },
        { key: "CO2EQ", name: "CO2EQ[kg/prd]", cellClass: "text-right", headerCellClass: "text-right" },
        { key: "last_update", name: "Last update", cellClass: "text-center", headerCellClass: "text-center"  },
        { 
            key: "update", name: "Update", cellClass: "text-center", headerCellClass: "text-center",
            renderCell({ row }) {
                return <Badge value={row.update} isBoolean={true} text="Update" />;
            },
        },
    ]

    const MPRows = [
        // { no: 3, process: "Heating", process_ID: "PR#125633F", CO2EQ: "1.19", last_update: "2023.08.19", update: false},
        // { no: 2, process: "Press", process_ID: "PR#905633K", CO2EQ: "2.93", last_update: "2023.08.19", update: false},
        // { no: 1, process: "Charging", process_ID: "PR#885632L", CO2EQ: "5.31", last_update: "2023.08.19", update: false},
    ]

    for (var i=0; i < processList?.length; i++) {
        MPRows.push(
            {
                no: i+1,
                process: processList[i].name,
                process_ID: "PR#125633F",
                CO2EQ: processList[i].co2eq,
                last_update: processList[i].lastUpdate.substring(0, 10).replaceAll("-", ".") || "",
                update: false
            }
        )
    }

    const MPTotalCount = MPRows.length;

    const CCRows = []

    for (var i=0; i < componentCadidateList?.length; i++) {
        CCRows.push(
            {
                no: i+1,
                component: componentCadidateList[i].name,
                component_ID: componentCadidateList[i].id,
                supplier: componentCadidateList[i].supplierName,
                supplier_ID: "ID#30AB117",
                Qnty: componentCadidateList[i].qnty + " " + componentCadidateList[i].unit,
                CO2EQ: componentCadidateList[i].co2eq,
                last_update: componentCadidateList[i].lastUpdate?.substring(0, 10).replaceAll('-', '.') || "",
                update: false
            }
        )
    }


    // component 추가 팝업 modal start

    const [modalOpen, setmodalOpen] = useState(false);
    const [checkedIdList, setCheckedIdList] = useState([]);
    const [checkedQntyList, setCheckedQntyList] = useState([]);
    const modalToggleClose = () => setmodalOpen(false);
    const modalToggleOpen = () => {
        setCheckedIdList(new Array(CCRows.length).fill(0))
        setCheckedQntyList(new Array(CCRows.length).fill(0))
        setmodalOpen(true)
    };
    const toggleListelement = (index, component_ID, qnty) => {
        if (checkedIdList[index] == 0) {
            checkedIdList[index] = component_ID;
        } else {
            checkedIdList[index] = 0;
        }
    }
    const printList = () =>{
        for (let i = 0; i < CCRows.length; i++) {
            checkedQntyList[i] = document.getElementsByName("qnty_input")[i].value
        }
        for (let i = 0; i < CCRows.length; i++) {
            if (checkedIdList[i] !== 0 && checkedQntyList[i] !== 0) {
                axios.post('/product/component/insert', {
                    productId : 3,
                    componentId : checkedIdList[i] ,
                    qnty : checkedQntyList[i] ,
                    unit : "EA"
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
            } else {
                
            }
        }
    }

    function componentModal() {
        if (modalOpen) {
            return (
                <div class="modal z-50 fixed w-full h-full top-0 left-0 flex items-center justify-center p-8 lg:p-0">
                    <div class="modal-overlay fixed w-full h-full bg-gray-900 opacity-50" onClick={modalToggleClose}></div>
                    <div class="bg-white w-full lg:h-max lg:w-1/2  mx-auto rounded-lg shadow-xl z-50 overflow-y-auto">
                    <div class="flex justify-between items-center head bg-gray-100 py-5 px-8 text-2xl font-extrabold">
                    <p className="text-base font-bold text-text-dark">Select Components to add</p>
                    </div>
                    <div class="content p-8">
                        <slot name="body" />
                        <div class="flex flex-col">
                    <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div class="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                            <div class="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
                        <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                            <thead>
                                <th scope="col" class="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap text-left">
                                    <div class="inline-flex items-center gap-x-3">
                                        <input type="checkbox" class="text-blue-500 border-gray-300 rounded dark:bg-gray-900 dark:ring-offset-gray-900 dark:border-gray-700"/>
                                        <span>No.</span>
                                    </div>
                                </th>
                                <th scope="col" class="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">Product Id</th>
                                <th scope="col" class="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">Product Name</th>
                                <th scope="col" class="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">CO2EQ</th>

                                <th scope="col" class="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">Company</th>
                                <th scope="col" class="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">qnty</th>
                                <th scope="col" class="relative py-3.5 px-4">
                                    <span class="sr-only">Edit</span>
                                </th>
                            </thead>
                            <tbody>
                                {componentTableRow}
                            </tbody>
                        </table>
                        </div>
                        </div>
                        </div>
                        </div>
                        <div style={{float:"right"}} className="p-4 flex items-center justify-between">
                            <button onClick={printList}>Add</button>
                        </div>
                    </div>
                    </div>
                </div>
            )
        }
        return null;
    }

    const modalOpenButton = (type) => {
        return (
            <button className='block' onClick={modalToggleOpen}>add {type}</button>
        )
    }

    const componentTableRow = CCRows.map((row, index) => {
        return (
            <tr key={index}>
                <td class="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                    <div class="inline-flex items-center gap-x-3">
                        <input type="checkbox" class="text-blue-500 border-gray-300 rounded dark:bg-gray-900 dark:ring-offset-gray-900 dark:border-gray-700" onChange={() => {toggleListelement(index, row.component_ID)}}/>
                        <div class="flex items-center gap-x-2">
                            <div>
                                <p class="text-sm font-normal text-gray-600 dark:text-gray-400">&nbsp;{index+1}</p>
                            </div>
                        </div>
                    </div>
                </td>
                <td class="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">ID#75AC872</td>
                <td class="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">{row.component}</td>
                <td class="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">{row.CO2EQ}</td>
                <td class="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">{row.supplier}</td>
                <td class="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap"><input name='qnty_input' type='number' style={{ width:"58px" }} min={0}></input></td>
            </tr>
        )
    })

    
    // component 추가 팝업 modal end



    return (
        <>
            <div className="card h-[3.75rem] px-5 flex items-center cursor-pointer select-none" onClick={() => navigate('/')}>
                <i className="icon-chevron_left w-[2.125rem] h-[2.125rem] text-2xl flex items-center justify-center text-default cursor-pointer select-none mr-2"></i>
                <p className="text-base font-bold">Product</p>
            </div>
            {componentModal()}
            <div className="p-[1.875rem]">
                <div className="bg-white w-full h-[15.438rem] py-7 px-[1.875rem] mb-5 shadow-ix rounded flex justify-between">
                    <ul>
                        <li className="mb-2 pb-2 flex flex-col">
                            <span className="text-default text-sm mb-1 leading-none">Product</span>
                            <p className="text-text-dark text-xl font-extrabold leading-none">{state? state.name : ""}</p>
                        </li>
                        <li className="mb-2 flex flex-col">
                            <span className="text-default text-sm leading-none">Company</span>
                            <p className="text-text-default text-15 leading-6 h-6">{state? state.company : ""}</p>
                        </li>
                        <li className="mb-2 flex flex-col">
                            <span className="text-default text-sm leading-none">Product ID</span>
                            <p className="text-text-default text-15 leading-6 h-6">23459090</p>
                        </li>
                        <li className="flex flex-col">
                            <span className="text-default text-sm leading-none">Last Update</span>
                            <p className="text-text-default text-15 leading-6 h-6">{state? state.lastUpdate : ""}</p>
                        </li>
                    </ul>
                    <div className="flex">
                        <div className="h-full px-10 min-w-[18.75rem] flex flex-col items-center justify-center border-l border-border-light">
                            <p className="text-primary font-bold text-xl leading-none mb-1">CO2eq</p>
                            <p className="text-text-dark text-[3.75rem] font-extrabold leading-none mb-1">{state? state.CO2EQ : ""}</p>
                            <p className="text-default text-xl">kg/ea</p>
                        </div>
                        <div className="h-full w-[18.75rem] flex flex-col items-center justify-center">
                            <img src={machine} alt="machine"/>
                        </div>
                    </div>
                </div>
                <div className="card h-[25rem] py-5 overflow-hidden mb-5">
                    <SankeyChart />
                </div>
                <div className="card h-auto mb-5">
                    <div className="p-4 flex items-center justify-between">
                        <p className="text-base font-bold text-text-dark pl-[0.875rem]">Super Tier Request</p>
                        <div>
                            <Textbox isSearchbox={true} placeholder="search"/>  
                        </div>
                    </div>
                    <DataGrid header={STRHeader} rows={STRRows} totalCount={STRTotalCount} />
                </div>
                <div className="card h-auto mb-5">
                    <div className="p-4 flex items-center justify-between">
                        <p className="text-base font-bold text-text-dark pl-[0.875rem]">Product Component</p>
                        <div className='flex items-center justify-between'>
                            {modalOpenButton("component")}
                            <Textbox isSearchbox={true} placeholder="search" />  
                        </div>
                    </div>
                    <DataGrid header={PCHeader} rows={PCRows} totalCount={PCTotalCount} />
                </div>
                <div className="flex gap-5">
                    <div className="w-[calc(50%_-_0.625rem)]">
                        <div className="card h-auto">
                            <div className="p-4 flex items-center justify-between">
                                <p className="text-base font-bold text-text-dark pl-[0.875rem]">Product Resource</p>
                                <div>
                                    <Textbox isSearchbox={true} placeholder="search"/>
                                </div>
                            </div>
                            <DataGrid header={PRHeader} rows={PRRows} totalCount={PRTotalCount} />
                        </div>
                    </div>
                    <div className="w-[calc(50%_-_0.625rem)]">
                        <div className="card h-auto">
                            <div className="p-4 flex items-center justify-between">
                                <p className="text-base font-bold text-text-dark pl-[0.875rem]">Manufacturing Process</p>
                                <div>
                                    <Textbox isSearchbox={true} placeholder="search"/>
                                </div>
                            </div>
                            <DataGrid header={MPHeader} rows={MPRows} totalCount={MPTotalCount} addElement={true}/>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Page200;