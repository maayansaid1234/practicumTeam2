const express = require("express");
const dbAdapter=require("./createDBAdapter.js");


const { config } =require("dotenv") ;
const notificationRouter =require( "./routes/notification.js")
const getNotificationsOfUsers=require("./getNotificationsOfUsers.js")
const getCombinedTable =require("./getCombinedNotifications.js")
const fs=require("fs")




config();


const connectionString = process.env.CONNECTIONSTRING
dbAdapter.connect(connectionString);











const cors =require( "cors");
const WebSocket = require('ws');
const cron = require('node-cron');
const wss = new WebSocket.Server({ port: 8080 });
let port = process.env.PORT || 3500;
const axios=require("axios");
const MailAdapter = require("./mailAdapter.js");


const app = express();


app.use(cors())

app.use(express.json());


let alerts = [];

let users = new Map();


// פונקציה למשיכת התראות חדשות משרת חיצוני
const fetchNewAlerts = async () => { 
      // הכנסה לדאטה בייס לטבלה המשולבת
    const userSocket = users.get('userMail');
    //team 3
    try {
    
    const newAlerts=await dbAdapter.query("select * from RealTimeNotifications")
        alerts = [...alerts, ...newAlerts];
          //  במקום לקרוא לדאבייס לקרוא לצוות 3
    //   const response=await axios.get("");
    //   const newAlerts=response.json();
      
       const notificationsOfUsers=await getNotificationsOfUsers()
       const combinedArr= await getCombinedTable(
        newAlerts,
    notificationsOfUsers);
    const mailAdapter=new MailAdapter({});
     combinedArr.forEach(item=>{
        mailAdapter.send(item.UserMail,item);
     })
        //  websocket שליחת ההתראות החדשות לכל הלקוחות המחוברים
        wss.clients.forEach(client => {
            if (client.readyState === WebSocket.OPEN) {
                combinedArr.forEach(alert => {
                
                    if(alert.userMail=userSocket)
                    client.send(JSON.stringify(alert));
                });
            }
        });
    } catch (error) {
        console.error('Error fetching new alerts:', error);
    }
};

//קריאה להתראות חדשות אחת ליום (למשל בשעה 00:00)
cron.schedule('56 18 * * *', fetchNewAlerts);


// פונקציה למשיכת התראות ישנות מדאטה בייס
const fetchOldAlerts = async () => {
    try {
       
        //our data base - combined table
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
        const oldAlerts = response.data.slice(5,7).map(alert => ({
        
             title: alert.title,
            body: alert.body,
             userMail:"m@h"
        }));
        return oldAlerts;
    } catch (error) {
        console.error('Error fetching old alerts:', error);
        return [];
    }
};

wss.on('connection', async (ws, req) => {
    console.log('Client connected');

    ws.on('message', function(message) {
         users.set('userMail', message);
    //    console.log(message)
      });
   
    // משיכת התראות ישנות ושליחתן ללקוח המחובר
    const oldAlerts = await fetchOldAlerts();
    oldAlerts.forEach(alert => {
        if(alert.userMail==users.get('userMail'))
        ws.send(JSON.stringify(alert));
    });

    // הוספת ההתראות הישנות למערך הכללי
    alerts = [...alerts, ...oldAlerts];

    ws.on('close', () => {
        console.log('Client disconnected');
        users.delete('userMail');
    });
});


//------------------------------------------------

app.listen(port, () => {
    console.log(`app is listening on port ${port}`)
})
