const express = require("express");
const getNotificationsOfUsers=require("./getNotificationsOfUsers.js")
const getCombinedTable =require("./getCombinedNotifications.js")
const dbAdapter=require("./createDBAdapter.js")
const axios=require("axios");
const cors =require( "cors");
const cron = require('node-cron');
const NotificationService = require("./notificationService.js");



 let port = process.env.PORT || 3500;

const app = express();
app.use(cors())
app.use(express.json());
dbAdapter.connect();  // connect to db





let Notifications = [];

// // let users = new Map();
// const ws=new WebSocketAdapter();
// ws.startServer();

const notificationService=new NotificationService();


// פונקציה למשיכת התראות חדשות משרת חיצוני
const fetchNewNotifications = async () => { 
    //   // הכנסה לדאטה בייס לטבלה המשולבת


    // const userSocket = users.get('userMail');
    // //team 3
    // try {
    
     const newNotifications=await dbAdapter.query("select * from RealTimeNotifications")
        Notifications = [...Notifications, ...newNotifications];
    //       //  במקום לקרוא לדאבייס לקרוא לצוות 3
    // //   const response=await axios.get("");
    // //   const newNotifications=response.json();
      
       const notificationsOfUsers=await getNotificationsOfUsers()
       const combinedArr= await getCombinedTable(
        newNotifications,
    notificationsOfUsers);

    // const mailAdapter=new MailAdapter({});
     combinedArr.forEach(item=>{
        // ws.sendNotification(item.UserMail,item);
        notificationService.sendNotification(item.UserMail,item)
        // mailAdapter.send(item.UserMail,item);
     })
    //     //  websocket שליחת ההתראות החדשות לכל הלקוחות המחוברים
    //     wss.clients.forEach(client => {
    //         if (client.readyState === WebSocket.OPEN) {
    //             combinedArr.forEach(alert => {
                
    //                 if(alert.userMail=userSocket)
    //                 client.send(JSON.stringify(alert));
    //             });
    //         }
    //     });
    // } catch (error) {
    //     console.error('Error fetching new Notifications:', error);
    // }
};

//קריאה להתראות חדשות אחת ליום (למשל בשעה 00:00)
cron.schedule('12 01 * * *', fetchNewNotifications);


// פונקציה למשיכת התראות ישנות מדאטה בייס
const fetchOldNotifications = async () => {
    try {
       
        //our data base - combined table
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
        const oldNotifications = response.data.slice(5,7).map(alert => ({
        
             title: alert.title,
            body: alert.body,
            //  userMail:"m@h"
        }));
        return oldNotifications;
    } catch (error) {
        console.error('Error fetching old Notifications:', error);
        return [];
    }
};

// wss.on('connection', async (ws, req) => {
//     console.log('Client connected');

//     ws.on('message', function(message) {
//          users.set('userMail', message);
//     //    console.log(message)
//       });
   
//     // משיכת התראות ישנות ושליחתן ללקוח המחובר
//     const oldNotifications = await fetchOldNotifications();
//     oldNotifications.forEach(alert => {
//         if(alert.userMail==users.get('userMail'))
//         ws.send(JSON.stringify(alert));
//     });

//     // הוספת ההתראות הישנות למערך הכללי
//     Notifications = [...Notifications, ...oldNotifications];

//     ws.on('close', () => {
//         console.log('Client disconnected');
//         users.delete('userMail');
//     });
// });


//------------------------------------------------

app.listen(port, () => {
    console.log(`app is listening on port ${port}`)
})

