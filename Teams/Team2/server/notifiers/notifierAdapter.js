class NotifierAdapter {
    sendNotification(userMail, notification) {
        throw new Error("Method 'send()' must be implemented.");
    }
}

module.exports = NotifierAdapter;
