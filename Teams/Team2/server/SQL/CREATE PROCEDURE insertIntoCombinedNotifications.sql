CREATE PROCEDURE insertIntoCombinedNotifications
    @userMail VARCHAR(40),
    @realTimeNotificationId INT
AS
BEGIN
    -- ציון העמודות בטבלה CombinedNotifications
    INSERT INTO CombinedNotifications (userMail, realTimeNotificationId)
    VALUES (@userMail, @realTimeNotificationId);
END;

exec insertIntoCombinedNotifications 'h',1