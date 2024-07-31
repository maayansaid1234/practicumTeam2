class NotifierAdapter {
    sendNotification(UserMail, notification) {
        throw new Error("Method 'send()' must be implemented.");
    }
}

module.exports = NotifierAdapter;
