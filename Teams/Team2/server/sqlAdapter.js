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

    async query(sqlQuery) {
        return new Promise((resolve, reject) => {
            if (!this.conn) {
                reject(new Error('Not connected to the database.'));
                return;
            }

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
