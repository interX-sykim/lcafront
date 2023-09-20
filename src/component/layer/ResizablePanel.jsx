import React, { useState } from "react";
import { Outlet } from 'react-router-dom';
import "../../content/styles/icomoon.css";
import LeftSideBar from "./LeftSideBar";
import Navigation from "./Navigation";

const ResizablePanel = () => {
    const [hide, setHide] = useState(false);

    return (
        <div className="font-pretendard flex">
            {/* left menu */}
            <div className={`${!hide ? "w-[15.625rem]" : "w-0"} overflow-hidden transition-[width] duration-300`}>
                <LeftSideBar />
            </div>

            {/* right content*/}
            <div className={`right-content h-screen relative overflow-auto transition-[width] duration-300 ${!hide ? "w-[calc(100%_-_15.625rem)]" : "w-full"}`}>
                {/* header */}
                <div className={`xl:w-full h-screen min-h-full w-[1280px]`}>
                    <Navigation hide={hide} setHide={setHide}/>
                    <div className="bg-bg w-full min-h-[calc(100vh_-_3.5rem)]">
                        <Outlet />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ResizablePanel;