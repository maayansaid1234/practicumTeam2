const combinedArr=require("../getCombinedNotifications");



 const getNotificationsByUser= async (req, res) =>{


    let { userMail } = req.params;

return res.status(200).json(combinedArr.filter(item=>item.userMail==userMail));

}

module.exports={getNotificationsByUser}