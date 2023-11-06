import React, { useEffect, useState, useRef } from "react";
import ReactDOM from "react-dom";
import avatar from "../../../content/images/avatar-demo.jpg";


const Dropdown = ({ content, children, onDropdownClick = () => {}, onClick = () => {}, title, type, isAlignLeft = false, isFullWidth = false }) => {
    const targetRef = useRef(null);
    const dropdownRef = useRef();
    const [isVisible, setVisible] = useState(false);
    const [position, setPosition] = useState({});
    const [fullWidth, setFullWidth] = useState();

    const handleClick = () => {
        if (isVisible) {
            targetRef.current.classList.remove('text-primary');
            targetRef.current.classList.remove('!border-primary');
            if (type.includes('selectbox')) {
                targetRef.current.querySelector('p').classList.remove('!text-text-light');
                targetRef.current.children[1].classList.remove('rotate-180');
            }
        } else {
            targetRef.current.classList.add('text-primary');
            targetRef.current.classList.add('!border-primary');
            if (type.includes('selectbox')) {
                targetRef.current.querySelector('p').classList.add('!text-text-light');
                targetRef.current.children[1].classList.add('rotate-180');
            }
        }
        setVisible(!isVisible);
        const { top, left, width, height } = targetRef.current.getBoundingClientRect();

        if (isAlignLeft) {
            setPosition({ top: top + height + 8, left: left, transform: `unset` });
        } else {
            setPosition({ top: top + height + 8, left: left + width, transform: `translateX(-100%)` });
        }

        if (isFullWidth) {
            setFullWidth(width);
        }
        onClick();
    };

    const dropdownClick = (e, c) => {
        setVisible(false);
        targetRef.current.classList.remove('text-primary');

        if (type.includes('selectbox')) {
            targetRef.current.classList.remove('border-primary');
            targetRef.current.children[1].classList.remove('rotate-180');
            targetRef.current.querySelector('p').classList.remove('!text-text-light');

            if (c.label === e.currentTarget.innerText) {
                onDropdownClick(e, c);
            }
        } else {
            onDropdownClick(e);
        }
    };

    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (targetRef.current && !targetRef.current.contains(event.target)) {
                setVisible(false);
                targetRef.current.classList.remove('text-primary');
                targetRef.current.classList.remove('!border-primary');

                if (type.includes('selectbox')) {
                    targetRef.current.querySelector('p').classList.remove('!text-text-light');
                    targetRef.current.children[1].classList.remove('rotate-180');
                }
            }
        };
        document.addEventListener('click', handleOutsideClick);

        return () => {
            document.removeEventListener('click', handleOutsideClick);
        };
    }, []);

    useEffect(() => {
        document.querySelector('.right-content').addEventListener('scroll', () => setVisible(false));
        return () => {
            document.removeEventListener('click', () => setVisible(false));
        };
    })

    return (
        <div id='portal-root' style={{position:"relative", display:"inline-block"}}>
            {React.cloneElement(children, {
                ref: targetRef,
                onClick: handleClick,
            })}
            {isVisible &&
                ReactDOM.createPortal(
                    <div
                        style={{ top: position.top, left: position.left, transform: position.transform, width: isFullWidth ? fullWidth : null, maxWidth: isFullWidth ? fullWidth: null}}
                        className={`${type === 'apps' ? 'w-[20rem]' : ''} ${type.includes('pagination') ? 'w-[4.125rem]' : ''} ${
                            !type.includes('pagination') && !isFullWidth && type !== 'apps' ? 'w-fit min-w-[14.375rem] max-w-[20rem]' : ''
                        } font-pretendard bg-white shadow-ix-lg border border-border-default rounded overflow-hidden z-20`}
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* dropdown title */}
                        {title && type !== 'admin' && (
                            <div className="h-10 px-4 flex items-center">
                                <p className="text-default text-13">{title}</p>
                            </div>
                        )}

                        {/* admin title */}
                        { type === "admin" &&
                            <div className="h-14 bg-hover flex items-center px-4">
                                <div className="w-[2.375rem] h-[2.375rem] mr-[0.875rem]">
                                    <img src={avatar} alt="avatar" className="avatar w-full"/>
                                </div>
                                <div>
                                    <p className="text-sm text-text-light leading-none mb-1">Signed in as</p>
                                    <p className="text-sm text-text-default font-bold leading-none">james@site.com</p>
                                </div>
                            </div> 
                        }
                        


                        {/* list */}
                        {type !== 'apps' && (
                            <div className="pl-2 pt-2 pb-2 pr-1">
                                <ul className="max-h-[13.25rem] pr-1 overflow-auto dropdown-scrollbar">
                                    {content?.map((c, index) => (
                                        <li
                                            key={index}
                                            className={`h-9 px-2 flex items-center ${type.includes('pagination') ? 'justify-center' : 'justify-between'}  text-sm text-text-light rounded hover:text-text-default hover:bg-hover transition duration-200 cursor-pointer select-none ${c.isCurValue ? 'bg-white text-primary border border-primary' : ''}`}
                                            onClick={(e) => dropdownClick(e, c)}
                                        >
                                            {type.includes('selectbox') && <p className=" whitespace-nowrap text-ellipsis overflow-hidden">{c.label}</p>}

                                            {type === 'bookmarks' && (
                                                <>
                                                    {/* <p> {c.menu_mapping_caption}</p>
                                                    <i className={`icon-` + c.icon}> &gt; </i> */}
                                                    <p>{c}</p>
                                                    <i> &gt; </i>
                                                </>
                                            )}

                                            {type === 'admin' && (
                                                <>
                                                    {/* <p className="menuName">{c.label}</p> */}
                                                    <p>{c}</p>
                                                    <i> &gt; </i>
                                                </>
                                            )}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {type === 'apps' && (
                            <div className="px-6 pt-4 pb-8 flex items-center">
                                <ul className="flex flex-wrap gap-x-11 gap-y-8">
                                    {content?.map((c, index) => (
                                        <li key={index} className="flex flex-col items-center w-[3.75rem] cursor-pointer select-none relative pb-[1.625rem]" onClick={(e) => dropdownClick(e, c)}>
                                            <div className={`w-[3.75rem] h-[3.75rem] icon-dx`}></div>
                                            {/* {c.menu_mapping_caption && <p className="text-text-light text-sm text-ellipsis overflow-hidden max-w-[150%] absolute bottom-0 left-1/2 -translate-x-1/2"> {c.menu_mapping_caption}</p>} */}
                                            <p className="text-text-light text-sm text-ellipsis overflow-hidden max-w-[150%] absolute bottom-0 left-1/2 -translate-x-1/2"> {c}</p>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>,
                    targetRef.current.parentNode
                )}
        </div>
    );
};

export default Dropdown;
