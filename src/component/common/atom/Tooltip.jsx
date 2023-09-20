import React, { useEffect, useState, useRef } from "react";
import ReactDOM from "react-dom";

const Tooltip = ({ content, children, extra, shortcut, indicator, direction }) => {
    
    const [isVisible, setVisible] = useState(false);
    // const tooltipElement = document.createElement("p");
    const root = document.getElementById("portal-root");
    const [position, setPosition] = useState({ top: 0, left: 0 });
    const targetRef = useRef(null);

    const handleEnter = (event) => {
        setVisible(true);
        const { top, left, width, height } = targetRef.current.getBoundingClientRect();
        //setPosition({ top: top + height, left: left + width / 2 });

        if (direction === "bottom") {
            setPosition({top: top + height + 16, left: left + width/2})
        } else if (direction === "top") {
            setPosition({top: top - 12, left: left + width/2 })
        } else if (direction === "left") {
            setPosition({top: top + height/2 , left: left - 16 })
        } else if (direction === "right") {
            setPosition({top: top + height/2 , left: left + width + 16})
        } else {
            setPosition({top: top + height + 4, left: left + width/2})
        }

    };

    const handleLeave = () => {
        setVisible(false);
    };
  
    return (
        <>
        {React.cloneElement(children, {
            ref: targetRef,
            onMouseEnter: handleEnter,
            onMouseLeave: handleLeave,

        })}
        {isVisible && ReactDOM.createPortal(
            <div style={{ top: position.top, left: position.left}}
            className={`font-pretendard px-[0.625rem] py-2 rounded-[0.375rem] bg-black text-white absolute z-10 transition duration-200 before:content-[""] before:absolute before:border-[transparent] before:border-8 before:border-solid ${direction === "top" ? "-translate-x-1/2 -translate-y-full before:border-t-black before:-bottom-4 before:left-1/2 before:-translate-x-1/2" : ""} ${direction === "bottom" ? "-translate-x-1/2 before:border-b-black before:-top-4 before:left-1/2 before:-translate-x-1/2" : ""} ${direction === "left" ? "-translate-y-1/2 -translate-x-full before:border-l-black before:top-1/2 before:-right-4 before:-translate-y-1/2" : ""} ${direction === "right" ? "-translate-y-1/2 before:border-r-black before:top-1/2 before:-left-4 before:-translate-y-1/2" : ""} ${!direction ? "-translate-x-1/2 before:border-[transparent]" : ""}`}
            >
                <div className="overflow-hidden w-full h-full">
                    <p className="text-sm">{content}</p>
                    
                    {/* extra text */}
                    {extra && <p className={`text-xs text-[#D1D5DB] mt-1`}>{extra}</p>}
                        
    
                    {/* shortcut hint */}
                    {shortcut &&
                        <div className="flex items-center gap-1 mt-2">
                            {shortcut.map((s, index) => 
                                <div key={index} className="h-4 min-w-[1.25rem] px-1 flex justify-center items-center rounded-sm bg-[#333333]">
                                    <span className={`text-white text-xs ${s.length === 1 && "font-bold"}`}>{s}</span>
                                </div>
                            )}
                        </div>
                    }
    
                    {/* indicator */}
                    {indicator &&
                        <ul className="mt-2">
                            {indicator.map((i, index) => 
                                <li key={index} className="flex items-center justify-start [&:not(:last-child)]:mb-1 ">
                                    <span className="inline-block w-2 h-2 mr-1 rounded-full bg-pink-400"></span>
                                    <p className="text-xs text-white">{i}</p>
                                </li>
                            )}
                        </ul>
                    }
                </div>
            </div>,
            root
        )}
        </>
    )
  };
  
  export default Tooltip;