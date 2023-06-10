const mysql=require('mysql2/promise');
const poolConnection=mysql.createPool({
  host: 'localhost',
  user: 'root',
  database: 'credlinkdb',
  waitForConnections: true,
  connectionLimit: 10,
  maxIdle: 10, // max idle connections, the default value is the same as `connectionLimit`
  idleTimeout: 60000, // idle connections timeout, in milliseconds, the default value 60000
  queueLimit: 0
});
poolConnection.getConnection((err,connection)=>{
    if(err)
        throw(err);
    
    console.log('connected to mysql database');
    connection.release();
});
module.exports=poolConnection;