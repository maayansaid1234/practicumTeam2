import React, { useEffect, useState } from 'react';
import { getNotifications } from './notificationApi';
import { useSelector } from 'react-redux';
import ListItemForAdmin from './ListItemForAdmin';
import './notifications.css';

const NotificationsForAdmin = () => {
    const [arr, setArr] = useState([]);
    const userMail = useSelector(st => st.user.currentUser);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await getNotifications();
                console.log(res);
                setArr(res.data); // מניח ש-res.data כבר מכיל את המערך המפוענח
            } catch (error) {
                console.error("Error fetching notifications:", error);
            }
        };

        fetchData();
    }, [userMail]);

    return (
        <div className="notifications-page">
            <h1 className="notification-page-title">Notifications</h1>
            <ul className="notifications-list">
                {arr.map((item, index) => (
                    <li key={index}><ListItemForAdmin notification={item} /></li>
                ))}
            </ul>
        </div>
    );
};

export default NotificationsForAdmin;
