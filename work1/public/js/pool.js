var mysql = require("mysql");  
var pool = mysql.createPool({  
        host     : '118.89.196.223',
        user     : 'kindle',
        password : 'kindle_123',
        database : 'kindleDb',
        connectionLimit:100 //最大连接数
    })
var db = {};  
db.getConn = function (callback) {
   //callback是回调函数，连接建立后的connection作为其参数 
    pool.getConnection(function (err, connection) {  
        if (err) {  
            throw err;  //抛出异常  
        } else {  
            callback(connection);   //如果正常的话，执行回调函数（即请求）
        }   
        connection.release();   //释放连接  
    })  
}  
module.exports = db;  