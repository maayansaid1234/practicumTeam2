CREATE  PROCEDURE insertIntoSystemDetectedNotificationsOfUsers
    @userMail VARCHAR(40),
    @systemDetectedNotificationId INT
AS
BEGIN
    -- ���� ������� ����� CombinedNotifications
    INSERT INTO systemDetectedNotificationsOfUsers (userMail, systemDetectedNotificationId)
    VALUES (@userMail, @systemDetectedNotificationId);
END;

