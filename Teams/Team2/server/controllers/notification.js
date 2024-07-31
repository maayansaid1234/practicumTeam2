const dbAdapter=require("../db/createDBAdapter");



const getSystemDetectedNotificationsForUser= async (req, res) =>{
    try{
        let { userMail } = req.params;
        let systemDetectedNotificationsForUser=await dbAdapter.selectFromCombinedNotifications(userMail);
        return res.status(200).json(systemDetectedNotificationsForUser);
       

        }
       
    
   
catch{
    return res.status(500).json("An error occurred while fetching the data from the Server");
}
    

}
const getSystemDetectedNotifications= async (req, res) =>{
    try{
       
        let systemDetectedNotifications=await dbAdapter.selectFromRealTimeNotifications()
        return res.status(200).json(systemDetectedNotifications);
       

        }
       
    
   
catch{
    return res.status(500).json("An error occurred while fetching the data from the Server");
}
    

}


module.exports={getSystemDetectedNotificationsForUser,getSystemDetectedNotifications}