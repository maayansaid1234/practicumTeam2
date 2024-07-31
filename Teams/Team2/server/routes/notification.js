const express = require("express");
const { getSystemDetectedNotificationsForUser, getSystemDetectedNotifications} =require("../controllers/notification.js"); 


const router = express.Router();



router.get("/:userMail",getSystemDetectedNotificationsForUser);

router.get("/",getSystemDetectedNotifications);


module.exports=  router;