import React from 'react';
import './notifications.css';

const ListItemForAdmin = ({ notification }) => {
    return (
        <div className="notification-container">
            <h1 className="notification-title">Notification:</h1>
            <h2 className="notification-stock-name">Stock name: {notification.StockName}</h2>
            <h2 className="notification-type">Notification type: {notification.NotificationType}</h2>
            <h2 className="notification-closing-price">Closing price: {notification.ClosingPrice}</h2>
            <h2 className="notification-volume">Volume: {notification.Volume}</h2>
            <h2 className="notification-users-counter">Users Counter: {notification.UsersCounter}</h2>
        </div>
    );
}

export default ListItemForAdmin;
