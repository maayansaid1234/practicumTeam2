
const config = require('../config.json');
const createDBAdapterSingleton = require('./'+config.dbAdapter.type+"Adapter");


     const dbAdapter=createDBAdapterSingleton(config.dbAdapter.connectionString);

  
module.exports=dbAdapter;
