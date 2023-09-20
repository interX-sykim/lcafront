import React, {useState} from "react";
import { useNavigate } from 'react-router-dom';
import Dropdown from "../common/atom/Dropdown";
import Tooltip from "../common/atom/Tooltip";

const Navigation = (props) => {
    const navigate = useNavigate();
    const {hide, setHide} = props;

    return (
        <>
            {/* <div className="h-14 w-full bg-white flex justify-between items-center px-[1.875rem] overflow-hidden text-default shadow-ix relative z-10">
                <Tooltip content={hide ? "open menu" : "close menu"} direction="bottom">
                    <div id="menuBtn" onClick={() => setHide(!hide)} className="cursor-pointer">
                        <i className={`${hide ? "icon-menu_open hover:text-primary" : "icon-menu hover:bg-hover"} text-2xl inline-block w-8 h-8 rounded-full transition duration-200`}></i>
                    </div>
                </Tooltip>
                <div className="flex gap-[1.125rem]">
                    <Dropdown type="bookmarks" title="북마크 모음" content={["CO2"]} onDropdownClick={() => navigate('/')} onClick={() => {}}>
                        <div className="cursor-pointer">
                            <Tooltip content="bookmarks" direction="bottom">
                                <i  className="icon-bookmarks text-2xl inline-block w-8 h-8 rounded-full hover:bg-hover transition duration-200"></i>
                            </Tooltip>
                        </div>
                    </Dropdown>
                    <Dropdown type="admin" content={["마이페이지", "비밀번호 변경", "로그아웃"]} onDropdownClick={() => {}}>
                        <div className="cursor-pointer">
                            <Tooltip content="admin" direction="bottom">
                                <i  className="icon-user_circle text-2xl inline-block w-8 h-8 rounded-full hover:bg-hover transition duration-200"></i>
                            </Tooltip>
                        </div>
                    </Dropdown>
                    <Dropdown type="apps" title="모든 솔루션 보기" content={["INTERX.DX"]} onDropdownClick={() => {}} onClick={() => {}}>
                        <div className="cursor-pointer">
                            <Tooltip content="apps" direction="bottom">
                                <i  className="icon-apps text-2xl inline-block w-8 h-8 rounded-full hover:bg-hover transition duration-200"></i>
                            </Tooltip>
                        </div>
                    </Dropdown>
                </div>
            </div> */}
        </>
    )
}

export default Navigation;