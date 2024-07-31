CREATE PROCEDURE getSystemDetectedNotificationsOfUsers
    @userMail varchar(40)
AS
BEGIN
    SELECT r.*
    FROM systemDetectedNotificationsOfUsers s join systemDetectedNotifications r
	on s.systemDetectedNotificationId=r.id
    WHERE userMail = @userMail;
END;

