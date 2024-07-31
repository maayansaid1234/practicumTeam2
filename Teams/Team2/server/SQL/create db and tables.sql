create database Stocks

use Stocks

---התראות שזוהו  systemDetectedNotifications


----שם מניה, סוג התראה, מחיר סופי, ווליום. קוד התראה 
create table systemDetectedNotifications(id int  primary Key,stockName varchar(50)
,notificationType varchar(50), closingPrice float ,volume float,usersCounter int )

-------- התראות של משתמשים שזוהו  
create table systemDetectedNotificationsOfUsers(id int identity(1,1) primary key  ,
userMail varchar(50),realTimeNotificationId int foreign key references systemDetectedNotifications(id) )



