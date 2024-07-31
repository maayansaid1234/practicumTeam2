const NotificationsDetectionSystemAdapter=require("./notificationsDetectionSystemAdapter.js")
const fs = require('fs').promises;
const config=require("../config.json");

class NotificationsDetectionSystemFromDummyServerAdapter extends NotificationsDetectionSystemAdapter{
    constructor() {
        super();
    }
    async fetchRealTimeNotifications(){
        try {
            let route = config.notificationsDetectionSystemAdapter.route;
            let data = await fs.readFile(route, 'utf-8');
            return JSON.parse(data); // אם הקובץ מכיל JSON, אחרת תתאים את הפרסינג בהתאם לפורמט הקובץ
        } catch (error) {
            console.error('Error reading the file:', error);
            throw error; // אם תרצה לזרוק את השגיאה למעלה לטיפול חיצוני
        }
    }
    
}
    
    module.exports=NotificationsDetectionSystemFromDummyServerAdapter

    