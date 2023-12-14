import React, { useEffect, useLayoutEffect, useState, useRef } from 'react';

const Badge = (props, navigation) => {

    const {
        text,
        isBoolean = false,
        value,
        mode, 
        dest,
        navigateState
    } = props;

    const [color, setColor] = useState('');
    const [style, setStyle] = useState(mode);

    // console.log(navigateState)

    useEffect(() => {

        if(isBoolean) {
            if(value) {
                setStyle("primary");
            } else {
                setStyle("disabled");
            }
        } else {
            if(text === "ASSET") {
                setStyle("primary-outline");
            } else if (text === "AAS") {
                setStyle("primary");
            } else if (text === "SM") {
                setStyle("primary-20");
            } else if (text === "SMC") {
                setStyle("primary-50");
            } else if (text === "PROP") {
                setStyle("disabled");
            }
        }

        switch (style) {
            case "primary-outline": 
                setColor("bg-white border-primary border text-primary-dark");
                break;
            case "primary": 
                setColor("bg-primary text-white");
                break;
            case "primary-20": 
                setColor("bg-primary-20 text-primary");
                break;  
            case "primary-50": 
                setColor("bg-primary-50 text-white");
                break;
            case "disabled": 
                setColor("bg-disabled text-default");
                break;
            case "dark": 
                setColor("bg-text-default text-white");
                break;
            case "error": 
                setColor("bg-error text-white");
                break;
            default: 
                setColor("bg-disabled text-default");
        }
    },)

    const onClick = () => {
        if (value) {
            navigation.navigate(dest, {params : navigateState})
        }
    }

    return (
        <div name="button" onClick={onClick} className={`min-w-[3.5rem] h-[1.875rem] px-3 rounded-full inline-flex items-center justify-center ${color}`}>
            <span className="text-sm font-bold">{text}</span>
        </div>
    );
}

export default Badge;