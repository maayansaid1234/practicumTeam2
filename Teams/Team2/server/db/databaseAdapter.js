class DatabaseAdapter {
    connect() {
        throw new Error("Method 'connect()' must be implemented.");
    }

 
    selectFromSystemDetectedNotificationsOfUsers(userMail) {

    }
    selectFromSystemDetectedNotifications() {

    }

    insertIntoSystemDetectedNotificationsOfUsers(userMail, realTimeId
    ) {

    }
    insertIntoSystemDetectedNotifications(
        id, stockName, notificationType, closingPrice, volume, usersCounter
    ) {

    }
    disconnect() {
        throw new Error("Method 'disconnect()' must be implemented.");
    }
}



module.exports = DatabaseAdapter;