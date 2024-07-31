class DatabaseAdapter {
    connect() {
        throw new Error("Method 'connect()' must be implemented.");
    }

    // query(tableName) {
    //     throw new Error("Method 'query()' must be implemented.");
    // }

    // insert(data,tableName) {
    //     throw new Error("Method 'query()' must be implemented.");
    // }
    selectFromCombinedNotifications(userMail) {

    }
    selectFromRealTimeNotifications() {

    }

    insertIntoCombinedNotifications(userMail, realTimeId
    ) {

    }
    insertIntoRealTimeNotifications(
        id, stockName, notificationType, closingPrice, volume, usersCounter
    ) {

    }
    disconnect() {
        throw new Error("Method 'disconnect()' must be implemented.");
    }
}



module.exports = DatabaseAdapter;