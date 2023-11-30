import React, { useEffect, useState } from "react";
import PageTitle from "../component/common/PageTitle";
import axios from "axios";
import Buffer from 'buffer';
import { useParams } from 'react-router-dom';

const AASX = () => {
    const [festoImage, setFestoImage] = useState("");
    const [identification, setIdentification] = useState([])
    const [nameplate, setNameplate] = useState([])
    const { aasIdentifier } = useParams();

    const uri = '/aas/' +  aasIdentifier;

    useEffect(() => {
        axios.get(uri + '/thumbnail', {
            responseType: "arraybuffer"
        })
        .then((response) => {
            setFestoImage(Buffer.Buffer.from(response.data, 'binary').toString('base64'))
        })
        .catch((error) => {
            console.log(error)
        })

        axios.get(uri + '/submodels/identification/table')
        .then((response) => {
            setIdentification(response.data)
        })
        .catch((error) => {
            console.log(error)
        })

        axios.get(uri + '/submodels/Nameplate/table')
        .then((response) => {
            setNameplate(response.data)
        })
        .catch((error) => {
            console.log(error)
        })

    }, [])

    const identificationRenderer = identification.slice(0, 10).map((value) => {
        return (
            <div style={{margin:5, marginLeft:15}}>
                {value.idShorts} : {value.value}
            </div>
        )
    })

    const nameplateRenderer = nameplate.slice(0, 10).map((value) => {
        return (
            <div style={{margin:5, marginLeft:15}}>
                {value.idShorts} : {value.value}
            </div>
        )
    })

    return (
        <>        
            <PageTitle />
            <div className="flex">
                <img src={"data:image/png;base64,"+festoImage} style={{ height:"600px", width: "600px", marginLeft:20}}></img>
                <div style={{width:"40%", flex:1}}>
                    <div style={{fontWeight:"bolder", margin: 20, fontSize:20}}>Nameplate</div>
                    {nameplateRenderer}
                    <div style={{fontWeight:"bolder", margin: 20, fontSize:20}}>Identification</div>
                    {identificationRenderer}
                </div>
            </div>
        </>
    );
};

export default AASX;