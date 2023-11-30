import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios'; 

export default function ComponentAddModal(props) {
    const {rows, productId} = props;

    const newComponentIdList = []
    const newComponentQntyList = []

    const modalClose = () => {
        const componentCheckbox = document.getElementsByName("componentCheckbox")
        const comopnentQntyInput = document.getElementsByName("component_qnty_input")
        const headerCheckbox = document.getElementById("componentHeaderCheckbox");

        for (let i=0; i<componentCheckbox.length; i++) {
            headerCheckbox.checked = false;
            componentCheckbox[i].checked = false;
            comopnentQntyInput[i].value = null;
            comopnentQntyInput[i].disabled = true;
        }
        document.getElementById("componentAddModal").classList.add("hidden");
    }

    const addComponent = () => {
        const componentCheckbox = document.getElementsByName("componentCheckbox")
        const comopnentQntyInput = document.getElementsByName("component_qnty_input")

        for (let i=0; i<rows.length; i++) {
            if (componentCheckbox[i].checked) {
                newComponentIdList.push(rows[i].component_ID)
                newComponentQntyList.push(comopnentQntyInput[i].value)
            } 
        }

        for (let i = 0; i<newComponentIdList.length; i++) {
            axios.post("/product/component/insert", {
                productId : productId,
                componentId : newComponentIdList[i],
                qnty: newComponentQntyList[i]
            })
            .then((response) => {
                console.log(response)
                modalClose();
                // window.location.reload();
            })
            .catch((error) => {
                console.log(error);
            });
        }
    }

    const changeHeaderCheckbox = () => {
        const checkbox = document.getElementsByName("componentCheckbox");
        const headerCheckbox = document.getElementById("componentHeaderCheckbox");
        const inputs = document.getElementsByName("component_qnty_input");

        if (headerCheckbox.checked) {
            for (let i = 0; i < checkbox.length; i++) {
                checkbox[i].checked = true 
                inputs[i].disabled = false
            }
        } else {
            for (let i = 0; i < checkbox.length; i++) {
                checkbox[i].checked = false 
                inputs[i].value = null
                inputs[i].disabled = true
            }
        }
    }

    const checkboxChange = (index) => {
        const checkbox = document.getElementsByName("componentCheckbox");
        const inputs = document.getElementsByName("component_qnty_input");
        if (checkbox[index].checked) {
            inputs[index].disabled = false 
        } else {
            inputs[index].value = null
            inputs[index].disabled = true
        }
    }

    const componentTableRow = rows.map((row, index) => {
    return (
        <tr key={index}>
            <td class="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                <div class="inline-flex items-center gap-x-3">
                    <input name="componentCheckbox" type="checkbox" class="text-blue-500 border-gray-300 rounded dark:bg-gray-900 dark:ring-offset-gray-900 dark:border-gray-700" onChange={() => {
                        checkboxChange(index)
                    }}/>
                    <div class="flex items-center gap-x-2">
                        <div>
                            <p class="text-sm font-normal text-gray-600 dark:text-gray-400">&nbsp;{index+1}</p>
                        </div>
                    </div>
                </div>
            </td>
            <td class="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">ID#{row.component_ID}</td>
            <td class="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">{row.component}</td>
            <td class="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">{row.CO2EQ}</td>
            <td class="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">{row.supplier}</td>
            <td class="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap"><input name='component_qnty_input' type='number' style={{ width:"58px" }} min={0} disabled={true} ></input></td>
        </tr>
    )
})

    return (
        <div id='componentAddModal' class="modal hidden z-50 fixed w-full h-full top-0 left-0 flex items-center justify-center p-8 lg:p-0">
            <div class="modal-overlay fixed w-full h-full bg-gray-900 opacity-50" onClick={modalClose}></div>
            <div class="bg-white w-full lg:h-max lg:w-1/2  mx-auto rounded-lg shadow-xl z-50 overflow-y-auto">
            <div class="flex justify-between items-center head bg-gray-100 py-5 px-8 text-2xl font-extrabold">
            <p className="text-base font-bold text-text-dark">Select components to add</p>
            </div>
            <div class="content p-8">
                <slot name="body" />
                <div class="flex flex-col">
            <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div class="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                    <div class="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
                <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead>
                        <th scope="col" class="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap text-left">
                            <div class="inline-flex items-center gap-x-3">
                                <input id='componentHeaderCheckbox' type="checkbox" class="text-blue-500 border-gray-300 rounded dark:bg-gray-900 dark:ring-offset-gray-900 dark:border-gray-700" onChange={changeHeaderCheckbox}/>
                                <span>No.</span>
                            </div>
                        </th>
                        <th scope="col" class="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">Product Id</th>
                        <th scope="col" class="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">Product Name</th>
                        <th scope="col" class="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">CO2EQ</th>

                        <th scope="col" class="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">Company</th>
                        <th scope="col" class="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">qnty</th>
                        <th scope="col" class="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400 ">
                            <span class="sr-only">Edit</span>
                        </th>
                    </thead>
                    <tbody>
                        {componentTableRow}
                    </tbody>
                </table>
                </div>
                </div>
                </div>
                </div>
                <div style={{float:"right"}} className="p-4 flex items-center justify-between">
                    <button onClick={addComponent}>Add</button>
                </div>
            </div>
            </div>
        </div>
    )
}