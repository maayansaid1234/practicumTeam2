import React, { useEffect, useState } from 'react';
import ListItem from './ListItem';
import { useSelector } from 'react-redux';
import { getNotifications } from './notificationApi';
import './notifications.css';

const Notifications = () => {
    const [notifications, setNotifications] = useState([]);
    const userMail = useSelector(st => st.user.currentUser);

    const fetchOldNotifications = async () => {
        try {
            let res = await getNotifications(userMail);
            console.log(res);
            setNotifications(res.data);
        }
        catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        fetchOldNotifications();
        const ws = new WebSocket('ws://localhost:8080');

        ws.onopen = () => {
            console.log('WebSocket connection opened');
            ws.send(userMail);
        };

        ws.onmessage = (event) => {
            const notification = JSON.parse(event.data);
            console.log(notification);
            setNotifications((prevNotifications) => [notification, ...prevNotifications]);
        };

        ws.onclose = () => {
            console.log('WebSocket connection closed');
        };

        return () => {
            ws.close();
        };
    }, [userMail]);

    return (
        <div className="notifications-page">
            <h1 className="notification-page-title">Notifications</h1>
            <ul className="notifications-list">
                {notifications.map((notification, index) => (
                    <li key={index}>
                        <ListItem notification={notification} />
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Notifications;
