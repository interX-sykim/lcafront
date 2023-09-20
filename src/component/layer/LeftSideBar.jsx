import React, {useState} from "react";
import { useNavigate } from 'react-router-dom';
import logo from "../../content/images/logo-dx.svg";

const LeftSideBar = () => {
    const navigate = useNavigate();
    const [openedMenu, setOpenedMenu] = useState('');

    //toggle level3 menus event
    const secondLevelMenuClick = (e, menu) => {
        let length = e.currentTarget.nextSibling.children[0].childNodes.length;
        let level3 = document.querySelectorAll('.level3-wrapper');

        if (openedMenu === menu) {
            setOpenedMenu();
            e.currentTarget.nextSibling.removeAttribute('style');
        } else {
            setOpenedMenu(menu);
            level3.forEach((lv, index) => {
                lv.removeAttribute('style');
            });
            e.currentTarget.nextSibling.style.height = length * 38 + 'px';
        }
    };


    return (
        <div className="bg-[#0F172A] w-[15.625rem] h-screen z-10 text-[#667085]">
            {/* logo */}
            <div className="h-14 w-full flex items-center justify-center cursor-pointer">
                <img src={logo} alt="dx" className="h-6"/>
            </div>

            {/* menu */}
            <div className="h-[calc(100%_-_3.5rem)] overflow-y-auto no-scrollbar">
                {/* level1 */}
                <ul className="py-10 px-2 text-15">
                    <li className="[&:not(:last-child)]:mb-10">
                        <div className="px-5">
                            <p className="text-primary text-xs mb-2">LCA</p>
                        </div>
                        {/* level2 */}
                        <ul>
                            <li className={`group [&:not(:last-child)]:mb-1`}>
                                <div onClick={(e) => secondLevelMenuClick(e, "LCA")} className={`pl-5 pr-3 h-9 my-1 flex items-center rounded cursor-pointer text-white hover:bg-[#2C3344] group-hover:text-white group-[&:not(:last-child)]:mb-1 transition duration-300`}>
                                    <i className={`icon-atom w-6 h-6 text-2xl`} ></i>
                                    <div className="flex-1 ml-3 flex items-center justify-between">
                                        <p>LCA</p>
                                        <i className={`icon-arrow_down text-2xl ${openedMenu === "LCA" ? 'rotate-180' : ''}`}></i>
                                    </div>
                                </div>
                                {/* level3 */}
                                <div className={`level3-wrapper overflow-hidden transition-all duration-300 ${openedMenu !== "LCA" ? 'h-0' : ''}`}>
                                    <ul>
                                        <li
                                            onClick={() => navigate('/')}
                                            className={`group/3dep h-8 my-[0.188rem] px-[1.375rem] rounded flex items-center cursor-pointer [&:not(:last-child)]:mb-[0.125rem] text-white bg-[#2C3344] hover:bg-[#2C3344] hover:text-white transition duration-300`}
                                        >
                                            <div
                                                className={`level3-name pl-[1.375rem] relative before:content-[''] before:absolute before:top-1/2 before:left-2 before:-translate-y-1/2 before:w-1 before:h-1 before:rounded-full before:bg-white before:bg-[#667085] group-hover/3dep:before:bg-white before:transition before:duration-300`}
                                            >
                                                <p>CO2</p>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default LeftSideBar;