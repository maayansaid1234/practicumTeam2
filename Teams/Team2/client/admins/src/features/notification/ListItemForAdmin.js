import React from 'react';
import './notifications.css';

const ListItemForAdmin = ({ notification }) => {
    return (
        <div className="notification-container">
            <h1 className="notification-title">Notification:</h1>
            <h2 className="notification-stock-name">Stock name: {notification.stockName}</h2>
            <h2 className="notification-type">Notification type: {notification.notificationType}</h2>
            <h2 className="notification-closing-price">Closing price: {notification.closingPrice}</h2>
            <h2 className="notification-volume">Volume: {notification.volume}</h2>
            <h2 className="notification-users-counter">Users Counter: {notification.usersCounter}</h2>
        </div>
    );
}

export default ListItemForAdmin;
