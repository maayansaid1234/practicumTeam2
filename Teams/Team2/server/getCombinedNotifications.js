const dbAdapter = require("./db/createDBAdapter");


// לעבור על מערך התראות בזמן אמת 
// ועל מערך התראות של משתמשים
// לבדוק אם יש התאמה


const  getCombinedTable  =
    async(realTimeNotifications, notificationsOfUsers) => {

        const combinedArr = [];
        let usersCounter =0;

        realTimeNotifications.forEach(realTime => {
            
            usersCounter=0;
            notificationsOfUsers.forEach(userNot => {
                
                if ((realTime.StockName
                    == userNot.StockName) &&
                    (realTime.NotificationType
                        == userNot.NotificationType) &&
                    (userNot.MinPrice <= realTime.ClosingPrice &&
                        userNot.MaxPrice >= realTime.ClosingPrice
                    ) )
                {
                   usersCounter++;
                    combinedArr.push(
                        {
                            StockName: realTime.StockName,
                            NotificationType: realTime.NotificationType,
                            UserMail: userNot.UserMail,
                            RealTimeNotificationId:realTime.Id,
                            ClosingPrice: realTime.ClosingPrice,
                            Volume: realTime.Volume
                           
                        })
                        
                }


            })

 dbAdapter.insertIntoRealTimeNotifications(
 realTime.Id,realTime.StockName,realTime.NotificationType,realTime.ClosingPrice,realTime.Volume,usersCounter)
        })
    




// insert to db
combinedArr.forEach(item=>


dbAdapter.insertIntoCombinedNotifications(
 item.UserMail,item.RealTimeNotificationId)
)


         return combinedArr;
    }

    module.exports=getCombinedTable;