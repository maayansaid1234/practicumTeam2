CREATE PROCEDURE GetCombinedNotifications
    @UserMail varchar(40)
AS
BEGIN
    SELECT r.*
    FROM CombinedNotifications c join RealTimeNotifications r
	on c.RealTimeNotificationId=r.Id
    WHERE UserMail = @UserMail;
END;

