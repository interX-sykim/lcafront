import React, { useEffect, useState, useRef } from 'react';
import Dropdown from './Dropdown';

const Selectbox = (props) => {
    const {
        option = [
            {
                label: 'hello',
                value: 'hello',
                isCurValue: true,
            },
            {
                label: 'hello2',
                value: 'hello2',
                isCurValue: false,
            },
            {
                label: 'hdisjdakf dsajfkl sfafasd sdfas ewqr fdsa fd dsfa dsa',
                value: 'hdisjdakf dsajfkl sfafasd sdfas ewqr fdsa fd dsfa dsa',
                isCurValue: false,
            },
        ],
        isAlignLeft = true,
        isPagination = false,
        selected = () => {},
        label,
        isFullWidth = false,
    } = props;

    const [options, setOptions] = useState(option);
    const [value, setValue] = useState(options[0].label);
    const ref = useRef(null);

    const selectOption = (e, c) => {
        let findIndex = options.findIndex((option) => option.label === c.label);
        options.map((option, i) => {
            option.isCurValue = false;
        });
        options[findIndex].isCurValue = true;
        setOptions(options);
        setValue(options[findIndex].label);
        selected(options[findIndex].value);
    };

    return (
        <>
            <Dropdown content={options} onDropdownClick={selectOption} isAlignLeft={isAlignLeft} type={`selectbox ${isPagination ? 'pagination' : ''}`} isFullWidth={isFullWidth}>
                <div ref={ref} className={`${isPagination ? 'w-[4.125rem] pl-3 pr-1 h-10' : 'w-[8.75rem] pl-4 pr-2 h-11'} ${isFullWidth ? '!w-full' : ''} border-border-default border rounded bg-white flex items-center cursor-pointer select-none text-default transition duration-200 hover:border-border-dark`}>
                    <p className={`text-15 text-ellipsis overflow-hidden whitespace-nowrap !text-text-default ${isPagination ? 'w-[calc(100%_-_1rem)]' : 'w-[calc(100%_-_1.5rem)]'}`}>{value}</p>
                    <i className={`icon-arrow_down ${isPagination ? 'w-6 h-6 text-2xl' : 'w-6 h-6 text-2xl'}`}></i>
                </div>
            </Dropdown>
        </>
    );
};

export default Selectbox;
