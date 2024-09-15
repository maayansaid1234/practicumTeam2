CREATE TABLE transactions (
    id INT IDENTITY PRIMARY KEY,
    userMail VARCHAR(50),
    stockName VARCHAR(50),
    price FLOAT NULL, -- מחיר רכישה או מכירה
    quantity INT,
    transactionType VARCHAR(10), -- 'purchase' או 'sale'
    transactionDate DATETIME DEFAULT CURRENT_TIMESTAMP
);

