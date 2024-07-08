const fs=require("fs");

const getNotificationsOfUsersFromServer = async () => {
//team 1
let arr=[]
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        const data = await response.json();
          arr=data; // מניח שהנתונים הם מערך
    } 
    catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
    }
     return [{StockName:"a",NotificationType:
        "triangel",UserMail:"maayan",MaxPrice:5,MinPrice:2
    }]
};










 module.exports=getNotificationsOfUsersFromServer;

