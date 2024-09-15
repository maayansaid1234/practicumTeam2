const sql = require('msnodesqlv8');
const DatabaseAdapter = require('./databaseAdapter');


class SQLServerAdapter extends DatabaseAdapter {
    constructor(connectionString) {
        super();
        this.connectionString = connectionString;
        this.conn=null;
        
    }

    async connect() {
        try {
            
            console.log('Attempting to connect to the database...');
            sql.open(this.connectionString, (err, conn) => {
                if (err) {
                    console.error('Error connecting to the database:', err.message);
                    return;
                }
                this.conn=conn;
                console.log('Connected to the database successfully');
               
            });
        } catch (error) {
            console.error('Error connecting to the database:', error.message);
        }
    }

    

    selectFromSystemDetectedNotificationsOfUsers(userMail) {
      return new Promise((resolve, reject) => {
            if (!this.conn) {
                reject(new Error('Not connected to the database.'));
                return;
            }
           
           
            let  sqlQuery=`EXEC getSystemDetectedNotificationsOfUsers @userMail=?`;
            const params = [userMail]
            this.conn.query(sqlQuery,params, (err, results) => {
                if (err) {
                    console.error('SQL Server query error:', err.message);
                    reject(err);
                    return;
                }
                resolve(results);
             
            });
        });
    }
    selectFromSystemDetectedNotifications() {
      return new Promise((resolve, reject) => {
            if (!this.conn) {
                reject(new Error('Not connected to the database.'));
                return;
            }
        
            let sqlQuery=`EXEC getSystemDetectedNotifications`;
            
            this.conn.query(sqlQuery, (err, results) => {
                if (err) {
                    console.error('SQL Server query error:', err.message);
                    reject(err);
                    return;
                }
                resolve(results);
             
            });
        });
    }

    
    insertIntoSystemDetectedNotificationsOfUsers(userMail, systemDetectedNotificationId) {
        return new Promise((resolve, reject) => {
            if (!this.conn) {
                reject(new Error('Not connected to the database.'));
                return;
            }
    
            const sqlQuery = `EXEC insertIntoSystemDetectedNotificationsOfUsers @userMail=?, @systemDetectedNotificationId=?`;
            const params = [userMail, systemDetectedNotificationId];
    
            this.conn.query(sqlQuery, params, (err, results) => {
                if (err) {
                    console.error('SQL Server query error:', err.message);
                    reject(err);
                    return;
                }
                resolve(results);
            });
        });
    }
    
    
    insertIntoSystemDetectedNotifications(
        id, stockName, notificationType, closingPrice, volume, usersCounter
    ) {
        return new Promise((resolve, reject) => {
            if (!this.conn) {
                reject(new Error('Not connected to the database.'));
                return;
            }
           
           
            let  sqlQuery=`EXEC insertIntoSystemDetectedNotifications @id=?, @stockName=?, @notificationType=?, @closingPrice=?, @volume=?, @usersCounter=?`;
            const params=[id,stockName,notificationType,closingPrice,volume,usersCounter]
            this.conn.query(sqlQuery,params, (err, results) => {
                if (err) {
                    console.error('SQL Server query error:', err.message);
                    reject(err);
                    return;
                }
                resolve(results);
             
            });
        });
    }
    // async   insertIntoTransactions(userMail,stockName,quantity,price,transactionType
    // ) {
    //     return new Promise((resolve, reject) => {
    //         if (!this.conn) {
    //             reject(new Error('Not connected to the database.'));
    //             return;
    //         }

    //         let  sqlQuery=`EXEC insertIntoTransactions @userMail=?, @stockName=?, @quantity=?, @price=?,@transactionType=?`;
    //         const params=[userMail,stockName,quantity,price,transactionType]
    //         this.conn.query(sqlQuery,params, (err, results) => {
    //             if (err) {
    //                 console.error('SQL Server query error:', err.message);
    //                 reject(err);
    //                 return;
    //             }
    //             resolve(results);
             
    //         });
    //     });
    // }

    async insertIntoTransactions(userMail, stockName, quantity, price, transactionType) {
        return new Promise((resolve, reject) => {
            if (!this.conn) {
                reject(new Error('Not connected to the database.'));
                return;
            }
           
            let sqlQuery = `
             DECLARE @ReturnValue INT;
             EXEC @ReturnValue = InsertIntoTransactions @userMail = ?, @stockName = ?, @quantity = ?, @price = ?, @transactionType = ?;
                SELECT @ReturnValue as ReturnValue;
            `;
            
            const params = [userMail, stockName, quantity, price, transactionType];
    
            this.conn.query(sqlQuery, params, (err, results) => {
                if (err) {
                    console.error('SQL Server query error:', err.message);
                    reject(err);
                    return;
                }
                let lastNonEmptyResult = null;
               
                    if (results.length > 0) {
                        lastNonEmptyResult = results[0];
                       
                    }
               
                
                if (lastNonEmptyResult) {
                    resolve(lastNonEmptyResult.ReturnValue);
                } 
            });
        });
    }
    

    // async insertIntoTransactions(userMail, stockName, quantity, price, transactionType) {
    //     return new Promise((resolve, reject) => {
    //         if (!this.conn) {
    //             reject(new Error('Not connected to the database.'));
    //             return;
    //         }
    
    //         // Updated SQL query to capture OUTPUT parameter
    //         // let sqlQuery = `
    //         //     DECLARE @ReturnCode INT;
    //         //     EXEC insertIntoTransactions @userMail=?, @stockName=?, @quantity=?, @price=?, @transactionType=?, @ReturnCode=@ReturnCode OUTPUT;
    //         //     SELECT @ReturnCode as ReturnCode;
    //         // `;
    //         let sqlQuery = `
    //         DECLARE @ReturnCode INT;
    //         EXEC insertIntoTransactions @userMail=?, @stockName=?, @quantity=?, @price=?, @transactionType=?, @ReturnCode=@ReturnCode OUTPUT;
    //         SELECT @ReturnCode as ReturnCode;
    //     `;
    
    //         const params = [userMail, stockName, quantity, price, transactionType];
    //         this.conn.output('ReturnCode', sql.Int);

    //         this.conn.query(sqlQuery, params, (err, results) => {
    //             if (err) {
    //                 console.error('SQL Server query error:', err.message);
    //                 reject(err);
    //                 return;
    //             }
    
    //             // Assuming the first row contains the return code
    //             // const returnCode = results[0].ReturnCode;
    
    //             resolve(results); // Resolve with the return code
    //         });
    //     });
    // }
    


   
  async  getUserReport(userMail){
    return new Promise((resolve, reject) => {
        if (!this.conn) {
            reject(new Error('Not connected to the database.'));
            return;
        }
       
        let  sqlQuery=`EXEC getUserReport @userMail=?`;
        const params=[userMail]
        this.conn.query(sqlQuery,params, (err, results) => {
            if (err) {
                console.error('SQL Server query error:', err.message);
                reject(err);
                return;
            }
            resolve(results);
         
        });
    });

    }
    async disconnect() {
        this.conn?.close((closeErr) => {
                    if (closeErr) {
                        console.error('Error disconnecting from the database:', closeErr.message);
                        return;
                    }
                    console.log('Disconnected from the database');
                });
    }
    }
    const createSQLServerAdapterSingleton = (function () {
        let instance;
    
        return function (connectionString) {
            if (!instance) {
                instance = new SQLServerAdapter(connectionString);
            }
            return instance;
        };
    })();



module.exports = createSQLServerAdapterSingleton;
