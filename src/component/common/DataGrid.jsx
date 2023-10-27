import React, { useEffect, useState, useMemo, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import ReactDataGrid, { SelectColumn } from 'react-data-grid';
import 'react-data-grid/lib/styles.css';
import "../../content/styles/datagrid.css";
import PageSize from './PageSize';
import Pagination from './Pagination';


const globalOptions = {
    pageSizeArray: [
        { label: '10', value: 10 },
        { label: '20', value: 20 },
        { label: '30', value: 30 },
    ],
};

export default function DataGrid(props) {
    const navigate = useNavigate();

    const { header, rows, dataSource, totalCount, id, setCurrentPageNo = () => {}, setRowCount = () => {}} = props;

    // pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(globalOptions.pageSizeArray[0].value);

    return(
        <>
            <div className="w-full">
                <ReactDataGrid
                    columns={header}
                    rows={rows}
                    headerRowHeight={50}
                    rowHeight={50}
                    style={{ height: 'auto' }}
                    onCellClick={(args, event)=> {
                        if(args.row?.click && args.row.type == "home") {
                            navigate(args.row?.click, {
                                state: args.row?.state
                            })
                        };
                    }}
                />
                <div className="w-full flex items-center justify-between pl-5 pr-2 py-5">
                    <PageSize setPageSize={setPageSize} options={globalOptions.pageSizeArray} totalCount={totalCount}/>
                    <Pagination className="pagination-bar" currentPage={currentPage} totalCount={totalCount} pageSize={pageSize} onPageChange={(page) => [setCurrentPageNo(page), setCurrentPage(page)]} />
                </div>
            </div>
        </>
    )
}