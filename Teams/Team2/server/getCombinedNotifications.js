const dbAdapter = require("./createDBAdapter");


// לעבור על מערך התראות בזמן אמת 
// ועל מערך התראות של משתמשים
// לבדוק אם יש התאמה


const  getCombinedTable  =
    async(realTimeNotifications, notificationsOfUsers) => {

        const combinedArr = [];
        

        realTimeNotifications.forEach(realTime => {
            notificationsOfUsers.forEach(userNot => {
                
                if ((realTime.StockName
                    == userNot.StockName) &&
                    (realTime.NotificationType
                        == userNot.NotificationType) &&
                    (userNot.MinPrice <= realTime.ClosingPrice &&
                        userNot.MaxPrice >= realTime.ClosingPrice
                    )
                ) {
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


        })
// insert to db
combinedArr.forEach(item=>
dbAdapter.query
(`insert into  CombinedNotifications values('${item.UserMail}',${item.RealTimeNotificationId})`)
)
// console.log("users arr")
// console.log(notificationsOfUsers)
// console.log("end")
// console.log("realtime arr")
// console.log(realTimeNotifications)
// console.log("end")
// console.log("combined arr")
// console.log(combinedArr)
// console.log("end")
         return combinedArr;
    }

    module.exports=getCombinedTable;