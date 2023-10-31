import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios'; 

export default function ComponentModifyModal() {

    const modalClose = () => {
        document.getElementById("componentModifyModal").classList.add("hidden");
    }

    const editComponent = () => {
        // const componentCheckbox = document.getElementsByName("componentCheckbox")
        // const comopnentQntyInput = document.getElementsByName("qnty_input")

        // for (let i=0; i<rows.length; i++) {
        //     if (componentCheckbox[i].checked) {
        //         newComponentIdList.push(rows[i].component_ID)
        //         newComponentQntyList.push(comopnentQntyInput[i].value)
        //     } 
        // }
        // console.log("new component ID list : ")
        // console.log(newComponentIdList)
        // console.log("new component qnty list :")
        // console.log(newComponentQntyList)

        // for (let i = 0; i<newComponentIdList.length; i++) {
        //     axios.post("/product/component/insert", {
        //         productId : productId,
        //         componentId : newComponentIdList[i],
        //         qnty: newComponentQntyList[i]
        //     })
        //     .then((response) => {
        //         console.log(response)
        //         modalClose();
        //     })
        //     .catch((error) => {
        //         console.log(error);
        //     });
        // }
    }

    const deleteComponent = () => {
        // axios.post("/product/component/delete", {
        //     productId : productId
        // })
        // .then((response) => {
        //     console.log(response)
        //     modalClose();
        // })
        // .catch((error) => {
        //     console.log(error);
        // });
    }

    return (
        <div id='componentModifyModal' class="modal z-50 fixed w-full h-full top-0 left-0 flex items-center justify-center p-8 lg:p-0">
            <div class="modal-overlay fixed w-full h-full bg-gray-900 opacity-50" onClick={modalClose}></div>
            <div class="bg-white w-full lg:h-max lg:w-1/3  mx-auto rounded-lg shadow-xl z-50 overflow-y-auto">
            <div class="flex justify-between items-center head bg-gray-100 py-5 px-8 text-2xl font-extrabold">
            <p className="text-base font-bold text-text-dark">Modify component</p>
            </div>
            <div class="content p-8">
                <slot name="body" />
                <div class="w-full flex flex-col">
                    <span id="modifyType" className="ml-2 mb-2 text-default text-sm leading-none">Component</span>
                        <p id="modifyName" className="ml-2 mb-6 text-text-dark text-xl font-extrabold leading-none">component name</p>
                    <span id="modifyCompany" className="ml-2 mb-2 text-default text-sm leading-none">Company</span>
                        <p id="modifyCompanyName" className="ml-2 mb-6 text-text-dark text-xl font-extrabold  leading-none">company name</p>
                    <span id="modifyCo2eq" className="ml-2 mb-2 text-default text-sm leading-none">CO2EQ</span>
                        <p id="modifyCo2eqValue" className="ml-2 mb-6 text-text-dark text-xl font-extrabold  leading-none">co2eq</p>
                    <span className="ml-2 mb-4 text-default text-sm leading-none">Qnty</span>
                        <input id="modifyQnty" type='number' className='w-20 ml-2 mb-4 ' />
            <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div class="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                    <div class="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
                </div>
                </div>
                </div>
                </div>
                <div style={{float:"right"}} className="p-4 flex items-center justify-between">
                    <button class="p-4" onClick={editComponent}>Edit</button> 
                    <button class="p-4" style={{color:'red'}} onClick={deleteComponent} >Delete</button>
                </div>
            </div>
            </div>
        </div>
    )
}