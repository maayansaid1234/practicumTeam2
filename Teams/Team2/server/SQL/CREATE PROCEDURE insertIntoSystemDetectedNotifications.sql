CREATE PROCEDURE insertIntoSystemDetectedNotifications
    @id INT,
    @stockName VARCHAR(50),
    @notificationType VARCHAR(50),
    @closingPrice DECIMAL(18, 2),
    @volume INT,
    @usersCounter INT
AS
BEGIN
    INSERT INTO SystemDetectedNotifications (
        id,
        stockName,
        notificationType,
        closingPrice,
        volume,
        usersCounter
    )
    VALUES (
        @id,
        @stockName,
        @notificationType,
        @closingPrice,
        @volume,
        @usersCounter
    );
END;

