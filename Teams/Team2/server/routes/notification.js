const express = require("express");
const { getNotificationsByUser} =require("../controllers/notification.js"); 
// import { auth, authAdmin } from "../middlwares/auth.js";

const router = express.Router();

router.get("/:userMail",getNotificationsByUser);
// router.delete("/:id",auth, deleteOrder);
// router.post("/",auth, addOrder);
// router.put("/:id",authAdmin, updateOrder);

module.exports=  router;