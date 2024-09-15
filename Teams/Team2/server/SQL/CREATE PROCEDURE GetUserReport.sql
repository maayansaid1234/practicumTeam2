CREATE PROCEDURE GetUserReport 
    @UserMail VARCHAR(50)
AS
BEGIN
    -- מצא את כמות המניות הנוכחית, ההשקעה הכוללת וההכנסות ממכירות
    SELECT 
        stockName,
        SUM(CASE WHEN transactionType = 'purchase' THEN quantity ELSE 0 END) - 
        SUM(CASE WHEN transactionType = 'sale' THEN quantity ELSE 0 END) AS currentQuantity,
        SUM(CASE WHEN transactionType = 'purchase' THEN quantity * price ELSE 0 END) AS totalInvestment,
        SUM(CASE WHEN transactionType = 'sale' THEN quantity * price ELSE 0 END) AS totalRevenue
    FROM 
        transactions
    WHERE 
        userMail = @UserMail
    GROUP BY 
        stockName;
END;

exec getUserReport 'maayansaid1234@gmail.com'
select * from transactions