import { Client } from "@stomp/stompjs";
import React, {useState, useEffect} from "react";

var client = null;

const GetElectricity = () => {
    const [messageList, setMessageList] = useState([]);
    
    if (client == null) {
        client = new Client({
            brokerURL: 'ws://localhost:8080/gs-guide-websocket',
            onConnect: () => {
                console.log("Conneted!")
                client.subscribe('/topic/electricity', (message) => {                    
                    setMessageList(prev => [
                        ...prev, JSON.parse(message.body)
                    ])
                });
            },
        })
        client.activate();
    }
    

    const renderMessage = messageList.map((value, index) => {
        return(
            <tr><td>{value.date} : Used average {value.power} kw/h </td></tr>
        )
    });

    return (
        <div>
            <table id="electricity usages" className="table table-striped">
                <thead>
                <tr>
                    <th>Electricity</th>
                </tr>
                </thead>
                <tbody id="greetings">
                    {renderMessage}
                </tbody>
            </table>
        </div>
    )
}

export default GetElectricity;