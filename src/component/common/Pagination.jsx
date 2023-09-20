import React, { useState, useEffect } from 'react';
import { usePagination, DOTS } from '../customHooks/usePagination';
// import '../../contents/styles/pagination.css';

export default function Pagination(props) {
    const { onPageChange, totalCount, siblingCount = 1, currentPage, pageSize } = props;
    const paginationRange = usePagination({
        currentPage,
        totalCount,
        siblingCount,
        pageSize,
    });

    let lastPage = paginationRange[paginationRange.length - 1];

    // If there are less than 2 times in pagination range we shall not render the component
    // if (currentPage === 0 || paginationRange.length < 2) {
    //     return null;
    // }

    const onNext = () => {
        if (currentPage === lastPage) return;
        onPageChange(currentPage + 1);
    };
    const onPrevious = () => {
        if (currentPage === siblingCount) return;
        onPageChange(currentPage - 1);
    };

    return (
        <ul className={'pagination-container flex items-center'}>
            {/* Left navigation arrow */}
            <li className={`w-10 h-10 text-text-light flex justify-center items-center hover:bg-secondary rounded-md cursor-pointer select-none ${currentPage === siblingCount && 'disabled'}`} onClick={onPrevious}>
                <i className="inline-block w-5 h-5 icon-chevron_left text-xl"></i>
            </li>

            {paginationRange.map((pageNumber, idx) => {
                // If the pageItem is a DOT, render the DOTS unicode character
                if (pageNumber === DOTS) {
                    return (
                        <li key={idx} className="//pagination-item dots w-10 h-10 flex items-end justify-center text-text-light p-2">
                            &#8230;
                        </li>
                    );
                }

                // Render our Page Pills
                return (
                    <li
                        key={idx}
                        className={`//pagination-item min-w-[2.5rem] h-10 px-2 ml-[1px] text-text-light rounded-md flex items-center justify-center text-base cursor-pointer select-none transition duration:200 ${pageNumber === currentPage && 'bg-primary text-white hover:!bg-primary-dark'} hover:bg-secondary`}
                        onClick={() => onPageChange(pageNumber)}
                    >
                        {pageNumber}
                    </li>
                );
            })}
            {/*  Right Navigation arrow */}
            <li className={`w-10 h-10 text-text-light flex justify-center ml-[1px] items-center hover:bg-secondary rounded-md cursor-pointer select-none ${currentPage === lastPage && 'disabled'}`} onClick={onNext}>
                <i className="inline-block w-5 h-5 icon-chevron_right text-xl"></i>
            </li>
        </ul>
    );
}
