alter   PROCEDURE InsertIntoTransactions

    @UserMail VARCHAR(50),
    @StockName VARCHAR(50),
    @Quantity INT,
    @Price FLOAT,
    @TransactionType VARCHAR(10)
AS
BEGIN
    DECLARE @ExistingQuantity INT;

    -- If it's a sale, check the existing stock quantity
    IF @TransactionType = 'sale'
    BEGIN
        SELECT @ExistingQuantity = COALESCE(SUM(purchased) - SUM(sold), 0)
        FROM (
            SELECT 
                SUM(CASE WHEN transactionType = 'purchase' THEN quantity ELSE 0 END) AS purchased,
                SUM(CASE WHEN transactionType = 'sale' THEN quantity ELSE 0 END) AS sold
            FROM transactions
            WHERE userMail = @UserMail AND stockName = @StockName
        ) AS Quantities;

        IF @ExistingQuantity >= @Quantity
        BEGIN
            INSERT INTO transactions (userMail, stockName, price, quantity, transactionType)
            VALUES (@UserMail, @StockName, @Price, @Quantity, @TransactionType);
            RETURN 0; -- Success
        END
        ELSE
        BEGIN
            PRINT 'Not enough shares to sell';
            RETURN 1; -- Not enough shares
        END
    END
    ELSE
    BEGIN
        INSERT INTO transactions (userMail, stockName, price, quantity, transactionType)
        VALUES (@UserMail, @StockName, @Price, @Quantity, @TransactionType);
        RETURN 0; -- Success
    END
END;

declare @ReturnValue int ,@a int
exec InsertIntoTransactions 'maayansaid1234@gmail.com','TSLA',5,416.99,'sale'
set @a=@ReturnValue
SELECT @a AS ReturnValue 

select * from transactions












ALTER PROCEDURE InsertIntoTransactions
    @UserMail VARCHAR(50),
    @StockName VARCHAR(50),
    @Quantity INT,
    @Price FLOAT,
    @TransactionType VARCHAR(10),
    @ReturnCode INT OUTPUT  -- Adding OUTPUT parameter for return code
AS
BEGIN
    DECLARE @ExistingQuantity INT;

    -- If it's a sale, check the existing stock quantity
    IF @TransactionType = 'sale'
    BEGIN
        SELECT @ExistingQuantity = COALESCE(SUM(purchased) - SUM(sold), 0)
        FROM (
            SELECT 
                SUM(CASE WHEN transactionType = 'purchase' THEN quantity ELSE 0 END) AS purchased,
                SUM(CASE WHEN transactionType = 'sale' THEN quantity ELSE 0 END) AS sold
            FROM transactions
            WHERE userMail = @UserMail AND stockName = @StockName
        ) AS Quantities;

        IF @ExistingQuantity >= @Quantity
        BEGIN
            INSERT INTO transactions (userMail, stockName, price, quantity, transactionType)
            VALUES (@UserMail, @StockName, @Price, @Quantity, @TransactionType);
            SET @ReturnCode = 0; -- Success
        END
        ELSE
        BEGIN
            PRINT 'Not enough shares to sell';
            SET @ReturnCode = 1; -- Not enough shares
        END
    END
    ELSE
    BEGIN
        INSERT INTO transactions (userMail, stockName, price, quantity, transactionType)
        VALUES (@UserMail, @StockName, @Price, @Quantity, @TransactionType);
        SET @ReturnCode = 0; -- Success
    END
END;


