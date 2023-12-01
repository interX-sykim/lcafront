import React, { useEffect, useState } from "react";
import axios from 'axios';

const AASList = () => {
    const [aasList, setAasList] = useState([]);

    useEffect(() => {
        axios.get('/server/listaas')
        .then((response) => {
            setAasList(response.data.aaslist)
        })
        .catch((error) => {
            console.log(error)
        })
    }, [])

    console.log(aasList[0])

    const aasListRenderer = aasList.map((value) => {
        return (
            <li style={{marginLeft:20}}>
                <a href={'/dxai/aasx/' + value.split(':')[1].trim()} >
                    {value}
                </a>
            </li>
        )
    })

    return (
        <div>
            <p style={{fontWeight:"bold", margin:20}}> product AAS List</p>
            <ul>
                {aasListRenderer}
            </ul>
        </div>
    )
}

export default AASList