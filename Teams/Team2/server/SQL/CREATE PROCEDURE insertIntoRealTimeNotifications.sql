CREATE PROCEDURE insertIntoRealTimeNotifications
    @Id INT,
    @StockName VARCHAR(50),
    @NotificationType VARCHAR(50),
    @ClosingPrice DECIMAL(18, 2),
    @Volume INT,
    @UsersCounter INT
AS
BEGIN
    INSERT INTO RealTimeNotifications (
        Id,
        StockName,
        NotificationType,
        ClosingPrice,
        Volume,
        UsersCounter
    )
    VALUES (
        @Id,
        @StockName,
        @NotificationType,
        @ClosingPrice,
        @Volume,
        @UsersCounter
    );
END;

