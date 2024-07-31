const express = require("express");
const getCombinedNotifications =require("./getCombinedNotifications.js")
const dbAdapter=require("./db/createDBAdapter.js")
const notificationRouter=require("./routes/notification.js")
const userRouter=require("./routes/user.js");
const cors =require( "cors");
const config=require("./config.json")
const cron = require('node-cron');
const NotificationService = require("./notifiers/notificationService.js");
const usersSystem=require(`./usersSystemAdapters/usersSystemFrom${config.usersSystemAdapter.type}Adapter.js`)
const notificationsDetectionSystem=require(`./notificationsDetectionSystemAdapters/notificationsDetectionSystemFrom${config.notificationsDetectionSystemAdapter.type}Adapter.js`)



 let port = config.port;
const app = express();

app.use(cors())
app.use(express.json());
app.use("/api/notifications", notificationRouter);
app.use("/api/users", userRouter);
dbAdapter.connect();  // connect to db


   
   
const usersSystemAdapter=new usersSystem();
const notificationsDetectionSystemAdapter=new notificationsDetectionSystem();
let Notifications = [];



const notificationService=new NotificationService();


// פונקציה למשיכת התראות חדשות משרת חיצוני
const fetchNewNotifications = async () => {
    



    try {
    
       const newNotifications=await notificationsDetectionSystemAdapter.fetchSystemDetectedNotifications();
        Notifications = [...Notifications, ...newNotifications];
       const notificationsOfUsers=await usersSystemAdapter.fetchUsersNotifications()
       const combinedArr= await getCombinedNotifications(
        newNotifications,
    notificationsOfUsers);

   
     combinedArr.forEach(item=>{
        
        notificationService.sendNotification(item.userMail,item)
       
     })
   
     } catch (error) {
        console.error('Error fetching new Notifications:', error);
     }
};

//קריאה להתראות חדשות אחת ליום (למשל בשעה 00:00)
cron.schedule('45 19 * * *', fetchNewNotifications);









app.listen(port, () => {
    console.log(`app is listening on port ${port}`)
})

