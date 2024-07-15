import React, { useEffect, useState } from 'react';
import ListItem from './listItem';
import { useSelector } from 'react-redux';

const Notifications = () => {
const [alerts, setAlerts] = useState([]);
const userMail=useSelector(st=>st.user.currentUser);
useEffect(() => {
    const ws = new WebSocket('ws://localhost:8080');

    ws.onopen = () => {
        console.log('WebSocket connection opened');
        ws.send(userMail);
    };

    ws.onmessage = (event) => {
        const alert = JSON.parse(event.data);
        console.log(alert);
        setAlerts((prevAlerts) => [alert,...prevAlerts ]);
    };

    ws.onclose = () => {
        console.log('WebSocket connection closed');
    };

    return () => {
        ws.close();
    };
}, [userMail]);


    return (
        <div>
            <h1>Notifications</h1>
            <ul>
                {alerts.map((notification, index) => (
                    <li key={index}>
                       <ListItem notification={notification}/>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Notifications;
