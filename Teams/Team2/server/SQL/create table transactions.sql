CREATE TABLE transactions (
    id INT IDENTITY PRIMARY KEY,
    userMail VARCHAR(50),
    stockName VARCHAR(50),
    price FLOAT NULL, -- ���� ����� �� �����
    quantity INT,
    transactionType VARCHAR(10), -- 'purchase' �� 'sale'
    transactionDate DATETIME DEFAULT CURRENT_TIMESTAMP
);

