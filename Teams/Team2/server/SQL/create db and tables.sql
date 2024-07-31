create database Stocks

use Stocks

---התראות שהתקבלו  RealTimeNotifications


----שם מניה, סוג התראה, מחיר סופי, ווליום. קוד התראה 
create table RealTimeNotifications(Id int  primary Key,StockName varchar(50)
,NotificationType varchar(50), ClosingPrice float ,Volume float,UsersCounter int )
drop table RealTimeNotifications
drop table CombinedNotifications

create table CombinedNotifications( Id int identity(1,1) primary key  ,
UserMail varchar(50),RealTimeNotificationId int foreign key references RealTimeNotifications(Id) )

select * from  CombinedNotifications c join RealTimeNotifications r
on r.id=c.RealTimeNotificationId
where userMail='f'

insert into  RealTimeNotifications values('a','triangel',3.5,68)
select * from RealTimeNotifications