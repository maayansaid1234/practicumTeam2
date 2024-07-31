const dbAdapter = require("./db/createDBAdapter");


// לעבור על מערך התראות בזמן אמת 
// ועל מערך התראות של משתמשים
// לבדוק אם יש התאמה


const  getCombinedNotifications  =
    async(systemDetectedNotifications, usersNotifications) => {

        const combinedArr = [];
        let usersCounter =0;

        systemDetectedNotifications.forEach(realTime => {
            
            usersCounter=0;
            usersNotifications.forEach(userNot => {
                
                if ((realTime.stockName
                    == userNot.stockName) &&
                    (realTime.notificationType
                        == userNot.notificationType) &&
                    (userNot.minPrice <= realTime.closingPrice &&
                        userNot.maxPrice >= realTime.closingPrice
                    ) )
                {
                   usersCounter++;
                    combinedArr.push(
                        {
                            stockName: realTime.stockName,
                            notificationType: realTime.notificationType,
                            userMail: userNot.userMail,
                            systemDetectedNotificationId:realTime.id,
                            closingPrice: realTime.closingPrice,
                            volume: realTime.volume
                           
                        })
                        
                }


            })
try{
 dbAdapter.insertIntoSystemDetectedNotifications(
 realTime.id,realTime.stockName,realTime.notificationType,realTime.closingPrice,realTime.volume,usersCounter)   
}
catch(err){
console.log(err)
}
 
        })
    




// insert to db
combinedArr.forEach(item=>{

try{
   dbAdapter.insertIntoSystemDetectedNotificationsOfUsers(
 item.userMail,item.systemDetectedNotificationId) 
}
catch(err){
    console.log(err)
}
}

)


         return combinedArr;
    }

    module.exports=getCombinedNotifications;