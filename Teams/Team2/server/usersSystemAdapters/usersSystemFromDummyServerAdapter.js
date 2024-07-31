const usersSystemAdapter=require("./usersSystemAdapter")
const fs = require('fs').promises;
const config=require("../config.json");


class UsersSystemFromDummyServerAdapter extends usersSystemAdapter{
    constructor() {
        super();
    }
    async fetchUsersNotifications() {
        try {
            let route = config.usersSystemAdapter.routeForfetchUsersNotifications;
            let data = await fs.readFile(route, 'utf-8');
            return JSON.parse(data); // אם הקובץ מכיל JSON, אחרת תתאים את הפרסינג בהתאם לפורמט הקובץ
        } catch (error) {
            console.error('Error reading the file:', error);
            throw error; // אם תרצה לזרוק את השגיאה למעלה לטיפול חיצוני
        }
    }
    async login(userMail){
        try {
            let route = config.usersSystemAdapter.routeForLogin;
            let data = await fs.readFile(route, 'utf-8');
            data= JSON.parse(data); // אם הקובץ מכיל JSON, אחרת תתאים את הפרסינג בהתאם לפורמט הקובץ
            let user= data.find(item=>item.userMail==userMail);      
                 return user;
            
        } catch (error) {
            console.error('Error reading the file:', error);
            throw error; // אם תרצה לזרוק את השגיאה למעלה לטיפול חיצוני
        }

    }
    
 }







 module.exports=UsersSystemFromDummyServerAdapter