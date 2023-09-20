import { useNavigate } from 'react-router-dom';
import Badge from "../component/common/atom/Badge";
import Textbox from "../component/common/atom/Textbox";
import DataGrid from "../component/common/DataGrid";
import SankeyChart from "../component/common/SankeyChart";
import machine from "../content/images/img-machine.jpg";

const Page201 = () => {
    const navigate = useNavigate();
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
        { no: 2, buyer: "알파에너지솔루션", buyer_ID: "ID#75AC872", last_request: "2023.08.15", TX_done: "NOT YET", send: true, click: "/Page400" },
        { no: 1, buyer: "미래베터리", buyer_ID: "ID#CK23541", last_request: "2023.07.12", TX_done: "DONE", send: false },
    ];

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
        { no: 4, component: "ETL-304", component_ID: "27374005", supplier: "카이케미컬", supplier_ID: "ID#30AB117", Qnty: "4 Liter", CO2EQ: "2.40", last_update: "2023.08.19", update: false},
        { no: 3, component: "INS-303", component_ID: "99851101", supplier: "제타화학", supplier_ID: "ID#11KF757", Qnty: "1 EA", CO2EQ: "1.40", last_update: "2023.08.20", update: false},
        { no: 2, component: "CDE-302", component_ID: "12341234", supplier: "델타프로", supplier_ID: "ID#QR372AFK", Qnty: "1 KG", CO2EQ: "0.30", last_update: "2023.08.24", update: false},
        { no: 1, component: "ADE-301", component_ID: "81124550", supplier: "델타프로", supplier_ID: "ID#QR372AFK", Qnty: "2 KG", CO2EQ: "1.50", last_update: "2023.08.21", update: false},
    ]

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
        { no: 2, resource: "Elec Power", Qnty: "1.2 KWh", CO2EQ: "0.22", last_update: "2023.08.19", update: false},
        { no: 1, resource: "Water", Qnty: "2.3 Liter", CO2EQ: "0.33", last_update: "2023.08.19", update: false},
    ]

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
        { no: 3, process: "Heating", process_ID: "PR#125633F", CO2EQ: "1.19", last_update: "2023.08.19", update: false},
        { no: 2, process: "Press", process_ID: "PR#905633K", CO2EQ: "2.93", last_update: "2023.08.19", update: false},
        { no: 1, process: "Charging", process_ID: "PR#885632L", CO2EQ: "5.31", last_update: "2023.08.19", update: false},
    ]

    const MPTotalCount = MPRows.length;


    return (
        <>
            <div className="card h-[3.75rem] px-5 flex items-center select-none cursor-pointer" onClick={() => navigate('/')}>
                <i className="icon-chevron_left w-[2.125rem] h-[2.125rem] text-2xl flex items-center justify-center text-default cursor-pointer select-none mr-2"></i>
                <p className="text-base font-bold">Product</p>
            </div>
            <div className="p-[1.875rem]">
                <div className="bg-white w-full h-[15.438rem] py-7 px-[1.875rem] mb-5 shadow-ix rounded flex justify-between">
                    <ul>
                        <li className="mb-2 pb-2 flex flex-col">
                            <span className="text-default text-sm mb-1 leading-none">Product</span>
                            <p className="text-text-dark text-xl font-extrabold leading-none">BP-201 Battery Pack</p>
                        </li>
                        <li className="mb-2 flex flex-col">
                            <span className="text-default text-sm leading-none">Company</span>
                            <p className="text-text-default text-15 leading-6 h-6"></p>
                        </li>
                        <li className="mb-2 flex flex-col">
                            <span className="text-default text-sm leading-none">Product ID</span>
                            <p className="text-text-default text-15 leading-6 h-6">23459090</p>
                        </li>
                        <li className="flex flex-col">
                            <span className="text-default text-sm leading-none">Last Update</span>
                            <p className="text-text-default text-15 leading-6 h-6">2022.12.31</p>
                        </li>
                    </ul>
                    <div className="flex">
                        <div className="h-full px-10 min-w-[18.75rem] flex flex-col items-center justify-center border-l border-border-light">
                            <p className="text-primary font-bold text-xl leading-none mb-1">CO2eq</p>
                            <p className="text-text-dark text-[3.75rem] font-extrabold leading-none mb-1">15.58</p>
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
                        <div>
                            <Textbox isSearchbox={true} placeholder="search"/>  
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
                            <DataGrid header={MPHeader} rows={MPRows} totalCount={MPTotalCount} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Page201;